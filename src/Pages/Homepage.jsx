import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { RecipeProvider } from '../Components/RecipeContext'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../Backend/firebase"
import { query, collection, getDocs, where } from "firebase/firestore";

function Homepage() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);
    return (
        <div className='min-h-screen flex flex-col gap-5'>
            <Navbar />
            <h2 className='text-4xl'>Welcome {name}!</h2>
            {user?.email}
            <div className='flex-1 flex flex-row items-center justify-center px-2 pb-4'>
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