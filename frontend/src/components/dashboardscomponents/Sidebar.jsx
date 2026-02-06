import Chaticon from "../../assets/live-chat.png"
import Todo from "../../assets/to-do.png"
import Notes from "../../assets/edit.png"
import LinkImg from "../../assets/link.png"
import { Link } from "react-router-dom"
export default function Sidebar() {
    return (
        <>
            {/* <---------------------------------for Mobiles----------------------------------> */}
            <div className="sidebar fixed bottom-0 grid grid-cols-4 bg-[#3E474D] w-[100vw] sm:hidden p-[10px] z-[1000]">
                <div className="hover:cursor-pointer">
                    <div className="flex justify-center items-center" ><img className="w-[36px]  invert sepia-100 saturate-[200] hover:grayscale-0 transition duration-300" src={Todo} /></div>
                    <div className="flex justify-center items-center text-[white] ">Todo</div>
                </div>
                <Link to="/chats">
                    <div className="hover:cursor-pointer">
                        <div className="flex justify-center items-center" ><img className="w-[36px]  invert sepia-100 saturate-[200] hover:grayscale-0 transition duration-300" src={Chaticon} /></div>
                        <div className="flex justify-center items-center text-[white] ">Chats</div>
                    </div>
                </Link>
                <Link to="/notes"> <div className="hover:cursor-pointer">
                    <div className="flex justify-center items-center" ><img className="w-[36px]  invert sepia-100 saturate-[200] hover:grayscale-0 transition duration-300" src={Notes} /></div>
                    <div className="flex justify-center items-center text-[white] ">Notes</div>
                </div></Link>
                <div className="hover:cursor-pointer">
                    <div className="flex justify-center items-center" ><img className="w-[36px]  invert sepia-100 saturate-[200] hover:grayscale-0 transition duration-300" src={LinkImg} /></div>
                    <div className="flex justify-center items-center text-[white] ">Link</div>
                </div>
            </div>
            {/* <---------------------------------for larger devices----------------------------------> */}
            <div id="sidebar" className="fixed left-0 grid grid-rows-4 bg-[#3E474D] h-[100vh] w-[100px] hidden sm:block p-[10px] pt-[20px] z-[1000]">
                <div className="hover:cursor-pointer">
                    <div className="flex justify-center items-center mt-[5px]" ><img className="w-[36px]  invert sepia-100 saturate-[200] hover:grayscale-0 transition duration-300" src={Todo} /></div>
                    <div className="flex justify-center items-center text-[white] ">Todo</div>
                </div>
                <Link to="/chats"><div className="hover:cursor-pointer">
                    <div className="flex justify-center items-center mt-[15px]" ><img className="w-[36px]  invert sepia-100 saturate-[200] hover:grayscale-0 transition duration-300" src={Chaticon} /></div>
                    <div className="flex justify-center items-center text-[white] ">Chats</div>
                </div></Link>
                <Link to="/notes"><div className="hover:cursor-pointer">
                    <div className="flex justify-center items-center mt-[15px]" ><img className="w-[36px]  invert sepia-100 saturate-[200] hover:grayscale-0 transition duration-300" src={Notes} /></div>
                    <div className="flex justify-center items-center text-[white] ">Notes</div>
                </div></Link>
                <div className="hover:cursor-pointer">
                    <div className="flex justify-center items-center mt-[15px]" ><img className="w-[36px]  invert sepia-100 saturate-[200] hover:grayscale-0 transition duration-300" src={LinkImg} /></div>
                    <div className="flex justify-center items-center text-[white] ">Link</div>
                </div>
            </div>
        </>
    )
}