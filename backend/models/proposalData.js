const mongoose=require('mongoose')
const schema=mongoose.Schema({
    projectName:String,
    clientName:String,
    projectDescription:String,
    freelancerName:String,
    proposalAmount:String,
    dueDate:String
})
const productData=mongoose.model('proposals',schema)
module.exports=productData