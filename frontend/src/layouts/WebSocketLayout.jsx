import { Outlet } from "react-router-dom";
import { WebSocketProvider } from "../context/WebSocketContext";

export default function WebSocketLayout() {
  return (
    <WebSocketProvider>
      <Outlet />
    </WebSocketProvider>
  );
}
