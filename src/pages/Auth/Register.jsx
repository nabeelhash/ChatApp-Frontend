import { React, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  console.log(name, username, email, password, confirmPassword)
  const handleSubmit = async function (e) {
    try {
      e.preventDefault();
      console.log('click')
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, password, confirmPassword })
      })
      if (!response.ok) {
        return toast.error('Something went wrong')
      }
      const result = response.json();
      console.log(result)
      toast.success('Register Successfully')
      navigate('/login')
    }
    catch (error) {
      toast.error(`Registration failed: ${error.message}`);
      console.error(error);

    }
  }

  return (
    <div className="h-screen">
      <Navbar />
      <div class='w-[100%] h-[90%] flex flex-col justify-center items-center bg-gray-300'>
        <div className='w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-[10px] border-[2px] px-10 py-4'>
          <h1 className='text-[42px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 py-2'>Sign Up</h1>

          <div class="flex flex-col">
            <label for="exampleInputEmail1" class="form-label font-medium">Name</label>
            <input type="text" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Full Name' value={name}
              onChange={function (e) { setName(e.target.value) }} id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="flex flex-col">
            <label for="exampleInputEmail1" class="form-label font-medium">Username</label>
            <input type="text" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Username' value={username}
              onChange={function (e) { setUsername(e.target.value) }} id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="flex flex-col">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Your Email' id="exampleInputEmail1" value={email}
              onChange={function (e) { setEmail(e.target.value) }} aria-describedby="emailHelp" />
          </div>
          <div class="flex flex-col">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Your Password' value={password}
              onChange={function (e) { setPassword(e.target.value) }} id="exampleInputPassword1" />
          </div>
          <div class="flex flex-col">
            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
            <input type="password" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-3' placeholder='Confirm Password' value={confirmPassword}
              onChange={function (e) { setConfirmPassword(e.target.value) }} id="exampleInputPassword1" />
          </div>

          <button className='text-white bg-gradient-to-r from-purple-700 to-blue-600 rounded px-4 py-2 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700 w-full' onClick={handleSubmit}>Register</button>
          <div className='flex gap-1 my-2'>
            <p>Already Registered?</p>
            <Link to="/login"><p className='text-[16px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500'>Login</p></Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register
