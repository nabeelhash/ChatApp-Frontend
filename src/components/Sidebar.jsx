import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
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
        <div className={`w-[15%] md:${hide ? 'w-[5%]' : 'w-[15%]'} sticky top-[72px] block h-full bg-gray-800 ${hide ? 'px-2' : 'px-4'} py-4 text-white items-center justify-center`}>
            <div className='text-xl text-center mb-5'>
                <button onClick={handleHide}><i class={`fa-solid fa-arrow-${hide ? 'right' : 'left'}`}></i></button>
            </div>
            <div className={`mb-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/'><i class="fa-solid fa-house"></i></Link>
                <Link to='/'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>Home</p></Link>
            </div>
            <div className={`mb-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/profile'><i class="fa-solid fa-user"></i></Link>
                <Link to='/profile'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>Profile</p></Link>
            </div>
            {/* <div className={`mb-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/user'><i class="fa-solid fa-key"></i></Link>
                <Link to='/user'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>User Info</p></Link>
            </div> */}
            {/* <div className={`my-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/createCategory'><i class="fa-solid fa-people-group"></i></Link>
                <Link to='/allposts'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>All Posts</p></Link>
            </div>
            <div className={`my-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/follow'><i class="fa-solid fa-user-group"></i></Link>
                <Link to='/follow'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>Follow/Unfollow</p></Link>
            </div>
            <div className={`my-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/blocklist'><i class="fa-solid fa-shield"></i></Link>
                <Link to='/blocklist'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>Blocklist</p></Link>
            </div> */}
            <div className={`my-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/chat'><i class="fa-solid fa-shield"></i></Link>
                <Link to='/chat'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>Chat</p></Link>
            </div>
            <div className={`my-4 flex ${hide ? 'justify-center' : 'justify-start'} items-center gap-[12px] transform transition-transform duration-200 hover:text-gray-200`}>
                <Link to='/group'><i class="fa-solid fa-shield"></i></Link>
                <Link to='/group'><p className={`hidden md:${hide ? 'hidden' : 'block'}`}>Group</p></Link>
            </div>
            {/* <div className='my-4'>
                <Link to={'/allProducts'}><p className='bg-gradient-to-r from-blue-600 to-purple-700 transform transition-transform duration-200 hover:scale-105 text-center p-2 rounded cursor-pointer text-xl'>All Products</p></Link>
            </div> */}
        </div>
    )
}

export default Sidebar
