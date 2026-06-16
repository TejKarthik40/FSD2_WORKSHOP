const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

let connection = async () =>{
    try{
        await mongoose.connect(process.env.MONGODBURL)
        console.log('Database connected successfully')
    }   
    catch(err){
        console.log(err.message)
    }
}
module.exports = connection