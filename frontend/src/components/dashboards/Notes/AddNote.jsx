import { useState, useEffect, useRef } from "react";
import Editnote from "./EditNote";
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from '../../../config/api';
export default function AddNote(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [error, setError] = useState(false);
    const [ErrorMsg, setErrormsg] = useState("");
    const navigate = useNavigate();
    async function handleadd(e) {
        e.preventDefault();
        try {
            // <------------POST request to add note to backend-------------->
            const res = await fetch(`${API_BASE_URL}/notes/addnote`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                })

            });
            const data = await res.json();
            if (res.status === 201) {
                setTitle("");
                setContent("");


                // <----------These two lines 28,29 will not work as due to setError(true) and setErrormsg("Note added successfully"); the re rendering happens so setTitle changes the component state and the input fields get cleared------->
                // inputValue.current.value = "";
                // contentValue.current.value = "";
                setError(true);
                setErrormsg("Note added successfully");
                props.setnoteslist([...props.noteslist, { "title": title, "content": content }]);
            }
            if (res.status === 404) {
                navigate("/")
            }
            else if (res.status === 406) {
                setError(true);
                setErrormsg("All fields required");
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 2000)
    }, [error])
    if (props.display === "hidden") return null;

    return (
        <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black bg-opacity-50"
            onClick={props.onClose}
        >
            <div
                id="addNote"
                className={`relative ${props.display} z-[100] bg-gray-800 text-white border-[1px] border-white p-[5px] rounded-[10px]`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-center items-center">
                    <h1>AddNote</h1>
                </div>
                <div className="m-[10px]">
                    <label htmlFor="title" className="mb-[5px]">Title</label><br />
                    <input value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Enter Title" type="text" className="border-[1px] border-white outline-none ml-[10px] p-[2px]  bg-black text-white" />
                </div>
                <div className="m-[10px]">
                    <label htmlFor="content" className="mb-[5px]">Content</label><br />
                    <textarea value={content} onChange={e => setContent(e.target.value)} id="content" placeholder="Enter Content" className="border-[1px] border-white outline-none ml-[10px] p-[2px] bg-black text-white"></textarea>
                </div>
                <div className="flex justify-center items-center mt-[10px]">
                    <button onClick={handleadd} className="bg-white hover:cursor-pointer text-black p-[5px] rounded-[5px]">Add Note</button>
                </div>
            </div>
            <div className={`bg-red-500 text-white p-4 rounded fixed top-0  ${error ? "block" : "hidden"}`} >
                <h2>{ErrorMsg}</h2>
            </div>
            <Editnote />
        </div>
    )
}   