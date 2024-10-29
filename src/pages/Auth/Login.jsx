import { React, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'


const Login = () => {
  const {auth,setAuth} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async function (e) {
    console.log('click')
    try {
      e.preventDefault();
      const response = await fetch('https://chat-app-backend-lyart.vercel.app/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })
      if (!response.ok) {
        return toast.error('Something went wrong')
      }
      const result = await response.json();
      console.log(result)
      toast.success('Login Successful')
      // Update authentication state
      const authData = {
        user: result.checkUser,
        token: result.token,
      };
      setAuth(authData)
      localStorage.setItem('auth',JSON.stringify(authData))
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
          <h1 className='text-[42px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 py-2'>Login</h1>


          <div class="flex flex-col">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Your Email' id="exampleInputEmail1" value={email}
              onChange={function (e) { setEmail(e.target.value) }} aria-describedby="emailHelp" />
          </div>
          <div class="flex flex-col">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" className='bg-white rounded px-3 py-2 border-gray-200 border-[2px] mt-1 mb-4' placeholder='Type Your Password' value={password}
              onChange={function (e) { setPassword(e.target.value) }} id="exampleInputPassword1" />
          </div>
          <button className='text-white bg-gradient-to-r from-purple-700 to-blue-600 rounded px-4 py-2 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700 w-full' onClick={handleSubmit}>Login</button>

          <div className='flex justify-between'>
            <div className='flex gap-1 my-2'>
              <p>New User?</p>
              <Link to="/register"><p className='text-[16px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600'>Signup</p></Link>
            </div>
            {/* <Link to="/forget-password"><p className='text-[16px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 py-2'>Forget Password</p></Link> */}
          </div>

        </div>

      </div>
    </div>


  )
}

export default Login
