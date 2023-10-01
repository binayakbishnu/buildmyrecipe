import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../Backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);

    const [loginDisabled, setLoginDisabled] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if (email === "" || password === "") return;

        logInWithEmailAndPassword(email, password);
    }

    const handleGoogleLogin = () => {
        signInWithGoogle();
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);

    useEffect(() => {
        if (email !== "" && password !== "") setLoginDisabled(false);
        else setLoginDisabled(true);
    }, [email, password]);

    return (
        <div className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] md:w-[30vw] m-auto'>
            <div className='flex gap-2 justify-center'>
                <button className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded' onClick={() => navigate("/login")}>Login</button>
                <button className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded' onClick={() => navigate("/signup")}>Signup</button>
            </div>

            <form className='w-full flex flex-col gap-5'>
                <input className='w-full bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                    onChange={handleEmailChange}
                    value={email}
                    type="email" required placeholder='Email' />
                <div className='text-left w-full'>
                    <input className='w-full bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                        onChange={handlePasswordChange}
                        value={password}
                        type="password" required placeholder='Password' />
                    <Link to="/forgotPassword" className='underline'>Forgot password?</Link>
                </div>
                <button type='submit' className={`bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl ${loginDisabled ? 'text-gray-500':'text-white'}`}
                    disabled={loginDisabled}
                    onClick={handleLoginSubmit} >
                    Login
                </button>
            </form>
            <button type='submit' className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl'
                onClick={handleGoogleLogin} >
                Login with Google
            </button>
        </div>
    )
}

export default Login