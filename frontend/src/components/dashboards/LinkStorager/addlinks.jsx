import { useState,useEffect } from "react"
import { API_BASE_URL } from '../../../config/api';
import { useNavigate } from "react-router-dom"
export default function Addlinks(props) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState(false);
    const [ErrorMsg, setErrormsg] = useState("");
    
    const navigate = useNavigate();
    async function handleadd(e) {
        e.preventDefault();
        try {
            // <------------POST request to add note to backend-------------->
            const res = await fetch(`${API_BASE_URL}/link/addlink`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    link: link,
                })

            });
            const data = await res.json();
            if (res.status === 201) {
                setTitle("");
                setLink("");

                // <----------These two lines 28,29 will not work as due to setError(true) and setErrormsg("Note added successfully"); the re rendering happens so setTitle changes the component state and the input fields get cleared------->
                // inputValue.current.value = "";
                // contentValue.current.value = "";
                setError(true);

                setErrormsg("Link added successfully");
                props.setlinklist([...props.linklist, { "title": title, "link": link }]);
                props.onClose();
            }
            if (res.status === 404) {
                navigate("/")
            }
            else if (res.status === 406) {
                setError(true);
                setErrormsg("All fields required");
            }
        } catch (error) {
            console.error("Error adding link:", error);
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
                id="addLink"
                className={`relative ${props.display} z-[100] bg-gray-800 text-white border-[1px] border-white p-[5px] rounded-[10px]`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-center items-center">
                    <h1>AddLink</h1>
                </div>
                <div className="m-[10px]">
                    <label htmlFor="title" className="mb-[5px]">Title</label><br />
                    <input value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Enter Title" type="text" className="border-[1px] border-white outline-none ml-[10px] p-[2px]  bg-black text-white" />
                </div>
                <div className="m-[10px]">
                    <label htmlFor="link" className="mb-[5px]">Link</label><br />
                    <input value={link} onChange={e => setLink(e.target.value)} id="link" placeholder="Link..." type="text" className="border-[1px] border-white outline-none ml-[10px] p-[2px]  bg-black text-white" />
                </div>
                <div onClick={handleadd} className="flex justify-center items-center mt-[10px]">
                    <button className="bg-white hover:cursor-pointer text-black p-[5px] rounded-[5px]">Add Link</button>
                </div>
            </div>
            <div className={`bg-red-500 z-400 text-white p-4 rounded fixed top-0  ${error ? "block" : "hidden"}`} >
                <h2>{ErrorMsg}</h2>
            </div>
        </div>
    )
}