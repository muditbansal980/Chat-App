
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/profile.png";
import { API_BASE_URL } from '../../config/api';
// Uploadprofile now accepts props:   (string) and onUpdate (function)
export default function Uploadprofile() {
    const fileInputRef = useRef(null);
    const [trigger, setTrigger] = useState(false);
    const [preview, setPreview] = useState(Profile);
    const navigate = useNavigate();

    // Navigate to chats after uploading profile pic
    function handleNext() {
        navigate("/chats");
    }
    // Trigger file input click
    function UploadPic() {
        fileInputRef.current?.click();
    }
    // Handle file selection and create preview
    async function handleFileChange(e) {
        const file = e.target.files?.[0] || Profile;
        if (!file) return;
        //convert file to formdata and send to backend
        const formData = new FormData();
        formData.append("profilePic", file);
        try {
            const res = await fetch(`${API_BASE_URL}/uploadpic/uploadprofile`, {
                method: "POST",
                headers: {
                    // "Content-Type":"multipart/form-data"  // Do not set content-type for multipart/form-data, browser will set it including boundary
                },
                credentials: "include",
                body: formData
            })
            const data = await res.json();
            console.log("Profile pic upload response:", data);
        }
        catch (err) {
            console.log("Error uploading profile picture:", err);
        }
        setTrigger(prev => !prev);
    }
    useEffect(() => {
        try {
            async function getUploadPic() {
                const res = await fetch(`${API_BASE_URL}/getuploadpic/getuploadprofile`, {
                    method: "GET",
                    credentials: "include"
                });
                const data = await res.json();
                if (data.url) {
                    setPreview(data.url);
                }
            }
            getUploadPic();
        } catch (err) {
            console.log("Error fetching uploaded profile picture:", err);
        }

    },[trigger]);
    return (
        <div className="h-[100vh] w-[100vw] bg-[#343f46] p-[50px]">
            <div className="flex flex-col items-center gap-4">
                <div
                    className="w-[150px] h-[150px] rounded-full overflow-hidden flex justify-center items-center bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${preview})`
                    }}
                >
                </div>
            </div>
            <div className="flex justify-center">
                <input
                    name="profilePic"
                    type="file"
                    ref={fileInputRef} // this makes the input accessible now fileinputRef.current will point to this input element
                    onChange={handleFileChange} // Handle file selection
                    accept="image/*" //used to accept only image files and every type of image
                    className="hidden"
                />
                <button onClick={UploadPic} className="bg-white m-[20px] p-[5px] rounded-[20px]">
                    Upload Pic
                </button>
                <button onClick={handleNext} className="bg-white m-[20px] p-[5px] rounded-[20px]">
                    Next
                </button>
            </div>
        </div>
    );
}
