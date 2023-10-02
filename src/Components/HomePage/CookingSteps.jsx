import React, { useState } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
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
        console.log('editing step')
        const updatedSteps = [...recipeData.cookingSteps];
        updatedSteps[index] = e.target.value;
        setRecipeData({ ...recipeData, cookingSteps: updatedSteps });
    };

    const addToCurrentStep = (ingredient) => {
        console.log(`adding ${ingredient} to step ${currStep}`);
        document.getElementById(`step${currStep}`).value += " " + ingredient + " ";
        const updatedSteps = [...recipeData.cookingSteps];
        updatedSteps[currStep - 1] += " " + ingredient + " ";
        setRecipeData({ ...recipeData, cookingSteps: updatedSteps });
    }

    const navigate = useNavigate();
    const submitCookingSteps = () => {
        // alert("cooking steps submit");
        navigate("/home/additionalinfo")
    }

    const goBack = (e) => {
        e.preventDefault();

        navigate("/home/cookingdetails");
    }

    const cancelNewRecipe = (e) => {
        e.preventDefault();

        navigate("/home");
    }

    return (
        /* Ingredients List (Dynamic)
        Recipe Steps (Dynamic)
        Images (with the option to upload)
        Video Link, test link */
        <form onSubmit={submitCookingSteps} className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] m-auto'>
            <h2 className='text-2xl'>{recipeData?.name}</h2>

            <div className='flex flex-col gap-2'>
                {recipeData.cookingSteps.map((data, index) => (
                    <div key={index} className='flex flex-col items-center gap-2'>
                        {/* input with add/delete */}
                        <div className='flex flex-row items-center justify-start gap-2 w-full'>
                            <label htmlFor={`step${index + 1}`}>Step&nbsp;{index + 1}.</label>
                            <textarea id={`step${index + 1}`} type='text'
                                className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                                placeholder={`Enter step ${index + 1}`}
                                value={data}
                                onChange={(e) => handleStepChange(e, index)}
                            />
                            <input type='button' value="Add" aria-label='add'
                                onClick={handleAddStep}
                                className={`${currStep === index + 1 ? 'block' : 'hidden'} w-20 bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer`}
                            />
                            <input type='button' value="Delete" aria-label='delete'
                                onClick={() => handleDeleteStep(index)}
                                className={`${currStep === index + 1 ? 'hidden' : 'block'} w-20 bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer`}
                            />
                        </div>

                        <div className={`gap-2 flex-wrap ${index + 1 === currStep ? 'flex' : 'hidden'}`}>
                            {
                                recipeData.primaryIngredients.map((ingredient, index) => ((
                                    <button onClick={() => addToCurrentStep(ingredient)}
                                        className='bg-[rgba(0,0,0,0)] lg:hover:bg-white lg:hover:bg-opacity-20 text-white border rounded p-2 cursor-pointer'
                                        key={index}>{ingredient}</button>
                                )))
                            }
                            {
                                recipeData.secondaryIngredients.map((ingredient, index) => ((
                                    <button onClick={() => addToCurrentStep(ingredient)}
                                        className='bg-[rgba(0,0,0,0)] lg:hover:bg-white lg:hover:bg-opacity-20 text-white border rounded p-2 cursor-pointer'
                                        key={index}>{ingredient}</button>
                                )))
                            }
                        </div>
                        <button onClick={() => navigate('/home/ingredients')} className={`underline ${index + 1 === currStep ? 'flex' : 'hidden'}`}>Add more ingredients +</button>
                    </div>
                ))}
            </div>

            <div className='flex justify-center'>
                <button onClick={goBack}
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded flex gap-2 items-center w-fit m-auto'
                ><BsArrowLeftCircle /> Back
                </button>
                <button onClick={cancelNewRecipe}
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded flex gap-2 items-center w-fit m-auto'
                >Cancel
                </button>
                <button
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded flex gap-2 items-center w-fit m-auto'
                >Next <BsArrowRightCircle />
                </button>
            </div>
        </form>
    )
}

export default CookingSteps