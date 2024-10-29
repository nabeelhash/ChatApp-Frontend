import { React, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async function (e) {
    console.log('click')
    try {
      e.preventDefault();
      const response = await fetch('https://chat-app-backend-lyart.vercel.app/update-password', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: 'include'
      })
      if (!response.ok) {
        return toast.error('Old Password is Incorrect')
      }
      const result = await response.json();
      console.log(result)
      toast.success('Updated Password Successfully')
      navigate('/profile')
    }
    catch (error) {
      toast.error(`Login failed ${error.message}`)
      console.log(error)
    }
  }
  return (
    <div className="h-screen">
      <Navbar />
      <div class='w-[100%] h-[90%] flex flex-col justify-center items-center bg-gray-300'>
        <div className='w-[70%] md:w-[50%] lg:w-[33%] bg-white rounded-[10px] border-[2px] px-10 py-4'>
          <h1 className='text-3xl md:text-4xl lg:text-[40px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 py-4'>Update Password</h1>


          <div class="flex flex-col">
            <label for="exampleInputEmail1" class="form-label">Old Password</label>
            <input type="email" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Old Password' id="exampleInputEmail1" value={oldPassword}
              onChange={function (e) { setOldPassword(e.target.value) }} aria-describedby="emailHelp" />
          </div>
          <div class="flex flex-col">
            <label for="exampleInputPassword1" class="form-label">New Password</label>
            <input type="password" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-4' placeholder='Type New Password' value={newPassword}
              onChange={function (e) { setNewPassword(e.target.value) }} id="exampleInputPassword1" />
          </div>
          <button className='text-white bg-gradient-to-r from-purple-700 to-blue-600 rounded px-4 py-2 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700 w-full' onClick={handleSubmit}>Update Password</button>

        </div>

      </div>
    </div>


  )
}
export default UpdatePassword




