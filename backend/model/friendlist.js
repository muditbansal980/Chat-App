const mongoose = require("mongoose");

const friendlistschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    friendId: {
        type: String,
        required: true
    },
    friendusername:{
        type: String,
        required: true
    }
}, { timestamps: true });

const FriendList = mongoose.model("FriendList", friendlistschema);
module.exports = FriendList;