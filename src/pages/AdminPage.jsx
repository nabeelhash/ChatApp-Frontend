import { React, useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [users,setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(function () {
        const fetchData = async function () {
            try {
                console.log('hello')
                let response = await fetch('http://localhost:4000/admin', {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                })
                if (!response.ok) {
                    toast.error('You are not Admin')
                    navigate('/profile')
                    return
                }
                const result = await response.json();
                console.log(result)
                toast.success('User Info')
                setUsers(result)
            }
            catch (error) {
                return console.log(error)
            }
        }
        fetchData()
    }, [])
  return (
    <div>
      {users.map((user,index)=>(
        <div>
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <img src={`http://localhost:4000/${user.profileImage}`} style={{width: '200px'}}></img>
        </div>
      ))}
    </div>
  )
}

export default AdminPage
