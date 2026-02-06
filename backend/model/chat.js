const mongoose = require("mongoose");

const ChatMessagesSchema = new mongoose.Schema({
    senderId: {
        type: String,
        ref: 'User',
    },
    receiverId: {
        type: String,
        required: true
    },
    friendUsername:{
        type:String,
        required:true,
    },
    Message:{
        type: String,
        required: true
    }
}, { timestamps: true });

const FriendList = mongoose.model("ChatMessages", ChatMessagesSchema);
module.exports = FriendList;