let users = require('../models/usermodel')
let bcrypt = require('bcrypt')
let mail = require('../utils/gmail')
require('dotenv').config()
let jwt = require('jsonwebtoken')
let secretkey = process.env.secretkey

exports.register = async (req, res) => {
    try{
        const {username,password,email,role} = req.body
        if(!username || !password || !email || !role){
            return res.status(400).json({message : 'All fields are required'})
        }
        //check the user already exist or not 
        let checkuser = await users.findOne({username})
        if(checkuser){
            return res.status(400).json({message : 'User already exists'})
        }
        
        //hash the passwords
        const hashedPassword = await bcrypt.hash(password, 10)
        await users.create({username, password: hashedPassword, email, role})

        //generate a json web token
        //payload,secretkey,expirydate   .sign() is used to generate the token
        let payload = {username : username, emailaddress : email , role:role}
        let token = await jwt.sign(payload,secretkey,{expiresIn:'1hr'})

        await mail(email,username)
        return res.json({message: "User created",token})
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

//login 
exports.login = async (req, res,next) => {
    try{
        console.log("entered")   
        const {username,password} = req.body
        if(!username || !password)
            return res.json({"msg":"missing fields"})

        let checkuser = await users.findOne({username})
        if(!checkuser)
            return res.status(201).json({"msg" : "User not found"})
        
        let isvaliduser = await bcrypt.compare(password,checkuser.password)
        if(!isvaliduser)
            return res.json({"msg" : "Username or Password was incorrect"})
        
        //verify the token first
        let token = req.headers.authorization.split(' ')[1]
        let isverified = await jwt.verify(token,secretkey)
        if(!isverified)
            return res.json({"msg":"invalid token"})

        res.json({"msg":"login successful",token})
        
    }catch(err){
        next(err.message)
    }
}