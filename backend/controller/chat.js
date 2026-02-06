const jwt = require("jsonwebtoken")
const Chat = require("../model/chat")
async function handlechatsendedmess(req,res) {
    const id = req.params.friendId; //came from frontend the id of the friend user is sending the message
    const token = req.cookies?.uid  // accessing the token from cookies
    const decoded = jwt.verify(token, "chatapp@#8800^1.0.0"); // decoding the token to get user data
    const userId = decoded._id; // id of the user who is logged in and sending message and it is the same id that is in the users db with _id field
    // console.log("UserId in chat controller who is sending message:", userId);
    // console.log("UserId in chat controller who is receiving message:", id);
    const receivedmess = await Chat.find({senderId:userId, receiverId:id}).sort({createdAt:1}) // fetching the messages that the user has sent to the friend and sorting them by creation time
    // console.log("Sended Messages",receivedmess)
    return res.status(200).json(receivedmess)
}
async function handlechatreceivedmess(req,res) {
    const id = req.params.friendId; //came from frontend the id of the friend user is receiving the message
    const token = req.cookies?.uid  // accessing the token from cookies
    const decoded = jwt.verify(token, "chatapp@#8800^1.0.0"); // decoding the token to get user data
    const userId = decoded._id; // id of the user who is logged in and receiving message and it is the same id that is in the users db with _id field
    // console.log("UserId in chat controller who is sending message:", userId);
    // console.log("UserId in chat controller who is receiving message:", id);
    const receivedmess = await Chat.find({senderId:id, receiverId:userId}).sort({createdAt:1}) // fetching the messages that the friend has sent to the user and sorting them by creation time
    // console.log("Received Messages",receivedmess)
    return res.status(200).json(receivedmess)
}       
module.exports = { handlechatreceivedmess ,handlechatsendedmess}