import { useState } from "react";
import { API_BASE_URL } from '../../../config/api';
export default function EditNote(props) {
    const [titledit, settitledit] = useState("");
    const [content, setContent] = useState("");
    const [data,setdata] = useState(props.data);
    async function handleedit(id){
       
        try {
            const res = await fetch(`${API_BASE_URL}/notes/editnote/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                credentials: "include",
                body:JSON.stringify({
                    title:titledit,
                    content:content,
                })
            }
            
            )
        }
        catch(err){
            console.log("Error editing note :",err);
        }
        
    }
    console.log("data", data);
    if (props.display === "hidden") return null;

    return (
        <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black bg-opacity-50"
            onClick={props.onClose}
        >
            <div
                className={`relative ${props.display} z-[100] bg-gray-800 text-white border-[1px] border-white p-[5px] rounded-[10px]`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-center items-center">
                    <h1>Edit Note</h1>
                </div>
                <div className="m-[10px]">
                    <label htmlFor="titledit" className="mb-[5px]">Title</label><br />
                    <input value={titledit} onChange={e => settitledit(e.target.value)} id="titledit" placeholder="Enter Title" type="text" className="border-[1px] border-white outline-none ml-[10px] p-[2px]  bg-black text-white" />
                </div>
                <div className="m-[10px]">
                    <label htmlFor="content" className="mb-[5px]">Content</label><br />
                    <textarea value={content} onChange={e => setContent(e.target.value)} id="content" placeholder="Enter Content" className="border-[1px] border-white outline-none ml-[10px] p-[2px] bg-black text-white"></textarea>
                </div>
                <div className="flex justify-center items-center mt-[10px]">
                    <button onClick={() => handleedit(data._id)} className="bg-white hover:cursor-pointer text-black p-[5px] rounded-[5px]">Edit Note</button>
                </div>
            </div>

        </div>
    )
}