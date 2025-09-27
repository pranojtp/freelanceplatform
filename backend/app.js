const express=require('express')
const app=express()
const morgan=require('morgan')
const cors = require('cors');
const connectDB=require('./db/connection')
const userRoute=require('./routes/userRoutes')
require('dotenv').config()
port=process.env.PORT || 3800
connectDB()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/authuser',userRoute)



app.listen(port,()=>{
    console.log(`App is listening at ${port}`)
})