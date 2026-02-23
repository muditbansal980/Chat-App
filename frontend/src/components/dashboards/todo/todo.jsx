import Sidebar from "../../dashboardscomponents/Sidebar"
import { useState,useEffect } from "react"
import { API_BASE_URL } from '../../../config/api';
export default function Todo() {
    const initialEvents = [
        { id: 1, name: "Team Standup", from: "09:00", to: "09:30", color: "#FF6B6B" },
        { id: 2, name: "Design Review", from: "11:00", to: "12:00", color: "#4ECDC4" },
        { id: 3, name: "Client Call", from: "14:30", to: "15:30", color: "#FFD93D" },
    ];
    const [display, setdisplay] = useState("hidden")
    const [event, setevent] = useState("")
    const [totime, settotime] = useState("")
    const [getevents, setgetevents] = useState([])
    const [fromtime, setfromtime] = useState("")
    async function handleaddevent() {
        const res = await fetch(`${API_BASE_URL}/todo/add`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event: event,
                totime: totime,
                fromtime: fromtime
            })
        })
        try {
            if (res.ok) {
                alert("Added the todo successfully")
            }
            if (res.status === 406) {
                alert("Failed to add todo")
            }
            if (res.status === 401) {
                alert("Internal Server error")
            }
        }
        catch (err) {
            alert("Error catched", err)
        }

    }
    useEffect(() => {
        // Fetch existing events from backend when component mounts
        async function fetchevents() {
            try {
                const res = await fetch(`${API_BASE_URL}/todo/get`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setgetevents(data);
                }
                else {
                    console.error("Failed to fetch events");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }
        fetchevents();
    },);
    return (
        <>
            <Sidebar />
            <div className="relative min-h-screen overflow-auto sm:ml-[100px]">
                <div className="w-full min-h-screen bg-black flex flex-col items-center mb-10 sm:mb-0">
                    <div className="py-3 ">
                        <div>
                            <p className="font-bold text-red-400 text-2xl">Schedule</p>
                        </div>
                        <div>
                            <p className="font-bold text-white text-2xl">My Events</p>
                        </div>
                        {getevents.map((events, index) => (
                            <div key={index} className="w-full flex bg-[#1A1A28] p-2 mb-2">
                                <div className="flex bg-[#3A3A4A] p-2 m-2 flex items-center">
                                    <div className="text-white m-2">
                                        {events.fromtime}-{events.totime}
                                    </div>
                                </div>
                                <div className="flex bg-[#3A3A4A] p-2 m-2">
                                    <div className="flex items-center justify-center text-white font-bold">
                                        {events.event}
                                    </div>
                                </div>
                                <div className="flex p-2 m-2">
                                    <div className="bg-[#3A3A4A] m-2 flex items-center rounded-full p-2">
                                        🗑️
                                    </div>
                                    <div className="bg-[#3A3A4A] m-2 flex items-center rounded-full p-2">
                                        ✏️
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="w-full p-2">
                            <button className="w-full bg-red-300 p-2 text-white font-extrabold" onClick={() => { setdisplay("block") }}>+ADD EVENT</button>
                        </div>
                    </div>
                    <div className={`px-8 py-3 m-6 bg-[#12121C] rounded-md ${display}`}>
                        <div>
                            <p className="text-white text-xl font-bold mb-4">New Event</p>
                        </div>
                        <div className="flex flex-col text-white ">
                            <label htmlfor="name">Event Name</label>
                            <input onChange={(e) => { setevent(e.target.value) }} className="outline-none p-2 border-2 border-white m-1" id="name" placeholder="Enter name of event" />
                        </div>
                        <div className="flex flex-col text-white mt-4">
                            <div className="flex justify-between items-center">
                                <label htmlfor="from">From</label>
                                <input onChange={(e) => { setfromtime(e.target.value) }} type="time" className="outline-none rounded-md p-2 border-2 border-white" id="from" placeholder="Enter name of event" />
                                <label htmlfor="to">To</label>
                                <input onChange={(e) => { settotime(e.target.value) }} type="time" className="outline-none rounded-md p-2 border-2 border-white" id="to" placeholder="Enter name of event" />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button className="py-2 px-4 bg-red-400 ml-5 mt-4" onClick={() => { setdisplay("hidden") }}>Cancel</button>
                            <button className="p-2 px-4 bg-red-300 mr-5 mt-4" onClick={(handleaddevent)}>Add Event</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}