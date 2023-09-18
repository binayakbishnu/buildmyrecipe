import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function Homepage() {
    return (
        <div className='min-h-screen flex flex-col gap-5'>
            <Navbar />
            <div className='flex-1 flex flex-row items-center justify-center px-2 pb-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default Homepage