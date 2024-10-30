import { useContext } from 'react'
import { useEffect } from 'react'
import { React, useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {Link,useLocation} from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {auth,setAuth} = useContext(AuthContext)

    const handle = async function(e){
        try{
          e.preventDefault();
          const response = await fetch('https://chat-app-backend-lyart.vercel.app/logout',{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include'

          })
          if (!response.ok) {
            return toast.error('Something went wrong')    
          }
          const result = await response.json();
          console.log(result)
          localStorage.removeItem('auth')
          setAuth(false); // Update auth context
          navigate('/login')
        }
        catch(error){
          toast.error(`Logout failed ${error.message}`)    
          console.log(error)
        }
      }
  return (
    <div className="sticky top-0 w-[100%] h-[10%] flex flex-col justify-center bg-gray-700 text-white z-10">
      <div className='flex justify-between items-center py-3 px-10 md:py-3 md:px-16 '>
        <div className='text-3xl font-bold'>
            <Link to={'/'}>Nabeel</Link>
        </div>
        <div className='text-[16px] font-semibold hidden lg:block'>
            <ul className='flex '>
                <Link to='/profile'><li className='px-4'>Profile</li></Link>
                <Link to="/login"><li className='px-4'>Login</li></Link>
                <Link to="/register"><li className='px-4'>Register</li></Link>
                <Link to="/update-password"><li className='px-4'>Update Password</li></Link>
            </ul>
        </div>
        <div className='text-[16px] font-semibold text-white'>
          {auth ? (
            <button className='bg-gradient-to-r from-purple-700 to-blue-600 rounded px-4 py-2 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700' onClick={handle}>Logout</button>
          ) : (
            <Link to={'/login'}><button className='bg-gradient-to-r from-purple-700 to-blue-600 rounded px-4 py-2 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700' onClick={handle}>Login</button></Link>
          )}

        </div>
      </div>
    </div>
  )
}

export default Navbar
// ${location.pathname === '/login' ? 'border-b-2 border-white pb-2'  :''}