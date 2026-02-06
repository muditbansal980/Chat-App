const User = require("../model/user")
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../services/auth")
const { setUploadUserPic } = require("../services/uploadpic")



//<-----------------------SignUp----------------------->
async function handleSignup(req, res) {
    const users = await User.find();
    const body = req.body;
    const contact = Number(body.contact);
    try {
        if (!body.username || !body.password || !body.contact) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // validate contact is a number first
        if (isNaN(contact)) {
            return res.status(422).json({ message: "Enter valid contact number" });
        }
        // Ensure we compare same types (contact stored as Number in DB)
        if (users.some((user) => user.username === body.username || user.contact === contact)) {
            return res.status(409).send("Username or contact already exists");
        }

        await User.create({
            username: body.username,
            password: body.password,
            contact: contact,
            
        });
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.error("Signup error:", err);
        // If Mongo/Mongoose throws a duplicate key error, return 409 (conflict)
        if (err && err.code === 11000) {
            return res.status(409).json({ message: "Username or contact already exists" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//<-----------------------------Login-------------------------->
async function handleLogin(req, res) {
    const { username, password } = req.body;
    const users = await User.findOne({ username, password });
    try {
        if (!users) {
            return res.status(401).send("Invalid username or password");
        }
        else if (!username || !password) {
            return res.status(400).send("All fields are required");
        }
        else {
            // const sessionId = uuidv4(); // Generate a unique session ID for authentication
           
            // Store user session and log it back using getUser
            const token = setUser(users); // Store user session
            const uploadToken = setUploadUserPic(users);
            res.cookie("uid", token,{
                httpOnly: true,
                secure: true,
                sameSite: 'none', 
            } );
            res.cookie("upic", uploadToken,{
                httpOnly: true,
                secure: true, 
                sameSite: 'none', 
            });
            return res.status(200).json({ "uid": token, "upic": uploadToken } );
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}





// <--------------Exports------------>
module.exports = { handleSignup, handleLogin}