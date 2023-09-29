import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, sendPasswordReset } from "../Auth/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function PwdReset() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleResetSubmit = (e) => {
        e.preventDefault();

        if (email === "") return;
        sendPasswordReset(email);
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);

    return (
        <div className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] md:w-[30vw] m-auto'>
            <form className='w-full flex flex-col gap-5'>
                <input className='w-full bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                    onChange={handleEmailChange}
                    value={email}
                    type="email" required placeholder='Email' />
                <button type='submit' className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl'
                    onClick={handleResetSubmit} >
                    Send reset email
                </button>
            </form>
            <button onClick={()=>navigate("/login")} type='submit' className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl'>
                Go back
            </button>
        </div>
    )
}

export default PwdReset