import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../Loading/Loading"
export default function Login() {
    const display = useRef(true);
    const [text, setText] = useState("Login using phone number");
    const [error, setError] = useState(false);
    const [Errormsg, setErrormsg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [loading,setloading] = useState(false);
    const navigate = useNavigate();
    const handletext = () => {
        if (display.current) {
            setText("Login using app name");
            display.current = false;
            return;
        }
        display.current = true;
        setText("Login using phone number");
    }

    
    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 2000)
    }, [error])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setloading(true)
            const res = await fetch("http://localhost:3004/user/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',   // <<-- add this
                body: JSON.stringify({
                    username: username,
                    password: password,
                    contact: contact,
                })
            });
            if (res.status === 200) {
                navigate("/uploadprofile");
                const data = await res.json();
                localStorage.setItem('uid', data.uid);
                localStorage.setItem('upic', data.upic);
            }
            else if (res.status === 401) {
                setError(true)
                setErrormsg("User does not exist")
            }
            else if (res.status === 400) {
                setError(true)
                setErrormsg("All fields are required")
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
        finally{
            setloading(false)
        }
    }
    if(loading){
        return <Loading/>
    }
    return (
        <div className="bg-black flex flex-col justify-center items-center p-[10px]  w-[100vw] h-[100vh]">
            <div className="bg-white flex flex-col gap-[10px] p-[20px] rounded-[10px] w-[300px]">
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                </div>
                <div >
                    <form className="flex flex-col justify-center items-center">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className={`outline-none p-[10px] bg-white rounded-[10px] border-[1px] border-gray-300 ${display.current ? "" : "hidden"}`} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`outline-none p-[10px] bg-white rounded-[10px] mt-[10px] border-[1px] border-gray-300 ${display.current ? "" : "hidden"}`} />
                        <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone number" className={`outline-none p-[10px] bg-white rounded-[10px] mt-[10px] border-[1px] border-gray-300 ${display.current ? "hidden" : ""}`} />
                        <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:cursor-pointer text-white p-[10px] rounded-[10px] mt-[10px] mb-[20px] w-full">{display.current ? "Login" : "Send OTP"}</button>
                        <hr className="w-full" />
                        <button onClick={handletext} type="button" className=" bg-green-500 hover:cursor-pointer text-white p-[10px] rounded-[10px] mt-[20px] w-full">{text}</button>
                    </form>
                </div>
                <div>
                    Dont't have an account yet? <a href="/signup" className="text-blue-500">Sign Up</a>
                </div>
            </div>
            <div className={`bg-red-500 text-white p-4 rounded fixed top-0  ${error ? "block" : "hidden"}`} >
                <h2>{Errormsg}</h2>
            </div>
        </div>
    )
}