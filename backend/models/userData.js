const mongoose=require('mongoose')
const schema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role: {
    type: String,
    enum: ["client", "freelancer"], // only allow these two values
    required: true                  // make it mandatory
  }
})
const userData=mongoose.model('users',schema)
module.exports=userData