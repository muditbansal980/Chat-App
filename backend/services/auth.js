const jwt = require("jsonwebtoken")
const secreatkey = "chatapp@#8800^1.0.0"
function setUser(user){
    // <---------------------returns a random id----------------->
    return jwt.sign({
        _id: user._id,
        name: user.username,
    },secreatkey)
} 

function getUser(token){
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

module.exports = { setUser, getUser }; 