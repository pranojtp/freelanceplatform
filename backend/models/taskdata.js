
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    // Link to the main project
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: true
    },
    // The specific freelancer working on the project
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    // The Kanban column status
    kanbanStatus: {
        type: String,
        enum: ['To Do', 'In Progress', 'Awaiting Review', 'Done'],
        default: 'To Do'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date,
        required: false
    }
}, { timestamps: true });

const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;