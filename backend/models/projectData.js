const mongoose = require('mongoose')
const schema = mongoose.Schema({
    projectName: String,
    projectDescription: String,
    estimatedAmount: String,
    dueDate: String,
})
const productData = mongoose.model('projects', schema)
module.exports = productData