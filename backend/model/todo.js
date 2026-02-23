const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    event:{
    type:String,
    required:true
    },
    fromtime: {
        type: String,
        required: true,
    },
    totime: {
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;