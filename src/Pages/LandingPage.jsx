import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div className='h-[100vh] flex flex-row items-center justify-center'>
            <Link to="/home"
                className='bg-[rgb(39,52,68)] bg-opacity-80 p-4 rounded-xl'
            >Login (guest session)</Link>
        </div>
    )
}

export default LandingPage