import React, { useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../RecipeContext';

function CookingSteps() {
    const { recipeData, setRecipeData } = useStateContext();

    const [currStep, setCurrStep] = useState(recipeData.cookingSteps.length);

    const handleAddStep = () => {
        setRecipeData({ ...recipeData, cookingSteps: [...recipeData.cookingSteps, ''] });
        setCurrStep(currStep + 1);
    };

    const handleDeleteStep = (indexToDelete) => {
        setRecipeData(current => ({
            ...current,
            cookingSteps: current.cookingSteps.filter((_, index) => index !== indexToDelete)
        })
        );
        setCurrStep(currStep - 1);
    }

    const handleStepChange = (e, index) => {
        const updatedSteps = [...recipeData.cookingSteps];
        updatedSteps[index] = e.target.value;
        setRecipeData({ ...recipeData, cookingSteps: updatedSteps });
    };

    const navigate = useNavigate();
    const submitCookingSteps = () => {
        // alert("cooking steps submit");
        navigate("/home/additionalinfo")
    }
    return (
        /* Ingredients List (Dynamic)
        Recipe Steps (Dynamic)
        Images (with the option to upload)
        Video Link, test link */
        <div className=''>
            <div className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] m-auto'>
                <h2 className='text-2xl'>{recipeData?.name}</h2>

                <div className='flex flex-col gap-2'>
                    {recipeData.cookingSteps.map((data, index) => (
                        <div key={index} className='flex flex-row items-center justify-start gap-2'>
                            <label htmlFor={`step${index}`}>Step&nbsp;{index + 1}.</label>
                            <textarea id={`step${index}`} type='text'
                                className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                                placeholder={`Enter step ${index + 1}`}
                                value={data}
                                onChange={(e) => handleStepChange(e, index)}
                            />
                            <input type='button' value="Add"
                                onClick={handleAddStep}
                                className={`${currStep === index + 1 ? 'block' : 'hidden'} w-20 bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer`}
                            />
                            <input type='button' value="Delete"
                                onClick={() => handleDeleteStep(index)}
                                className={`${currStep === index + 1 ? 'hidden' : 'block'} w-20 bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer`}
                            />
                        </div>
                    ))}
                </div>

                <button onClick={submitCookingSteps}
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl flex gap-2 items-center w-fit m-auto'
                >Next <BsArrowRightCircle />
                </button>
            </div>

            <div className='mt-5 bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-2 p-4 rounded w-full sm:w-[50vw] m-auto'>
                <p className='flex gap-2 flex-wrap'>
                    {
                        recipeData.primaryIngredients.map((data, index) => ((
                            <span key={index}>{data}</span>
                        )))
                    }
                </p>
                <p className='flex gap-2 flex-wrap'>
                    {
                        recipeData.secondaryIngredients.map((data, index) => ((
                            <span key={index}>{data}</span>
                        )))
                    }
                </p>
            </div>
        </div>
    )
}

export default CookingSteps