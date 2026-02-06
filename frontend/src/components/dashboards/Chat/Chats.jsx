import { useEffect, useState } from "react";
import Navbar from "../../dashboardscomponents/Navbar"
import { useNavigate } from "react-router-dom";
// import Chatinterface from "./Chatinterface";
import Websocket from "../../../websocket /ws";
export default function Chats() {
    const navigate = useNavigate();
    const [friendslist, setfriendslist] = useState([]);
    const [username,setusername]=useState("");
    const [friendId,setfriendId]=useState("");
    console.log("Id of the friend",friendId)
    useEffect(() => {
        const nav = document.getElementById('app-navbar');
        const chat = document.querySelector('.chat');

        if (!nav || !chat) return;

        function update() {
            const h = nav.offsetHeight;
            // position chat below navbar and make its height fill remaining viewport
            chat.style.top = h + 'px';
            chat.style.height = `calc(100vh - ${h}px)`;
        }

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    //fetching the friends list from the backend
    useEffect(() => {
        async function fetchfriends() {
            try {
                const fetchfriend = await fetch("http://localhost:3004/search/getfriends", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (fetchfriend.status === 200) {
                    const data = await fetchfriend.json();
                    setfriendslist(data);
                    if (data.length > 0) {
                        setusername(data[0].friendusername);
                    }
                }
            } catch (err) {
                console.error("Error fetching friends:", err);
            }

        }
        fetchfriends();
    }, []);
    // useEffect(()=>{
    //     async function handleWebsocket(){
    //         const token = localStorage.getItem('uid');
    //         const ws = Websocket(token);
    //         ws.onopen = () => {
    //             console.log("WebSocket connection established");
    //         };
    //     }
    //     handleWebsocket();
    // },[])
    return (
        <div>
            {/* <Sidebar /> */}
            <Navbar />
            <div className="chat bg-[#343f46] absolute sm:left-[100px] left-0 w-full max-w-[640px]" >
                {friendslist.map((friend) => (
                    <div 
                        key={friend._id} 
                        className="friend-item p-6 border-b border-white text-white bg-gray-950 cursor-pointer hover:bg-gray-800" 
                        onClick={() => {
                            setusername(friend.friendusername);
                            setfriendId(friend.friendId);
                            navigate(`/chats/${friend.friendusername}/${friend.friendId}`, { state: { username: friend.friendusername,UserId:friend.userId} });
                        }}
                    >
                        {friend.friendusername}  
                    </div>
                ))}
            </div>
        </div>
    )
}