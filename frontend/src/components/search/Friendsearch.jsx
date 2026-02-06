import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserPlus, Users } from 'lucide-react';
import Loading from "../Loading/Loading"
import Sidebar from "../dashboardscomponents/Sidebar"
import FriendRequestImg from "../../assets/friendrequest.svg"
// import FriendRequestSentImg from "../../assets/friend-req-sent.png"
export default function FriendSearch() {
    const [searchvalue, setsearchvalue] = useState("")
    const navigate = useNavigate()
    const [error, seterror] = useState(false)
    const [Errormsg, seterrormsg] = useState("")
    const [friendrequests, setfriendrequests] = useState([]) //storing all friend requests sent to the logged in user
    const [friendlist, setfriendlist] = useState([]) //storing all friends of the logged in user    
    const [searchresult, setsearchresult] = useState([])
    const [loading, setloading] = useState(false)
    const [sentRequests, setSentRequests] = useState([]) //storing friend requests sent by the logged in user

    // <-----------------------------------Search Handler-------------------------->
    async function handlesearch(e) {
        e.preventDefault();
        try {
            setloading(true)
            const getres = await fetch(`http://localhost:3004/search/friends?search=${encodeURIComponent(searchvalue)}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (getres.status === 200) {
                const data = await getres.json();
                setsearchresult(data)
            }
            else if (getres.status === 405) {
                seterror(true)
                seterrormsg("No such user")
            }
            else if (getres.status === 204) {
                navigate("/Friendsearch")
            }
            else if (getres.status === 404) {
                navigate("/")
            }
            else if (getres.status === 405) {
                seterror(true)
                seterrormsg("No such user")
            }
        }
        catch (err) {
            console.log("Error in handlesearch:", err)
        }
        finally {
            setloading(false)
        }
    }
    async function handlependreq(e) {
        e.preventDefault();
        try {
            const sendreq = await fetch("http://localhost:3004/search/sendrequest", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        sendingreqto: searchresult[0].username,
                    }
                )
            });

            if (sendreq.status === 201) {
                alert("Friend request sent successfully");
                setSentRequests([...sentRequests, searchresult[0].username]);
            }
            else if (sendreq.status === 409) {
                const data = await sendreq.json();
                alert(data.message);
            }
            else {
                alert("Failed to send friend request");
            }
        } catch (err) {
            console.log("Error in handlependreq:", err)
        }
    }
    async function handleaddfriend(id) {
        // e.preventDefault()
        try {
            const addfriendres = await fetch("http://localhost:3004/search/addfriend", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        friendadd: id
                    }
                )
            })
            if (addfriendres.status === 201) {
                alert("Friend added successfully")

                // Remove from pending requests
                setfriendrequests(friendrequests.filter(req => req._id !== id));

                // Refetch friends list
                const fetchfriendres = await fetch("http://localhost:3004/search/getfriends", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await fetchfriendres.json();
                setfriendlist(data);
            }
            else {
                alert("Error adding friend")
            }
        } catch (err) {
            console.log("Error in handleaddfriend:", err)
        }
    }
    useEffect(() => {
        async function getfriendres() {
            const getfriendres = await fetch("http://localhost:3004/search/getfriendrequests", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            )
            const data = await getfriendres.json();
            setfriendrequests(data);
        }
        getfriendres();
    }, [])
    useEffect(() => {
        async function fetchFriends() {
            const fetchfriendres = await fetch("http://localhost:3004/search/getfriends", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await fetchfriendres.json();
            console.log("Friends List:", data);
            setfriendlist(data);
        }
        fetchFriends();
    }, [])

    useEffect(() => {
        async function fetchSentRequests() {
            try {
                const response = await fetch("http://localhost:3004/search/getsentrequests", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setSentRequests(data.map(req => req.toUser));
                }
            } catch (err) {
                console.log("Error fetching sent requests:", err);
            }
        }
        fetchSentRequests();
    }, [])

    async function handleremovefriend(id) {
        const removeres = await fetch("http://localhost:3004/search/removefriend", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                friendremoveid: id
            })

        })
        if (removeres.status === 200) {
            alert("Friend removed successfully");
            setfriendlist(friendlist.filter(friend => friend._id !== id));
        }
        else {
            alert("Error removing friend");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            seterror(false)
        }, 2000)
    }, [error])
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Sidebar />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 sm:pl-[100px]">

                <div className="max-w-7xl mx-auto">
                    {/* <---------------------Search Bar-------------------------> */}
                    <div className="search-bar mb-8">
                        <div className="">
                            <form onSubmit={handlesearch} className="flex flex-col justify-center relative">
                                <input value={searchvalue} onChange={(e) => setsearchvalue(e.target.value)} className="text-white bg-transparent border-[1px] border-white w-full rounded-l-[60px] rounded-r-[60px] outline-none p-[10px]" placeholder="Search" />
                                <div className="flex justify-center">  <button type="submit" className="bg-blue-300 rounded-[10px] p-[10px] mt-[10px] w-[100px] hover:cursor-pointer">Search</button></div>
                            </form>
                        </div>
                    </div>
                    {/* <--------------------------Search Results Container--------------------> */}
                    {searchresult.map(user => {
                        const isRequestSent = sentRequests.includes(user.username);
                        const isAlreadyFriend = friendlist.some(friend => friend.friendusername === user.username);

                        return (
                            <div key={user._id} className="bg-transparent text-white mt-[200px] border-[1px] h-[60px] w-full border-[white]">
                                <div className="flex justify-between items-center p-[10px]">
                                    <div>
                                        {user.username}
                                    </div>
                                    {isAlreadyFriend ? (
                                        <div className="text-green-400 font-semibold">Already Friends</div>
                                    ) : isRequestSent ? (
                                        <div className="text-yellow-400 font-semibold">Request Sent</div>
                                    ) : (
                                        <div className="bg-white rounded-full p-[5px] hover:cursor-pointer">
                                            <img src={FriendRequestImg} onClick={handlependreq} className="invert w-[24px] h-[24px]" alt="Friend Request" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    {/* <--------------------------Pending Requests Container--------------------------> */}
                    <div className="mb-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <UserPlus className="w-6 h-6" />
                            Pending Requests
                        </h2>
                        {friendrequests.map((req) => (
                            <div key={req._id} className="flex items-center justify-between bg-white/20 rounded-lg p-4 mb-4">
                                <div className="text-white">{req.fromUser}</div>
                                <div className="flex gap-[10px]">
                                    <button className={`bg-yellow-500 p-[10px] rounded-lg hover:cursor-pointer`} onClick={() => handleaddfriend(req._id)}>Accept</button>
                                    <button className="bg-red-500 p-[10px] rounded-lg ml-[10px] hover:cursor-pointer">Decline</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <-----------------------------Friends List Container---------------------------> */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            My Friends
                        </h2>
                        {friendlist.map((friend) => (
                            <div key={friend._id} className="flex items-center justify-between bg-white/20 rounded-lg p-4 mb-4">
                                <div className="text-white">{friend.friendusername}</div>
                                <div>
                                    <button onClick={() => handleremovefriend(friend._id)} className="bg-red-500 p-[10px] rounded-lg ml-[10px] hover:cursor-pointer">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <--------------------------Error Message--------------------------> */}
            <div className={`bg-red-500 text-white p-4 rounded fixed left-[50%] top-0  ${error ? "block" : "hidden"}`} >
                <h2>{Errormsg}</h2>
            </div>
        </>
    )
}