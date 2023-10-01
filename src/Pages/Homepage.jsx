import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { RecipeProvider } from '../Components/RecipeContext'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../Backend/firebase"

function Homepage() {
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);
    return (
        <div className='min-h-screen flex flex-col gap-5'>
            <Navbar />
            <div className='flex-1 flex flex-row items-stretch justify-center px-2 pb-4'>
                <RecipeProvider>
                    <Outlet />
                </RecipeProvider>
            </div>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Homepage