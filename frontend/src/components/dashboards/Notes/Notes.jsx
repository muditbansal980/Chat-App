import { useEffect, useState } from "react";
import AddNote from "./AddNote";
import Loading from "../../Loading/Loading"
import Sidebar from "../../dashboardscomponents/Sidebar"
import EditNote from "../../../assets/editnote.png"
import Editnote from "./EditNote";
import { API_BASE_URL } from '../../../config/api';
export default function Notes() {
    const [display, setDisplay] = useState("hidden");
    const [displays, setDisplays] = useState("hidden");
    const [noteslist, setnoteslist] = useState([]);
    const [editdata,seteditdata] = useState(null);
    const [loading, setloading] = useState(false)
    function handleaddNote() {
        if (display === "hidden") {
            setDisplay("block");
            console.log("add Note opened");
        }
        else {
            setDisplay("hidden");
            console.log("add Note closed");
        }
    }
    function handleeditnote() {
        if (displays === "hidden") {
            setDisplays("block");
            console.log("edit Note opened");
        }
        else {
            setDisplays("hidden");
            console.log("edit Note closed");
        }
    }

    useEffect(() => {
        // Fetch existing notes from backend when component mounts
        async function fetchNotes() {
            try {
                setloading(true)
                const res = await fetch(`${API_BASE_URL}/notes/notes`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setnoteslist(data);
                }
                else {
                    console.error("Failed to fetch notes");
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
            finally {
                setloading(false)
            }
        }
        fetchNotes();
    }, [editdata,displays]);
    if (loading) {
        return <Loading />
    }
    return (
        <div className="">
            <Sidebar />
            <div id="notes" className={`bg-black text-white h-screen overflow-auto ml-0 sm:ml-[100px]`}>
                <div className="header flex justify-between items-center p-[4px] pr-[14px] w-full">
                    <div className="heading text-white text-2xl font-bold p-4 flex justify-between items-center">
                        <h1>NOTES</h1>
                    </div>
                    <div onClick={handleaddNote}>
                        <div className="add-icon border-[1px] border-white rounded-full w-[20px] h-[20px] flex justify-center items-center cursor-pointer text-white">
                            +
                        </div>
                    </div>
                </div>
                <hr />
                <div className="mt-[5px] p-[10px]" >
                    {noteslist.map((note, index) => (
                        <div key={index} className=" flex justify-between note bg-white text-black rounded-[5px] p-[10px] mb-[10px]">
                            <div>
                                <h2 className="text-xl font-bold">{note.title}</h2>
                                <p className="mt-[5px]">{note.content}</p>
                            </div>
                            <div onClick={() => {seteditdata(note); handleeditnote();}} className="edit-icon ">
                                <img src={EditNote} alt="Edit Note" className="w-[36px] h-[36px] hover:cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {editdata && <Editnote
                data={editdata}
                onClose={handleeditnote}
                display={displays}
            />}
            {/* <div className="right-side absolute bg-[#392a2a] h-[100vh] hidden xl:block">
                <div className="flex justify-center items-center h-[100vh]">
                    <h1 className="text-white text-2xl font-bold">Right Side Content</h1>
                </div>
            </div> */}
            <AddNote
                display={display}
                onClose={handleaddNote}
                setnoteslist={setnoteslist}
                noteslist={noteslist}
            />
        </div >
    )
}