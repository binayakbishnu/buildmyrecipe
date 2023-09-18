import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='absolute top-0 flex flex-row justify-center w-screen gap-5 m-auto p-5 bg-[rgb(39,52,68)] bg-opacity-80'>
            <Link to="/home/newrecipe" className='hover:underline'>Home</Link>
            <Link to="/" className='hover:underline'>About</Link>
        </div>
    )
}

export default Navbar