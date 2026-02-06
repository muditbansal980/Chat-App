const mongoose = require('mongoose');

const friendreqschema = new mongoose.Schema({
    fromUser: {
        type: "String",
        required: true
    },
    toUser: {
        type: "String",
        required: true
    },
    status: {
        type: String,
        // enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
});

const FriendRequest = mongoose.model('FriendRequest', friendreqschema);

module.exports = FriendRequest;