import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { useStateContext } from '../RecipeContext';

function NewRecipe() {
    const { recipeData, setRecipeData } = useStateContext();

    const recipeDespRef = useRef(null);

    // const [recipeName, setRecipeName] = useState("no name");
    const handleRecipeNameChange = (e) => {
        // setRecipeName(e.target.value);
        setRecipeData({ ...recipeData, name: e.target.value });
    }

    // const [recipeDesp, setRecipeDesp] = useState("");
    const handleRecipeDespChange = (e) => {
        // setRecipeDesp(e.target.value);
        setRecipeData({ ...recipeData, description: e.target.value });
    }

    const navigate = useNavigate();
    const submitNewRecipe = (e) => {
        e.preventDefault();

        // alert("new recipe submit");

        navigate("/home/basicdetails");
    }

    const cancelNewRecipe = (e) => {
        e.preventDefault();

        navigate("/home");
    }

    useEffect(() => {
        recipeDespRef.current.style.height = recipeDespRef.current.scrollHeight + "px";
    }, [recipeData.description])
    return (
        /* Recipe Title
        Recipe Description */
        <form onSubmit={submitNewRecipe} className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] lg:w-[30vw] m-auto'>
            <h2 className={`${recipeData.name === "" ? "text-[rgba(0,0,0,0)]" : "text-white"} text-2xl`}>{recipeData.name ? recipeData.name : "Recipe name"}</h2>

            <input className='bg-[rgba(0,0,0,0)] text-white border rounded p-2' rows="1"
                onChange={handleRecipeNameChange} value={recipeData.name === "" ? "" : recipeData.name}
                type="text" placeholder='recipe name' />

            <textarea className='bg-[rgba(0,0,0,0)] text-white border rounded p-2 overflow-hidden' rows="1"
                onChange={handleRecipeDespChange} value={recipeData.description}
                type="text" placeholder='recipe description' ref={recipeDespRef} />

            <div className='flex justify-center'>
                <button onClick={cancelNewRecipe}
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded flex gap-2 items-center w-fit m-auto'
                ><BsArrowLeftCircle /> Cancel
                </button>
                <button
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded flex gap-2 items-center w-fit m-auto'
                >Next <BsArrowRightCircle />
                </button>
            </div>

        </form >
    )
}

export default NewRecipe