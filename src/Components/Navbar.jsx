import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { auth, logout } from '../Backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
    const [user] = useAuthState(auth);

    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        if (user) setShowLogout(true);
        else setShowLogout(false);
    }, [user]);

    const navigate = useNavigate();
    return (
        <div className='relative flex flex-row items-center w-full m-auto p-5 bg-[rgb(39,52,68)] bg-opacity-80'>
            <img src={logo} alt="logo" className='absolute left-4 h-[40px] aspect-auto cursor-pointer' onClick={() => navigate("/")} />
            <div className='flex flex-row justify-center items-center flex-1 gap-5'>
                <Link to="/" className='hover:underline'>Home</Link>
                <Link to="/about" className='hover:underline'>About</Link>
            </div>
            {showLogout && <button className='absolute right-4' onClick={logout}>Logout</button>}
        </div >
    )
}

export default Navbar