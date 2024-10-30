import React from 'react'
import { useContext } from 'react';
import { useState, useEffect, useInterval, useRef } from 'react';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import { SocketContext } from '../context/SocketContext';

const Chat = () => {
    const [info, setInfo] = useState([]);
    const [filter, setFilter] = useState([]);

    const { auth, setAuth } = useContext(AuthContext)
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverImg, setReceiverImg] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [mode, setMode] = useState('text')
    const [files, setFiles] = useState(null)
    // const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    const messagesEndRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]);

    useEffect(function(){
        if(!auth){
            navigate('/login')
        }
    },[auth])

    // useEffect(function () {
    //     if (socket) {
    //         socket.on('return', function (msg) {
    //             console.log('Message from server:', msg);
    //             // Here, you can update the conversation state with the new message
    //             if (msg.senderId === receiverId) {
    //                 // alert('compare')
    //                 toast.success('New msg received')
    //                 setConversation((prev) => [...prev, msg]);
    //             }
    //         });

    //         // Cleanup the event listener on unmount
    //         return () => {
    //             socket.off('return');
    //         };
    //     }
    // }, [socket, receiverId])

    useEffect(function () {
        const fetchData = async function () {
            try {
                const response = await fetch('https://chat-app-backend-lyart.vercel.app/allUsers', {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!response.ok) {
                    console.log('Something went wrong')
                }
                const result = await response.json();
                console.log(result)
                toast.success('Login Successful')
                setInfo(result)
            }
            catch (error) {
                toast.error(`Login failed ${error.message}`)
                console.log(error)
            }
        }
        fetchData()

    }, [])

    const startConversation = async function (id) {
        setReceiverId(id)
        try {
            const response = await fetch(`https://chat-app-backend-lyart.vercel.app/get/${id}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (!response.ok) {
                console.log('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            toast.success('Conversation fetched')
            setConversation(result)

            const response1 = await fetch(`https://chat-app-backend-lyart.vercel.app/single/${id}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (!response1.ok) {
                console.log('Something went wrong')
            }
            const result1 = await response1.json();
            console.log(result1)
            toast.success('Conversation fetched')
            setReceiverName(result1.name)
            setReceiverImg(result1.profileImage)

        }
        catch (error) {
            toast.error(`Login failed ${error.message}`)
            console.log(error)
        }
    }

    const sendMessage = async function (id) {
        try {

            const formData = new FormData()
            formData.append('pic', files)
            formData.append('message', message)
            formData.append('mode', files ? "image" : "text")

            const response = await fetch(`https://chat-app-backend-lyart.vercel.app/sender/${id}`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            if (!response.ok) {
                console.log('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            // socket.emit('newMessages', result)

            const addValue = [...conversation, result]
            setConversation(addValue)
            setMessage('')
            setFiles(null)
            toast.success('Conversation fetched')
        }
        catch (error) {
            toast.error(`Login failed ${error.message}`)
            console.log(error)
        }
    }
    console.log(receiverId)

    useEffect(function () {
        let filtered = info

        filtered = userSearch ? info.filter(info => info.name.toLowerCase().includes(userSearch.toLowerCase())) : info
        setFilter(filtered)
    }, [userSearch, info])
    return (

        <div className='flex h-screen bg-gray-100'>
            <div id='left' className='w-[14%] md:w-[30%] py-2 px-2'>
                <div className='h-[100%] '>
                    <div className='flex flex-col justify-center w-fit mg:w-full h-[70px] border-2 border-gray-200 rounded-[30px] '>
                        {info.map(info => (
                            <div key={info._id} className='flex items-center gap-2'>
                                {auth.user._id === info._id ? (
                                    <div className='flex justify-center items-center'>
                                        <div className='flex items-center gap-0 '>
                                            <p className='w-[65px] h-[65px] '><img src={`${info.profileImage}`} className='rounded-[50px] w-[55px] h-[55px] lg:w-[65px] lg:h-[65px] '></img></p>
                                            <div>
                                                <p className='text-[18px] md:pl-1 lg:pl-4 hidden md:block md:text-[22px] lg:text-[30px] font-semibold'>{info.name}</p>
                                                {/* <p className='text-sm text-gray-600'>{info.username}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                ) : ''}
                            </div>
                        ))}
                    </div>
                    <div className='h-[88%] rounded-[20px] w-fit lg:w-full mt-2 bg-white md:px-2 lg:px-5 py-3'>
                        <input type="search" value={userSearch} onChange={function (e) { setUserSearch(e.target.value) }} className='bg-gray-100 w-full rounded-[50px] h-[48px] px-3 py-1 hidden md:block' placeholder='search name' />
                        <div className='flex flex-col justify-between h-[70px] w-full'>
                            {filter.map(info => (
                                <div key={info._id} className='flex items-center gap-2'>
                                    {auth.user._id !== info._id ? (
                                        <div className='flex justify-start items-center mt-4 border-b-2 pb-2 w-full border-gray-100' onClick={() => startConversation(info._id)}>
                                            <div className='flex items-center  gap-0'>
                                                <p className='w-[60px] h-[60px] pl-2 lg:pl-0'><img src={`${info.profileImage}`} className='rounded-[50px] lg:w-[60px] lg:h-[60px] w-[50px] h-[50px] '></img></p>
                                                <div className='flex flex-col pl-3 lg:pl-4'>
                                                    <p className='lg:text-2xl md:text-xl md:block hidden font-semibold cursor-pointer'>{info.name}</p>
                                                    <p className='lg:text-xl md:text-lg md:block hidden font-light cursor-pointer'>{info.username}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div id='right' className='w-[86%] md:w-[70%] py-2 px-3'>
                <div className='h-[10%] bg-gray-100 rounded-[20px] px-4 py-2 border-2 border-gray-200'>
                    <div className='flex flex-col justify-between  rounded'>
                        {receiverName ? (
                            <div className='flex items-center gap-3'>
                                <p className='w-[55px] h-[55px] '><img src={`${receiverImg}`} className='rounded-[50px] w-[55px] h-[55px] '></img></p>
                                <p className='text-2xl font-semibold'>{receiverName}</p>
                            </div>) :
                            <p className='text-xl bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text '>Select User to Start the Chat</p>}
                    </div>
                </div>
                <div className='h-[80%] bg-gray-100 px-4 py-2 overflow-auto'>
                    {receiverId ? (
                        conversation.length !== 0 ?
                            conversation.map(con => (
                                <div key={con._id} className='mb-3 w-full'>
                                    {auth.user._id === con.senderId ? (
                                        <div className='flex flex-col items-end'>
                                            {con.mode === "text" ? (
                                                <p className='bg-blue-500 text-white w-[80%] sm:w-[55%] md:w-[45%] lg:w-[30%] rounded-[30px] px-4 py-2 break-words '>{con.message}</p>
                                            ) : (
                                                <img src={`${con.imageUrl}`} alt="Image" className='rounded-[30px] w-[70%] sm:w-[50%] md:w-[45%] lg:w-[30%]' />
                                            )}
                                            <p className='text-xs text-gray-600'>{new Date(con.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>) :
                                        <div className='flex flex-col items-start'>
                                            {con.mode === "text" ? (
                                                <p className='bg-white text-black w-[80%] sm:w-[55%] md:w-[45%] lg:w-[30%] rounded-[30px] px-4 py-2 break-words' >{con.message}</p>
                                            ) : (
                                                <img src={`${con.imageUrl}`} alt="Sent" className='rounded-[30px] w-[70%] sm:w-[50%] md:w-[45%] lg:w-[30%]' />
                                            )}
                                            <p className='text-xs text-gray-600 text-right w-[80%] sm:w-[55%] md:w-[45%] lg:w-[30%]'>{new Date(con.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    }
                                </div>
                            )) : 'No Conversation found'
                    ) : (
                        <div className='flex justify-center items-center h-full'>
                            <p className='text-xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text '>Select User to Start the Chat</p>
                        </div>)
                    }
                    {/* Scroll Target */}
                    <div ref={messagesEndRef} />
                </div>

                <div className='flex items-center gap-3 h-[10%]'>
                    <input type="text" value={message} onChange={function (e) { setMessage(e.target.value) }} className='bg-white w-full rounded-[50px] h-[50px] ml-3 pl-5 py-1' placeholder='Type message' />
                    <input className='w-[70px] h-[30px] rounded-[10px] border-2 border-gray-600 ' type="file" accept='image/*' onChange={function (e) { setFiles(e.target.files[0]) }} />

                    <i onClick={() => sendMessage(receiverId)} class="fa-solid fa-paper-plane bg-blue-600 w-[75px] md:w-[50px] h-[43px] rounded-[30px] text-center content-center text-white" ></i>
                </div>


            </div>
        </div >
    )
}

export default Chat
