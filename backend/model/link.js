const mongoose = require('mongoose');
const LinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
});

const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;