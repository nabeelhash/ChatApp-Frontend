import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import chatImage from '../chat.jpg'

const Home = () => {

    return (
        <div className='h-[100vh] flex flex-col justify-start items-center'>
            <Navbar />
            <div className='relative flex-grow w-full bg-cover bg-right md:bg-center' style={{ backgroundImage: `url(${chatImage})` }}>
                {/* Dark overlay */}
                <div className='absolute inset-0 bg-black opacity-30 z-10'></div>

                {/* Content */}
                <div className='relative z-20 flex flex-col justify-center items-center h-full'>
                    <h1 className='px-10 leading-[50px] text-4xl sm:text-4xl md:text-6xl text-white font-bold text-center'>
                        Welcome To User Auth Website
                    </h1>
                    <div className='text-[18px] font-semibold my-12'>
                        <Link to='/chat'>
                            <button className='text-white bg-gradient-to-r from-purple-700 to-blue-600 rounded px-4 py-2 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700'>
                                Start Chat
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
