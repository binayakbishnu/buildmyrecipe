import React from 'react'
import { BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function RecipeSummary() {
    const navigate = useNavigate();
    const submitRecipe = () => {
        alert("cooking steps submit");
        navigate("/home/newrecipe");
    }
    return (
        <div className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] lg:w-[30vw] m-auto'>
            <h2 className='text-2xl'>Recipe Name</h2>

            <button onClick={submitRecipe}
                className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl flex gap-2 items-center w-fit m-auto'
            >Next <BsArrowRightCircle />
            </button>
        </div>
    )
}

export default RecipeSummary