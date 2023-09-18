import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function Homepage() {
    return (
        <div className='min-h-screen flex flex-row items-center justify-center'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Homepage