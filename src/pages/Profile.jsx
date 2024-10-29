import React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { Link } from 'react-router-dom'

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [img, setImg] = useState('')
    const [username, setUsername] = useState('')

    const [coverImg, setCoverImg] = useState('')
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()



    useEffect(function () {
        const fetchData = async function () {
            try {
                console.log('click')
                let response = await fetch('https://chat-app-backend-lyart.vercel.app/current', {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                })
                if (!response.ok) {
                    return toast.error('Something went wrong')
                }
                const result = await response.json();
                console.log(result)
                // toast.success('User Info')
                setName(result.name);
                setEmail(result.email)
                setImg(result.profileImage)
                setUsername(result.username)

            }
            catch (error) {
                return console.log(error)
            }
        }
        fetchData()
    }, [])


    const handleUpload = async function (e) {
        const file = e.target.files[0]
        try {
            const formData = new FormData();
            formData.append('pic', file)
            // Upload the image to the server
            let response = await fetch('https://chat-app-backend-lyart.vercel.app/updatePic', {
                method: 'PATCH',
                body: formData,
                credentials: 'include',
            });
            if (!response.ok) {
                return toast.error('Image upload failed');
            }
            const result = await response.json()
            setImg(result.profileImage)
            console.log(result.profileImage)
            toast.success('Image uploaded successfully');
        }
        catch (error) {
            console.log(error);
            toast.error('An error occurred');
        }
    }


    return (
        <div className='bg-gray-300 h-full'>
            <Navbar />
            <div className='flex h-[90vh]'>
                <Sidebar />
                <div className='p-5'>
                    <img src={img} className='w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] rounded-[100px] border-3 border-white'></img>
                    <div className=''>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal1" className='my-3 text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ' >Update Profile</button>
                    </div>
                    <div className='flex'>
                        <h1 className='text-xl md:text-2xl text-black '>Name:</h1>
                        <h1 className='text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent '>{name}</h1>
                    </div>
                    <div className='flex'>
                        <h1 className='text-xl md:text-2xl text-black '>Username:</h1>
                        <h1 className='text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent '>{username}</h1>
                    </div>
                    <div className='flex'>
                        <h1 className='text-xl md:text-2xl text-black '>Email:</h1>
                        <h1 className='text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent '>{email}</h1>
                    </div>
                </div>

            </div>


            {/* <!-- Profile Modal --> */}
            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel" className='font-semibold text-xl'>Upload Profile Picture</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type='file' accept='image/' onChange={handleUpload}></input>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Profile
