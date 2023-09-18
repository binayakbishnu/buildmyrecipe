import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function LandingPage() {
    return (
        <div className='min-h-screen flex flex-col gap-5'>
            <Navbar />
            <div className='flex-1 flex flex-row items-center justify-center px-2 pb-4'>
                <Link to="/home/newrecipe"
                    className='bg-[rgb(39,52,68)] bg-opacity-80 p-4 rounded-xl'
                >Login (guest session)</Link>
            </div>
        </div>
    )
}

export default LandingPage