

import { createContext, useContext, useEffect, useRef, useState } from "react";

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
    const socketRef = useRef(null);
    const [incomeMessages, setincomeMessages] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("uid");
        const ws = new WebSocket(`ws://localhost:3005?uid=${token}`);

        socketRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = async (event) => {
            try {
                if (!event.data || event.data.trim() === '') {
                    console.log('Received empty message');
                    return;
                }
                const data = JSON.parse(event.data);// string → object
                setincomeMessages((prev) => [...prev, data]);
                console.log("FULL DATA:", data);
                console.log("MESSAGE:", data.message);
            }
            catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };
        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };
        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = (payload) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            console.log(socketRef.current)
            socketRef.current.send(JSON.stringify(payload));
            console.log(payload)
        }
    };


    return (
        <WebSocketContext.Provider value={{ sendMessage, incomeMessages }}>
            {children}
        </WebSocketContext.Provider>
    );
}

export function useWebSocket() {
    return useContext(WebSocketContext);
}
