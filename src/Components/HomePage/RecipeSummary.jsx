import React from 'react'
import { BsArrowRightCircle } from 'react-icons/bs';
import { PiBowlFoodLight } from 'react-icons/pi'
import { LiaCloudscale } from 'react-icons/lia'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdPeopleOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../RecipeContext';

function RecipeSummary() {
    const { recipeData } = useStateContext();

    // const primaryIngredientsString = recipeData.primaryIngredients.join(", ");
    // const secondaryIngredientsString = recipeData.secondaryIngredients.join(", ");
    const allergensString = recipeData.allergenList.join(", ");

    const navigate = useNavigate();
    const submitRecipe = () => {
        alert("cooking steps submit");
        navigate("/home/newrecipe");
    }
    return (
        <div className=' text-left bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-2 p-4 rounded w-full sm:w-[50vw] m-auto'>
            <div>
                <div className='flex gap-x-5 items-center'>
                    <h2 className='text-2xl'>
                        {recipeData.name}
                    </h2>
                    <div className='flex gap-x-3 flex-wrap p-0 m-0'>
                        {
                            recipeData.tagList.map((data, index) => (
                                <div key={index} /* onClick={() => handlePrimaryIngredientDelete(data)} */ className='text-[0.8rem] cursor-pointer flex gap-x-1 items-center bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2'>
                                    #{data}<div /* onClick={() => handlePrimaryIngredientDelete(data)} */ className='text-red-500 text-[0.8rem]'>x</div>
                                </div>
                            ))
                        }
                    </div>
                    <p>Difficulty: <i
                        className={`${recipeData.difficultyLevel === "easy" ? 'text-green-500' : recipeData.difficultyLevel === "hard" ? 'text-red-500' : 'text-orange-500'}`}
                    >{recipeData.difficultyLevel}
                    </i></p>
                </div>
                <hr />
                <p>{recipeData.description}</p>
                {/* <p className='flex gap-2 flex-wrap'>
                    {
                        recipeData.tagList.map((data, index) => (
                            <span key={index} className='text-[0.8rem] cursor-pointer flex gap-2 items-center bg-[rgb(39,52,68)] bg-opacity-80 py-1 px-2 rounded'>
                                #{data}<div className='text-red-500 text-[0.8rem]'>x</div>
                            </span>
                        ))
                    }
                </p> */}
            </div>

            <div className='flex gap-2 items-baseline'>
                <PiBowlFoodLight /* className='text-[1.4rem]' */ />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        recipeData.dietaryInfo.map((data, index) => (
                            <div key={index} className='bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2 py-1 w-fit cursor-pointer flex gap-x-1 items-center'>
                                {data}<div /* onClick={() => handlePrimaryIngredientDelete(data)} */ className='text-red-500 text-[0.8rem]'>x</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex gap-2 items-baseline'>
                <LiaCloudscale /* className='text-[1.4rem]' */ />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        recipeData.nutrientList.map((data, index) => (
                            <div key={index} className='bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2 py-1 w-fit cursor-pointer flex gap-x-1 items-center'>
                                {data}<div /* onClick={() => handlePrimaryIngredientDelete(data)} */ className='text-red-500 text-[0.8rem]'>x</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <AiOutlineClockCircle />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        recipeData.mealTypes.map((data, index) => (
                            <p key={index}>{data}</p>
                        ))
                    }
                </div>
            </div>
            <p className='flex gap-2 items-center'><MdPeopleOutline />Serves: {recipeData.servings}</p>

            <div className='flex flex-col gap-2'>
                <div>
                    <p>Ingredients</p>
                    <hr />
                </div>
                {/* {primaryIngredientsString} */}
                <div className={`grid grid-cols-2 items-center border rounded p-2`}>
                    {
                        recipeData.primaryIngredients.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))
                    }
                </div>
                <div>
                    <p className='text-[0.8rem] mt-2'>Additional ingredients as per taste</p>
                    {/* {secondaryIngredientsString} */}
                    <div className={`grid grid-cols-2 items-center border rounded p-2`}>
                        {
                            recipeData.secondaryIngredients.map((data, index) => (
                                <div key={index}>{data}</div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <p className='text-[0.8rem] mt-2'>Allergen alert</p>
                    {allergensString}
                </div>
            </div>

            <div>
                <p>Cooking Details</p>
                <hr />
                <div>
                    <p>
                        Preparation time: {recipeData.prepTime.hours !== 0 ? recipeData.prepTime.hours + (recipeData.prepTime.hours === 1 ? " hour " : " hours ") : ""}
                        {recipeData.prepTime.minutes !== 0 ? recipeData.prepTime.minutes + " minutes" : ""}
                    </p>
                    <p>
                        Cooking time: {recipeData.cookingTime.hours !== 0 ? recipeData.cookingTime.hours + (recipeData.cookingTime.hours === 1 ? " hour " : " hours ") : ""}
                        {recipeData.cookingTime.minutes !== 0 ? recipeData.cookingTime.minutes + " minutes" : ""}
                    </p>
                </div>
            </div>

            <div className='w-full'>
                <a href={recipeData.videoLink} className='underline' target='_blank' rel="noreferrer">Demo link</a>
            </div>

            <button onClick={submitRecipe}
                className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl flex gap-2 items-center w-fit m-auto'
            >Finish <BsArrowRightCircle />
            </button>
        </div>
    )
}

export default RecipeSummary