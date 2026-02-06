export default function Websocket(token){
    const ws = new WebSocket(`ws://localhost:3005?uid=${token}`);
    console.log("WebSocket Token:", token);
    return ws;
}