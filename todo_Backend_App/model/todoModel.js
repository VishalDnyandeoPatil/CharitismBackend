const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
})

const todo = mongoose.model('todo', todoSchema);

module.exports={
    todo
}