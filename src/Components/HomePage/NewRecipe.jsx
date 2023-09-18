import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BsArrowRightCircle } from 'react-icons/bs'

function NewRecipe() {
    const recipeDespRef = useRef(null);

    const [recipeName, setRecipeName] = useState("no name");
    const handleRecipeNameChange = (e) => {
        setRecipeName(e.target.value);
    }

    const [recipeDesp, setRecipeDesp] = useState("");
    const handleRecipeDespChange = (e) => {
        setRecipeDesp(e.target.value);
    }

    const navigate = useNavigate();
    const submitNewRecipe = (e) => {
        e.preventDefault();

        alert("new recipe submit");

        navigate("/home/basicdetails");
    }

    useEffect(() => {
        recipeDespRef.current.style.height = recipeDespRef.current.scrollHeight + "px";
    }, [recipeDesp])
    return (
        /* Recipe Title
        Recipe Description */
        <form onSubmit={submitNewRecipe} className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] lg:w-[30vw] m-auto'>
            <h2 className={`${recipeName === "no name" ? "text-[rgba(0,0,0,0)]" : "text-white"} text-2xl`}>{recipeName}</h2>

            <input className='bg-[rgba(0,0,0,0)] text-white border rounded p-2' rows="1"
                onChange={handleRecipeNameChange} value={recipeName === "no name" ? "" : recipeName}
                type="text" placeholder='recipe name' />

            <textarea className='bg-[rgba(0,0,0,0)] text-white border rounded p-2 overflow-hidden' rows="1"
                onChange={handleRecipeDespChange} value={recipeDesp}
                type="text" placeholder='recipe description' ref={recipeDespRef} />

            <button
                className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl flex gap-2 items-center w-fit m-auto'
            >Next <BsArrowRightCircle />
            </button>

        </form >
    )
}

export default NewRecipe