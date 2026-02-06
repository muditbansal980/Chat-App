import Friendrequest from '../../assets/friendrequest.svg'
import Search from "../../assets/search.svg"
import Profile from "../../assets/profile.png"
import { useState,useEffect } from 'react'; 
import { Link } from 'react-router-dom'
export default function Navbar() {
     const [preview, setPreview] = useState(Profile);
    // fetchign the profile pic from backend to display in navbar
    useEffect(()=>{
        async function fetchProfilePic(){
            try{
                const res = await fetch("http://localhost:3004/getuploadpic/getuploadprofile",{
                    method:"GET",
                    credentials:"include"
                });
                const data = await res.json();
                if(data.url){
                    setPreview(data.url);
                }
            }catch(err){
                console.log("Error fetching profile pic for navbar:",err);
            }
        }
        fetchProfilePic();
    })
    return (
        <div id="app-navbar" className="fixed top-0 sm:left-[100px] left-0 w-full max-w-[640px] bg-[#111b21] p-[10px] pb-[40px]">
            <div className="flex justify-between items-center">
                <div className="text-white">Logo</div>
{/* <--------------------------Friend request and profile------------------------------> */}
                <div className="flex gap-[10px]">
                    <Link to="/Friendsearch" >
                        <div className="hover:cursor-pointer"> <img src={Friendrequest} alt="Friend Requests" /></div>
                    </Link>
                    <div>  <img className="w-[32px] h-[32px] rounded-full object-cover" src={ preview} alt="Profile" /></div>
                </div>
            </div>
            <div className='flex p-[10px]'>
                <div className='flex justify-center items-center rounded-l-[60px] border-l-[1px] border-t-[1px] border-b-[1px] border-l-[#008069] border-t-[#008069] border-b-[#008069] p-[10px]'>
                    <img className="" src={Search} alt="Search" />
                </div>
                <input type="text" className="text-[20px] outline-none text-white border-r-[1px] border-t-[1px] border-b-[1px] border-b-[#008069] border-t-[#008069]  border-r-[#008069] p-[7px] w-full rounded-r-[60px] " placeholder="Search" />
            </div>
        </div>
    )
}