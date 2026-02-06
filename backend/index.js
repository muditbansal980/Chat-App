const {connectiondb} = require("./connection")
require('dotenv').config();
const express = require('express');
const app = express();
const {handleWebsocket} = require("./websocket /server");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userouter = require("./routes/user");
const notesrouter = require("./routes/notes");
const chatrouter = require("./routes/chat");
const {authMiddleware} = require("./middlewares/auth");
const {multermiddleware} = require("./middlewares/multer");
const uploadrouter = require("./routes/uploadprofilepic");
// const {uploadmiddleware} = require("./middlewares/uploadprofilepic");
const searchrouter = require("./routes/search")
// const {searchmiddleware} = require("./middlewares/search")
// app.use(cors());
app.use(
  cors({
    origin: 'https://chat-app-six-gules-60.vercel.app', // replace with your frontend origin (scheme+host+port)
    credentials: true,               // allow Access-Control-Allow-Credentials
  })
);
app.use(express.json());
app.use(cookieParser());


//<------------------- Database Connection ------------------->
connectiondb(process.env.MONGODB_URI).then(() => console.log(`MONGODB CONENCTED`))

// <---------------------- Routes --------------------->
app.use("/user",userouter)
// protect notes routes so req.user is populated from session cookie
app.use("/notes",authMiddleware,notesrouter)
app.use("/search",authMiddleware,searchrouter)
app.use("/uploadpic",authMiddleware,multermiddleware,uploadrouter)
app.use("/getuploadpic",authMiddleware,uploadrouter)
app.use("/chat",authMiddleware,chatrouter)
app.listen(process.env.PORT, () => {
    console.log(`Server is running  on http://localhost:${process.env.PORT}`);
});


handleWebsocket();