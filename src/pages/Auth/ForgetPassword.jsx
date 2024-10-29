import { React, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async function (e) {
    console.log('click')
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:4000/send-otp', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: 'include'
      })
      if (!response.ok) {
        return toast.error('Email not found')
      }
      const result = await response.json();
      console.log(result)
      toast.success('Otp Successfully Send')
      navigate('/otp')
    }
    catch (error) {
      toast.error(`${error.message}`)
      console.log(error)
    }
  }
  return (
    <div className="h-screen">
      <Navbar />
      <div class='w-[100%] h-[100%] flex flex-col justify-center items-center bg-gray-300'>
        <div className='w-[40%] bg-white rounded-[10px] border-[2px] px-10 pt-8 pb-12 '>
          <h1 className='text-[42px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 py-4'>Forget Password</h1>

          <div class="flex flex-col">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-4' placeholder='Type Email' id="exampleInputEmail1" value={email}
              onChange={function (e) { setEmail(e.target.value) }} aria-describedby="emailHelp" />
          </div>

          <button className='text-white bg-gradient-to-r from-purple-700 to-blue-600 rounded px-4 py-2.5 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700 w-full' onClick={handleSubmit}>Update Password</button>

        </div>

      </div>
    </div>


  )
}
export default ForgetPassword




