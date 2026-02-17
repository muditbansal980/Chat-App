import Sidebar from "../../dashboardscomponents/Sidebar"
import AddLink from "./addlinks"
import { API_BASE_URL } from '../../../config/api';
import Loading from "../../Loading/Loading"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
export default function Linkstg() {
    const [display, setDisplay] = useState("hidden");
    const [linklist, setlinklist] = useState([]);
    const [loading, setloading] = useState(false)
    function handleaddLink() {
        if (display === "hidden") {
            setDisplay("block");
            console.log("Add Link opened");
        }
        else {
            setDisplay("hidden");
            console.log("Add Link closed");
        }
    }
    useEffect(() => {
        // Fetch existing links from backend when component mounts
        async function fetchLinks() {
            try {
                setloading(true)
                const res = await fetch(`${API_BASE_URL}/link/getlinks`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setlinklist(data);
                }
                else {
                    console.error("Failed to fetch links");
                }
            } catch (error) {
                console.error("Error fetching link:", error);
            }
            finally {
                setloading(false)
            }
        }
        fetchLinks();
    }, [display]);
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Sidebar />
            <div id="link" className={`bg-black text-white h-screen overflow-auto ml-0 sm:ml-[100px]`}>
                <div className="header flex justify-between items-center p-[4px] pr-[14px] w-full">
                    <div className="heading text-white text-2xl font-bold p-4 flex justify-between items-center">
                        <h1>Links</h1>
                    </div>
                    <div onClick={handleaddLink}>
                        <div className="add-icon border-[1px] border-white rounded-full w-[20px] h-[20px] flex justify-center items-center cursor-pointer text-white">
                            +
                        </div>
                    </div>
                </div>
                <hr />
                <div className="mt-[5px] p-[10px]" >
                    {linklist.map((link, index) => (
                        <div key={index} className=" flex justify-between note bg-white text-black rounded-[5px] p-[10px] mb-[10px]">
                            <div>
                                <h2 className="text-xl font-bold">{link.title}</h2>
                                <Link to={link.link}> <p className="mt-[5px]">{link.link}</p></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AddLink
                display={display}
                onClose={handleaddLink}
                setlinklist={setlinklist}
                linklist={linklist}
            />
        </>
    )
}