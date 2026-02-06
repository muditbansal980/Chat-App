
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading"
import { API_BASE_URL } from '../../config/api';
export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [error, seterror] = useState(false);
    const [Erromsg, setErrormsg] = useState("");
    const [loading,setloading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            seterror(false)
        }, 2000)
    }, [error])
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setloading(true)
            const res = await fetch(`${API_BASE_URL}/user/signup`, {
                method: "POST",
                headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    contact: contact,
                })
            });
            console.log(res.status);
            if (res.status === 201) {
                console.log("user registered")
                navigate("/")
            }
            else if (res.status === 409) {
                seterror(true)
                setErrormsg("Username or contact already registered.Try with other credentials.")
            }
            else if (res.status === 422) {
                seterror(true)
                setErrormsg("Enter a valid contact number")
            }
            else if (res.status === 400) {
                seterror(true)
                setErrormsg("All fields are required")
            }

        }
        catch (err) {
            console.log("Error in signup:", err);
        }
        finally{
            setloading(false)
        }
    }
    if(loading){
        return <Loading/>
    }
    return (
        <div className="bg-black flex flex-col justify-center items-center p-[10px] w-[100vw] h-[100vh]">
            <div className="bg-white flex flex-col gap-[10px] p-[20px] rounded-[10px] w-[300px]">
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl font-bold">SignUp</h1>
                </div>
                <div >
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="outline-none p-[10px] bg-white rounded-[10px] border-[1px] border-gray-300" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="outline-none p-[10px] bg-white rounded-[10px] mt-[10px] border-[1px] border-gray-300" />
                        <input value={contact} onChange={(e) => setContact(e.target.value)} type="tel" placeholder="Phone Number" className="outline-none p-[10px] bg-white rounded-[10px] mt-[10px] border-[1px] border-gray-300" />
                        <button type="submit" className="bg-blue-500 hover:cursor-pointer text-white p-[10px] rounded-[10px] mt-[10px] mb-[20px] w-full">Sign Up</button>
                    </form>
                </div>
                <div className="flex justify-center">
                    Already have an account? <a href="/" className="text-blue-500">Login</a>
                </div>
            </div>
            <div className={`bg-red-500 text-white p-4 rounded fixed top-0  ${error ? "block" : "hidden"}`} >
                <h2>{Erromsg}</h2>
            </div>
        </div>
    )
}