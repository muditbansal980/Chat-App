
const User = require("../model/user")
const FriendRequest = require("../model/pendingfriendreq")
const FriendList = require("../model/friendlist")
async function handlegetsearch(req, res) {
    try {
        const search = req.query.search
        // console.log(search)
        if (!search || search.trim() === "") {
            return res.status(204).send("nothing searched for")
        }
        if (search === req.user.name) {
            return res.status(405).send("Cannot search yourself")
        }
        const user = await User.findOne({ username: search })
        if(!user){
            return res.status(405).send("No user found")
        }
        return res.status(200).json([user]);
    } catch (err) {
        console.log("ERROR IN handlegetsearch:---->", err)
    }
}


async function handlesendfriendrequest(req,res){
    try{
        const sendingreqto = req.body.sendingreqto;
        const fromUser = req.user.name;
        // console.log("Sending friend request to:", sendingreqto, "from user:", fromUser);
        
        // Check if friend request already exists
        const existingRequest = await FriendRequest.findOne({
            fromUser: fromUser,
            toUser: sendingreqto
        });
        
        if(existingRequest){
            return res.status(409).json({message:"Friend request already sent"});
        }
        
        // Check if already friends
        const targetUser = await User.findOne({ username: sendingreqto });
        if(targetUser){
            const alreadyFriends = await FriendList.findOne({
                userId: req.user._id,
                friendusername: sendingreqto
            });
            
            if(alreadyFriends){
                return res.status(409).json({message:"Already friends"});
            }
        }
        
        await FriendRequest.create({
            fromUser:fromUser,
            toUser:sendingreqto,
        });
        return res.status(201).json({message:"Friend Request Sent Successfully"});
        
    }catch(err){
        console.log("ERROR IN handlesendfriendrequest:---->", err)
        return res.status(500).json({message:"Server error"});  
    }
}
async function handlegetfriendrequests(req,res){
    try{
        const currentUser = req.user.name;
        const friendRequests = await FriendRequest.find({ toUser: currentUser });
        return res.status(200).json(friendRequests);
    }catch(err){
        // console.log("ERROR IN handlegetfriendrequests:---->", err)  
    }
}

async function handleaddfriend(req,res){
    try{
        const friendaddid = req.body.friendadd;
        
        // Delete the friend request and get its data
        const friendRequestremove = await FriendRequest.findByIdAndDelete(friendaddid);
        if(!friendRequestremove){
            return res.status(404).json({message:"Friend Request not found"});
        }
        
        // Get the sender user's full data to access their _id
        const senderUser = await User.findOne({ username: friendRequestremove.fromUser });
        if(!senderUser){
            return res.status(404).json({message:"Sender user not found"});
        }
        
        // Current user (receiver) data
        const receiverId = req.user._id;
        const receiverName = req.user.name;
        
        // Sender user data
        const senderId = senderUser._id;
        const senderName = senderUser.username;
        
        // Create friendship entry for RECEIVER (shows sender in receiver's friend list)
        await FriendList.create({
            userId: receiverId,
            friendId: senderId.toString(),
            friendusername: senderName
        });
        
        // Create RECIPROCAL friendship entry for SENDER (shows receiver in sender's friend list)
        await FriendList.create({
            userId: senderId,
            friendId: receiverId.toString(),
            friendusername: receiverName
        });
        
        return res.status(201).json({message: "Friend added successfully for both users"});
    }catch(err){
        console.log("ERROR IN handleaddfriend:---->", err)
        return res.status(500).json({message: "Error adding friend"});  
    }
}
async function handlegetfriends(req,res){
    try{
        // const currentUserId = req.user._id;
        const currentUserId = req.user._id;
        const friends = await FriendList.find({ userId: currentUserId });
        return res.status(200).json(friends);
    }catch(err){
        console.log("ERROR IN handlegetfriend:---->", err)  
    }
}

async function handlegetsentrequests(req,res){
    try{
        const currentUser = req.user.name;
        const sentRequests = await FriendRequest.find({ fromUser: currentUser });
        return res.status(200).json(sentRequests);
    }catch(err){
        console.log("ERROR:---->", err)  
    }
}

async function handleremovefriend(req,res){
    try{
        const friendremoveid = req.body.friendremoveid;
        const removedFriend = await FriendList.findByIdAndDelete(friendremoveid);
        if(!removedFriend){
            return res.status(404).json({message:"Friend not found"});
        }
        return res.status(200).json();
    }catch(err){
        console.log("ERROR:---->", err)
    }
}

module.exports = {
    handlegetsearch,handlesendfriendrequest,handlegetfriendrequests,handleaddfriend,handlegetfriends,handlegetsentrequests,handleremovefriend
}
