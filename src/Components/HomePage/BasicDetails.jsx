import React, { useEffect, useRef, useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function BasicDetails() {
    const [dietaryInfo, setDietaryInfo] = useState("");
    const handleRecipeDietaryInfoChange = (e) => {
        setDietaryInfo(e.target.value);
    }

    const [servings, setServings] = useState("");
    const handleRecipeServingsChange = (e) => {
        setServings(e.target.value);
    }

    const navigate = useNavigate();
    const submitBasicDetails = (e) => {
        e.preventDefault();

        alert("basic details submit");

        navigate("/home/ingredients");
    }
    return (
        /* Dietary Information
        Servings
        Meal Type
        Privacy Settings */
        <div>
            <form onSubmit={submitBasicDetails} className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] lg:w-[30vw] m-auto'>
                <h2 className='text-2xl'>Recipe Name</h2>

                <input className='bg-[rgba(0,0,0,0)] text-white border rounded p-2' rows="1"
                    onChange={handleRecipeDietaryInfoChange} value={dietaryInfo}
                    type="text" placeholder='dietary information' />

                <input className='bg-[rgba(0,0,0,0)] text-white border rounded p-2' rows="1"
                    onChange={handleRecipeServingsChange} value={servings}
                    type="number" placeholder='servings' />

                <button
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl flex gap-2 items-center w-fit m-auto'
                >Next <BsArrowRightCircle />
                </button>

            </form>
        </div>
    )
}

export default BasicDetails