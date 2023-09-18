import React from 'react'
import { Outlet } from 'react-router-dom'

function Homepage() {
    return (
        <div className='h-[100vh]'>
            Homepage
            <Outlet />
        </div>
    )
}

export default Homepage