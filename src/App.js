import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
import UpdatePassword from './pages/Auth/UpdatePassword';
import Home from './pages/Home';
import ForgetPassword from './pages/Auth/ForgetPassword';
import Otp from './pages/Auth/Otp';

import { AuthProvider } from './context/Auth';
import Chat from './pages/Chat';
import Group from './pages/Group';
import GroupChat from './pages/GroupChat';
import { SocketProvider } from './context/SocketContext';

const App = () => {


    return (
        <AuthProvider>
            <SocketProvider>
                <BrowserRouter>
                    <Toaster />
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/admin' element={<AdminPage />}></Route>
                        <Route path='/profile' element={<Profile />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/update-password' element={<UpdatePassword />}></Route>
                        <Route path='/forget-password' element={<ForgetPassword />}></Route>
                        <Route path='/otp' element={<Otp />}></Route>
                        <Route path='/chat' element={<Chat />}></Route>
                        <Route path='/group' element={<Group />}></Route>
                        <Route path='/groupChat/:id' element={<GroupChat />}></Route>
                    </Routes>
                </BrowserRouter>
            </SocketProvider>
        </AuthProvider>
    );
};
export default App;