import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./Auth";
import io from 'socket.io-client'
export const SocketContext = createContext()

export const SocketProvider = function ({ children }) {
    const { auth, setAuth } = useContext(AuthContext)
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(function () {
        if (auth && auth.user) {
            const socket = io('http://localhost:4000', {
                query: {
                    userId: auth.user._id
                }
            })
            socket.on('connect', function () {
                console.log(socket.id)
            })
            socket.emit('send_message', 'Hello my dosto');

            socket.on('receive', function (receive) {
                console.log(receive)
            })
            socket.on('abc',function(msg){
                console.log(msg)
            })
            
            setSocket(socket)


            // Cleanup on unmount or when auth changes
            return () => {
                socket.disconnect();
                setSocket(null);
            }
        };

    }, [auth])

    return (
        <SocketContext.Provider value={{ socket, message, setMessage }}>
            {children}
        </SocketContext.Provider>
    )
}
