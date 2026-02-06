import { WS_BASE_URL } from "../config/api";

export default function Websocket(token){
    const ws = new WebSocket(`${WS_BASE_URL}?uid=${token}`);
    console.log("WebSocket Token:", token);
    return ws;
}