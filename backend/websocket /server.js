const websocket = require('ws');
const jwt = require("jsonwebtoken")
const ChatSchema = require("../model/chat")
async function handleWebsocket(server) {
    const WebSocketServer = websocket.Server;
    const wss = new WebSocketServer({ server });
    console.log("WebSocket server attached to HTTP server");
    const clients = new Set();
    wss.on("connection", (ws, req) => {
        // console.log("CLIENTS", clients);
        console.log("New client connected");
        const token = new URL(req.url, "http://localhost").searchParams.get("uid");
        if (!token) {
            ws.close();
            return;
        }
        try {
            clients.add(ws);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded._id; // from the users collections _id
            // Mark user as connected
            ws.userId = userId;  // from the users collections _id
            // userSockets.set(userId, ws);
            console.log(`User ${userId} connected`);
            ws.on("message", async (data) => {
                // ws.send(data.toString());
                // console.log("DATA RECEIVED ON SERVER:", data.toString());
                const parsedData = JSON.parse(data.toString());
                await ChatSchema.create({
                    senderId: userId,
                    receiverId: parsedData.toFriend,// 
                    friendUsername:parsedData.FriendUsername,
                    Message:parsedData.message
                })
                // console.log("data.toFriend to server", parsedData.toFriend)
                // console.log(parsedData)
                for (let client of clients) {
                    // console.log("client.WebSocket.userId", client.userId)
                    // console.log("data.toFriend", parsedData.toFriend)
                    if (client.userId === parsedData.toFriend) {
                        if (client.readyState === websocket.OPEN) {
                            client.send(JSON.stringify(parsedData)); // ✅ broadcast as JSON string
                        }
                    }
                }
            })
        } catch (err) {
            console.log(err)
            ws.close();
            return;
        }
    });
}
module.exports = { handleWebsocket };