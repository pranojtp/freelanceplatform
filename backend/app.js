const express=require('express')
const app=express()
const morgan=require('morgan')
const cors = require('cors');
const connectDB=require('./db/connection')
const userRoute=require('./routes/userRoutes')
const projectRoute=require('./routes/projectRoutes')
const proposalRoute=require('./routes/proposalRoutes')
const taskRoutes=require('./routes/taskRoutes')
const invoiceRoutes=require('./routes/invoiceRoutes')
const paymentRoute=require('./routes/paymentRoute')
require('dotenv').config()
port=process.env.PORT || 3800
connectDB()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/authuser',userRoute)
app.use('/projects',projectRoute)
app.use('/proposals',proposalRoute)
app.use('/tasks', taskRoutes);
app.use('/invoices',invoiceRoutes)
app.use('/payment',paymentRoute)




app.listen(port,()=>{
    console.log(`App is listening at ${port}`)
})