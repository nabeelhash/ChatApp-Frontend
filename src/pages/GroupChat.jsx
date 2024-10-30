import React from 'react'
import { useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/Auth';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext';

const GroupChat = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    const [message, setMessage] = useState([])
    const [text, setText] = useState('')
    const { auth, setAuth } = useContext(AuthContext)
    // const { socket } = useContext(SocketContext)


    const messagesEndRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [message]);


    // useEffect(function () {
    //     if (socket) {
    //         socket.on('groupIncomingMessage', function (msg) {
    //             console.log('Message from server:', msg);

    //             setMessage((prev) => [...prev, msg]);

    //         });

    //         // Cleanup the event listener on unmount
    //         return () => {
    //             socket.off('return');
    //         };
    //     }
    // }, [socket])

    useEffect(function () {
        const fetchData = async function () {
            try {
                const response = await fetch(`https://chat-app-backend-lyart.vercel.app/singleGroup/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!response.ok) {
                    console.log('Something went wrong')
                }
                const result = await response.json();
                console.log(result)
                toast.success('Login Successful')
                setName(result.name)
                setMembers(result.members)
                setMessage(result.messages)
            }
            catch (error) {
                toast.error(`Login failed ${error.message}`)
                console.log(error)
            }
        }
        fetchData()
    }, [])


    const sendMessage = async function (e) {
        e.preventDefault()
        try {
            const response = await fetch(`https://chat-app-backend-lyart.vercel.app/sendMessage/${id}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            })
            if (!response.ok) {
                console.log('Something went wrong')
            }
            const result = await response.json();
            // socket.emit('groupNewMessage', result.latestMessage)

            console.log('result', result.latestMessage)
            setMessage(prev => [...prev, result.latestMessage])
            toast.success('Login Successful')
        }
        catch (error) {
            toast.error(`Login failed ${error.message}`)
            console.log(error)
        }
    }
    return (
        <div>
            <h1 className='text-5xl font-semibold flex justify-center'>{name}</h1>
            <div className='flex w-[100%] overflow-x-auto'>
                <h1 className='text-3xl font-semibold flex justify-center my-2'>Members</h1>
                <p className='flex gap-5 w-[80%] m-auto '>{members.map(m => (
                    <div key={m._id} className=''>
                        <div className='flex items-center justify-center gap-1 my-2'>
                            <p className='w-[40px] h-[40px] '><img src={`${m.profileImage}`} className='rounded-[20px] w-[40px] h-[40px] '></img></p>
                            <div>
                                <p className='text-[20px] font-semibold'>{m.name}</p>
                                <p className='text-sm text-gray-600'>{m.username}</p>
                            </div>
                        </div>
                    </div>
                ))}</p>
            </div>

            <div className='w-[100%] m-auto bg-gray-200 p-2 md:p-5 overflow-y-auto h-[588px]'>
                {message.map(message => (
                    <div key={message._id} className='w-full'>
                        {auth.user._id === message.senderId._id ?
                            <div className='flex flex-col items-end my-3'>
                                <div className='w-[90%] sm:w-[70%] md:w-[55%] lg:w-[30%] flex gap-2'>
                                    <p className='bg-blue-500 text-white w-[80%] rounded-[30px] px-4 py-2 break-words '>{message.message}</p>
                                    <p className='w-[40px] h-[40px] '><img src={`${message.senderId.profileImage}`} className='rounded-[20px] w-[40px] h-[40px] '></img></p>
                                </div>
                                <div className='w-[85%] sm:w-[65%] md:w-[52%] lg:w-[29%] flex gap-2'>
                                    <p className='text-xs text-gray-600 flex justify-start items-start'>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                            :
                            <div className='flex flex-col'>
                                <div className='w-[90%] sm:w-[70%] md:w-[55%] lg:w-[30%] flex gap-2'>
                                    <p className='w-[40px] h-[40px] '><img src={`${message.senderId.profileImage}`} className='rounded-[20px] w-[40px] h-[40px] '></img></p>
                                    <p className='bg-gray-300 text-black w-[80%] rounded-[30px] px-4 py-2 break-words' >{message.message}</p>

                                </div>
                                <div className='w-[85%] sm:w-[65%] md:w-[50%] lg:w-[27%] flex justify-end gap-2'>
                                    <p className='text-xs text-gray-600 px-3 '>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        }
                    </div>
                ))}
                {/* This empty div acts as a scroll target */}
                <div ref={messagesEndRef} />
            </div>

            <div className='bg-gray-200 flex'>
                <input type='text' className='bg-white w-full rounded-[50px] h-[55px] px-3 py-1' value={text} onChange={function (e) { setText(e.target.value) }}></input>
                <button className="btn btn-primary" onClick={sendMessage}>send</button>
            </div>

        </div>
    )
}

export default GroupChat
