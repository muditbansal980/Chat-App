const mongoose = require('mongoose');


//<------------------- Schema ------------------->
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    uploadPic:{
        type: String,
        required: false
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;
