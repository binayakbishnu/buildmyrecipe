import React, { useEffect, useState } from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword, signInWithGoogle, } from "../../Backend/firebase";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || password === "") return;

        registerWithEmailAndPassword(name, email, password);
    }

    const handleGoogleSignup = () => {
        signInWithGoogle();
    }

    const [signupDisabled, setSignupDisabled] = useState(true);
    useEffect(() => {
        if (name !== "" && email !== "" && password !== "") setSignupDisabled(false);
        else setSignupDisabled(true);
    }, [email, password]);

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);

    return (
        <div className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] md:w-[30vw] m-auto'>
            <div className='flex gap-2 justify-center'>
                <button className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded' onClick={() => navigate("/login")}>Login</button>
                <button className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded' onClick={() => navigate("/signup")}>Signup</button>
            </div>

            <form className='w-full flex flex-col gap-5'>
                <input className='w-full bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                    onChange={handleNameChange}
                    value={name}
                    type="name" required placeholder='Name' />
                <input className='w-full bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                    onChange={handleEmailChange}
                    value={email}
                    type="email" required placeholder='Email' />
                <input className='w-full bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                    onChange={handlePasswordChange}
                    value={password}
                    type="password" required placeholder='Password' />
                <button type='submit' className={`bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl ${signupDisabled ? 'text-gray-500':'text-white'}`}
                    disabled={signupDisabled}
                    onClick={handleSignupSubmit} >
                    Signup
                </button>
            </form>
            <button type='submit' className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl'
                onClick={handleGoogleSignup} >
                Signup with Google
            </button>
        </div>
    )
}

export default Signup