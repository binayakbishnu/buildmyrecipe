import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.svg'

function Navbar() {
    return (
        <div className='relative flex flex-row items-center w-full m-auto p-5 bg-[rgb(39,52,68)] bg-opacity-80'>
            <img src={logo} alt="logo" className='absolute h-[40px] aspect-auto' />
            <div className='flex flex-row justify-center items-center flex-1 gap-5'>
                <Link to="/home/newrecipe" className='hover:underline'>Home</Link>
                <Link to="/" className='hover:underline'>About</Link>
            </div>
        </div>
    )
}

export default Navbar