import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import Advertisement from '../advertisement.jpg'
const Rightbar = () => {
    const [info, setInfo] = useState([]);
    const { auth, setAuth } = useContext(AuthContext)
    useEffect(function () {
        const fetchData = async function () {
            try {
                const response = await fetch('http://localhost:4000/allUsers', {
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

    const [hide, setHide] = useState(false)
    const handleHide = function () {
        if (hide === false) {
            setHide(true)
        }
        else {
            setHide(false)
        }
    }
    console.log(hide)
    return (
        <div className={`w-[25%] hidden lg:block px-8  sticky top-[72px] h-full bg-gray-800 py-4 text-white items-center justify-center`}>

            <p className='text-2xl my-2'>Profile</p>
            {info.map(info => (
                <Link to={'/profile'}><div key={info._id} className='flex mb-1'>
                    {auth.user._id === info._id ?
                        <div className='flex justify-center items-center gap-3'>
                            <p className='w-[10%%] mb-3'><img className='rounded-[30px] w-[50px] h-[50px]' src={`http://localhost:4000/${info.profileImage}`}></img></p>
                            <p className='text-xl text-center font-semibold mb-3'>{info.name}</p>
                        </div>
                        : ''}
                </div></Link>
            ))}
            <p className='text-2xl my-2'>Advertisement</p>
            <p className='w-[100%] mb-3'><img className='rounded' src={Advertisement}></img></p>

            <div className={`mb-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/'><i class="fa-solid fa-house"></i></Link>
                <Link to='/'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>Home</p></Link>
            </div>
            {info.map(info => (
                <div key={info._id} className='flex'>
                    {auth.user._id !== info._id ?
                        <div className='flex justify-center items-center gap-3'>
                            <p className='w-[10%%] mb-3'><img className='rounded-[30px] w-[50px] h-[50px]' src={`http://localhost:4000/${info.profileImage}`}></img></p>
                            <p className='text-xl text-center font-semibold mb-3'>{info.name}</p>
                        </div>
                        : ''}
                </div>
            ))}



            {/* <div className='my-4'>
                <Link to={'/allProducts'}><p className='bg-gradient-to-r from-blue-600 to-purple-700 transform transition-transform duration-200 hover:scale-105 text-center p-2 rounded cursor-pointer text-xl'>All Products</p></Link>
            </div> */}
        </div>
    )
}

export default Rightbar
