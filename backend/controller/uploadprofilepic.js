const cloudinary = require('cloudinary').v2;
const UploadPic = require("../model/uploadpicurls");
async function handleuploadpic(req, res) {
require('dotenv').config();

    // Configure Cloudinary with your credentials
        cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    const userUploadPicPath = req.file.path;
    try{
        const file = await cloudinary.uploader.upload(userUploadPicPath,{resource_type:"auto"});
        if (!file) {
            return res.status(500).json({ message: "Failed to upload image" });
        }
        await UploadPic.create({
            picUrl: file.url,
            uploadedBy: req.user._id
        });
        // console.log("Cloudinary file url:", file.url);
        return res.status(200).json({ message: "Profile picture uploaded successfully"});
}catch(err){
    console.error("Upload profile pic error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
}
}


async function handlegetuploadpic(req, res) {
    try {
        const uploadPicRecord = await UploadPic.findOne({ uploadedBy: req.user._id });
        if (!uploadPicRecord) {
            return res.status(404).json({ message: "No profile picture found" });
        }
        return res.status(200).json({ url: uploadPicRecord.picUrl });
    } catch (err) {
        console.error("Get uploaded profile pic error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = { handleuploadpic,handlegetuploadpic }