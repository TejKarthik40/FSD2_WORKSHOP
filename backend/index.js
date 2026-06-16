const express = require('express')
let connection = require('./config/db')
const app = express()
const port = 3000
const cors = require('cors')

const limiter = require('./middlewares/ratelimit')

//routes
const productroute = require('./routes/productroute')
const authroute = require('./routes/authroute')

//middleware
app.use(express.json())
app.use(cors())
app.use(limiter)

app.use('/products', productroute)
app.use('/', authroute)


// app.get('/products', async (req, res) => {
//   try {
//     let allProducts = await products.find()
//     res.status(200).json(allProducts)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })


// app.post('/products', async (req, res) => {
//     try{
//         let newProduct = await products.create(req.body)
//         res.status(201).json(newProduct)
//     }
//     catch(err){
//         res.status(500).json({ message: err.message })
//     }
// })

// app.post('/bulkproducts', async (req, res) => {
//     try{
//         let newProducts = await products.insertMany(req.body)
//         res.status(201).json(newProducts)
//     }
//     catch(err){
//         res.status(500).json({ message: err.message })
//     }
// })

// app.put('/products/:id', async (req, res) => {
//     try{
//         let updatedProduct = await products.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         res.status(200).json(updatedProduct)
//     }
//     catch(err){
//         res.status(500).json({ message: err.message })
//     }
// })

// app.delete('/products/:id', async (req, res) => {
//     try{
//         let deletedProduct = await products.findByIdAndDelete(req.params.id)
//         res.status(200).json(deletedProduct)
//     }
//     catch(err){
//         res.status(500).json({ message: err.message })
//     }
// })


// //registration
// app.post('/register', async (req, res) => {
//     try{
//         const {username,password,email,role} = req.body
//         if(!username || !password || !email || !role){
//             return res.status(400).json({message : 'All fields are required'})
//         }
//         //check the user already exist or not 
//         let checkuser = await users.findOne({username})
//         if(checkuser){
//             return res.status(400).json({message : 'User already exists'})
//         }
        
//         //hash the passwords
//         const hashedPassword = await bcrypt.hash(password, 10)
//         await users.create({username, password: hashedPassword, email, role})

//         //generate a json web token
//         //payload,secretkey,expirydate   .sign() is used to generate the token
//         let payload = {username : username, emailaddress : email , role:role}
//         let token = await jwt.sign(payload,secretkey,{expiresIn:'1hr'})

//         await mail(email,username)
//         return res.json({message: "User created",token})
//     }
//     catch(err){
//         res.status(500).json({ message: err.message })
//     }
// })

// app.post('/login', async (req, res,next) => {
//     try{
//         console.log("entered")   
//         const {username,password} = req.body
//         if(!username || !password)
//             return res.json({"msg":"missing fields"})

//         let checkuser = await users.findOne({username})
//         if(!checkuser)
//             return res.status(201).json({"msg" : "User not found"})
        
//         let isvaliduser = await bcrypt.compare(password,checkuser.password)
//         if(!isvaliduser)
//             return res.json({"msg" : "Username or Password was incorrect"})
        
//         //verify the token first
//         let token = req.headers.authorization.split(' ')[1]
//         let isverified = await jwt.verify(token,secretkey)
//         if(!isverified)
//             return res.json({"msg":"invalid token"})

//         res.json({"msg":"login successful",token})
        
//     }catch(err){
//         next(err.message)
//     }
// })

// app.get('/users', async (req, res) => {
//     try{
//         let allUsers = await users.find()
//         res.status(200).json(allUsers)
//     }
//     catch(err){
//         res.status(500).json({ message: err.message })
//     }
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  connection()
})
