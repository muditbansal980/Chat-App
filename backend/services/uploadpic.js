const jwt = require("jsonwebtoken")
const secreatkey = "uploadpic@#8800^1.0.0"
function setUploadUserPic(user){
    // <---------------------returns a random id----------------->
    return jwt.sign({
        _id: user._id,
        uploadpic: user.uploadpic,
    },secreatkey)
} 
function getUploadUserPic(token){
    if(!token) return null;
    try{
        // <-------------------------return the decoded payload-------------------------->
    return jwt.verify(token, secreatkey);
    }
    catch(err){
        console.error("JWT verification error:", err);
        return null;
    }
}
module.exports = { setUploadUserPic, getUploadUserPic };