import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/Auth';
import { Link, useNavigate } from 'react-router-dom'
const Group = () => {
    const [text, setText] = useState('')
    const [group, setGroup] = useState([])
    const [info, setInfo] = useState([])
    const { auth, setAuth } = useContext(AuthContext)
    const [groupId, setGroupId] = useState('')
    const navigate = useNavigate()

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

    useEffect(function () {
        const fetchData = async function () {
            try {
                const response = await fetch('http://localhost:4000/getGroup', {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!response.ok) {
                    console.log('Something went wrong')
                }
                const result = await response.json();
                console.log(result)
                toast.success('Login Successful')
                setGroup(result)
            }
            catch (error) {
                toast.error(`Login failed ${error.message}`)
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const createGroup = async function (e) {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/createGroup', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: text })
            })
            if (!response.ok) {
                console.log('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            toast.success('Group Created')
            window.location.reload(); // This will refresh the entire page
        }
        catch (error) {
            toast.error(`Login failed ${error.message}`)
            console.log(error)
        }
    }

    console.log(groupId)
    const addMember = async function (id) {
        try {
            const response = await fetch(`http://localhost:4000/addMembers/${groupId}/${id}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (!response.ok) {
                const errorMessage = await response.json()
                toast.error(errorMessage || 'Something went wrong')
                return
            }
            const result = await response.json();
            console.log(result)
            toast.success('Member Successful')
            // Update the group state
            const updatedGroup = group.map(item =>
                item._id === groupId
                    ? { ...item, members: result } // Use result directly here
                    : item
            );
            setGroup(updatedGroup);
        }

        catch (error) {
            toast.error(`Login failed ${error.message}`)
            console.log(error)
        }
    }
    const groupDelete = async function (groupId) {
        console.log(groupId)
        try {
            const response = await fetch(`http://localhost:4000/deleteGroup/${groupId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) {
                console.log('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            toast.success('Login Successful')
            const filter = group.filter(group => group._id !== groupId)
            setGroup(filter)
        }
        catch (error) {
            toast.error(`Login failed ${error.message}`)
            console.log(error)
        }
    }
    return (
        <div>
            <div className='flex flex-col w-full my-4 justify-center items-center' >
                <p className='text-4xl font-semibold my-3'>Create Group</p>
                <div className='flex gap-3 w-full justify-center' >
                    <input type='text' placeholder='Type Name' className='border-2 px-3 border-gray-300 w-[60%] md:w-[30%] rounded-[10px]' value={text} onChange={function (e) { setText(e.target.value) }}></input>
                    <button type="button" class="btn btn-primary" onClick={createGroup}>Create</button>
                </div>
            </div>

            <div className='flex flex-wrap gap-3 w-[100%] justify-center m-auto'>
                {group.map(group => (
                    <div key={group._id} className='w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] border-2 rounded-[10px] border-gray-300 bg-gray-200 p-4 '>
                        <p className='text-3xl font-semibold my-3'>{group.name}</p>
                        <p>{group.members.map(m => (
                            <div key={m._id}>
                                <div className='flex items-center gap-3 my-2'>
                                    <p className='w-[40px] h-[40px] '><img src={`${m.profileImage}`} className='rounded-[20px] w-[40px] h-[40px] '></img></p>
                                    <div>
                                        <p className='text-[20px] font-semibold'>{m.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}</p>
                        <div className='flex flex-col gap-2 w-fit'>
                            <button data-bs-toggle="modal" className='btn btn-primary' data-bs-target="#exampleModalGroup" onClick={() => setGroupId(group._id)}>Add Members</button>
                            <button className='btn btn-primary' onClick={function () { groupDelete(group._id) }}>Delete Group</button>
                            <Link to={`/groupChat/${group._id}`}><button className='btn btn-primary' >Start GroupChat</button></Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- Cover Modal --> */}
            <div class="modal fade" id="exampleModalGroup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel" className='font-semibold text-xl'>Type Group Name</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {info.map(info => (
                                <div key={info._id}>
                                    {auth.user._id !== info._id ? (
                                        <div className='flex my-2 gap-3'>
                                            <p className='bg-black text-white px-3 py-2 rounded-[10px] transform transition-transform duration-200 hover:scale-110 cursor-pointer'>{info.name}</p>
                                            <button className='bg-black text-white px-3 py-2 rounded-[10px] transform transition-transform duration-200 hover:scale-110' onClick={function () { addMember(info._id) }}>Add in Group</button>
                                        </div>)
                                        : ''}
                                </div>
                            ))}
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

export default Group
