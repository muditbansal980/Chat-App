
import { useState, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useWebSocket } from '../../../context/WebSocketContext';
import { useParams } from "react-router-dom";


// import Websocket from '../../../websocket /ws';
export default function ChatSection(props) {
  const location = useLocation();
  // const username = location.state?.username || props.username || "Unknown User";
  const [inputText, setInputText] = useState("");
  const { sendMessage, incomeMessages: wsIncomeMessages } = useWebSocket();
  const [incomeMessages, setincomeMessages] = useState([]);
  const [sendedmessages, setsendedmessages] = useState([]);
  const id = location.state?.UserId;// Assuming UserId is passed in state from the previous page
  const { username, friendId } = useParams();
  // console.log("Username in ChatSection:", username);
  // console.log("FriendId:", friendId)
  // const token = localStorage.getItem('uid');
  // Websocket(token);
  // Websocket.onopen = () =>{
  //   console.log("Chat interface connected")
  // }
  function SendMessage() {
    if (inputText.trim() === "") return; // Don't send empty messages
    
    // Add message to local state immediately
    const newMessage = {
      Message: inputText,
      senderId: id,
      receiverId: friendId,
      createdAt: new Date().toISOString()
    };
    setsendedmessages((prev) => [...prev, newMessage]);
    
    // Send via WebSocket
    sendMessage({
      UserId: id, // id of the user who is sending the message this is the _id of the user that is in the users db 
      toFriend: friendId, //id that is given to friend in the friendlists db 
      message: inputText,
      FriendUsername: username
    });
    setInputText(""); // Clear input after sending
  }
  useEffect(() => {
    // fetching messages that the user has sent to the friend
    async function sendedMessages(e) {
      // e.preventDefault();
      try {
        const res = await fetch(`http://localhost:3004/chat/sendedmessages/${friendId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
        })

        if (!res.ok) {
          console.log("No messages found or error from server");
          return;
        }

        const data = await res.json();
        // console.log("Sended Messages:", data);
        setsendedmessages(data)
        // console.log("Sended Messages state:", sendedmessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    sendedMessages();
  }, [])
  useEffect(() => {
    async function ReceivedMessages() {
      try {
        const res = await fetch(`http://localhost:3004/chat/receivedmessages/${friendId}`, {
          method: "GET",
          credentials: "include",
        }
        )
        if (!res.ok) {
          console.log("No messages found or error from server");
          return;
        }
        const data = await res.json();
        // console.log("Received Messages:", data);
        setincomeMessages(data)
      }
      catch (error) {
        console.error("Error fetching received messages:", error);
      }
    }
    ReceivedMessages();
  }, [])
  
  // Listen for incoming WebSocket messages in real-time
  useEffect(() => {
    if (wsIncomeMessages.length > 0) {
      const latestMessage = wsIncomeMessages[wsIncomeMessages.length - 1];
      // Only add if it's from the current friend
      if (latestMessage.UserId === friendId || latestMessage.senderId === friendId) {
        const formattedMessage = {
          Message: latestMessage.message,
          senderId: latestMessage.UserId,
          receiverId: id,
          createdAt: new Date().toISOString()
        };
        setincomeMessages((prev) => [...prev, formattedMessage]);
      }
    }
  }, [wsIncomeMessages, friendId, id])
  
  return (
    <div className={`flex flex-col h-screen bg-gray-50 ${props.display}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <-----------------USERNAME-------------------> */}
          <div className="flex items-center gap-3 ">
            <ArrowLeft className='cursor-pointer' onClick={() => window.history.back()} />
            <h2 className="font-semibold text-gray-900">{username}</h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* Merged Messages - Sorted by Time */}
        <div>
          {[...sendedmessages.map(msg => ({...msg, type: 'sent'})), 
            ...incomeMessages.map(msg => ({...msg, type: 'received'}))]
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`${msg.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'} px-4 py-2 rounded-lg max-w-xs`}>
                  {msg.Message}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-end gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition mb-1">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-2 flex items-center gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none resize-none max-h-32 text-sm"
              rows="1"
            />
            <button className="p-1 hover:bg-gray-200 rounded-full transition">
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition mb-1" onClick={SendMessage}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}