const mongoose = require('mongoose');

const uploadPicSchema = new mongoose.Schema({
    picUrl: {
        type: String,
        required: true
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
});

const UploadPic = mongoose.model('UploadPic', uploadPicSchema);
module.exports = UploadPic;