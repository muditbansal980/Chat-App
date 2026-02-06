import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/signup/Login"
import Signup from "./components/signup/Signup";
import DuplicateError from "./components/signup/error/duplicateerror";
import Chats from "./components/dashboards/Chat/Chats";
import Uploadprofile from "./components/signup/uploadprofile";
import Sidebar from "./components/dashboardscomponents/Sidebar";
import Navbar from "./components/dashboardscomponents/Navbar";
import Notes from "./components/dashboards/Notes/Notes";
import Chatsection from "./components/dashboards/Chat/Chatinterface";
import { useState } from "react";
import FriendSearch from "./components/search/Friendsearch";
import WebSocketLayout from "./layouts/WebSocketLayout";
// import {useState} from "react"
function App() {
  const [profileUrl, setProfileUrl] = useState('/src/assets/profile.png'); //by ai
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/duplicaterror",
      element: <DuplicateError />
    },
    {
      element: <WebSocketLayout />, // 👈 PROVIDER LIVES HERE
      children: [
        {
          path: "/chats",
          element: <><Sidebar/><Chats profileUrl={profileUrl} /></>,
        },
        {
          path: "/chats/:username/:friendId",
          element: <Chatsection />,
        },
      ],
    },
    {
      path: "/uploadprofile",
      element: <Uploadprofile profileUrl={profileUrl} onUpdate={setProfileUrl} /> //added props by ai
    },
    {
      path: "/notes",
      element: <><Notes /></>
    },
    {
      path: "/Friendsearch",
      element: <FriendSearch />
    },
    // {
    //   path: "/chatinterface",
    //   element: <Chatsection />
    // }

  ])
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  )
}
export default App