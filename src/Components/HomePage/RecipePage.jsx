import React from 'react'

import { BsArrowRightCircle } from 'react-icons/bs';
import { PiBowlFoodLight } from 'react-icons/pi'
import { LiaCloudscale } from 'react-icons/lia'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdPeopleOutline } from 'react-icons/md'
import { IoWarningOutline } from 'react-icons/io5'

function RecipePage({ selectedRecipe }) {
    const allergensString = selectedRecipe?.allergenList.join(", ");

    return (
        <div className='text-left bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-2 p-4 w-full sm:w-[50vw] m-auto'>
            <div>
                <div className='flex gap-x-5 items-center'>
                    <h2 className='text-2xl whitespace-nowrap'>
                        {selectedRecipe?.name}
                    </h2>
                    <div className='flex gap-x-2 gap-y-1 flex-wrap p-0 m-0'>
                        {
                            selectedRecipe?.tagList.map((data, index) => (
                                <div key={index} className='text-[0.8rem] flex gap-x-1 items-center bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2'>
                                    #{data}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <p>Difficulty: <i
                    className={`${selectedRecipe?.difficultyLevel === "easy" ? 'text-green-500' : selectedRecipe?.difficultyLevel === "hard" ? 'text-red-500' : 'text-orange-500'}`}
                >{selectedRecipe?.difficultyLevel}</i>
                </p>
                <hr />
                <p>{selectedRecipe?.description}</p>
            </div>

            <div className='flex gap-2 items-baseline'>
                <PiBowlFoodLight /* className='text-[1.4rem]' */ />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        selectedRecipe?.dietaryInfo.map((data, index) => (
                            <div key={index}
                                className='bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2 py-1 w-fit flex gap-x-1 items-center'>
                                {data}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex gap-2 items-baseline'>
                <LiaCloudscale /* className='text-[1.4rem]' */ />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        selectedRecipe?.nutrientList.map((data, index) => (
                            <div key={index} className='bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2 py-1 w-fit flex gap-x-1 items-center'>
                                {data}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <AiOutlineClockCircle />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        selectedRecipe?.mealTypes.map((data, index) => (
                            <p key={index}>{data}</p>
                        ))
                    }
                </div>
            </div>
            <p className='flex gap-2 items-center'><MdPeopleOutline />Serves: {selectedRecipe?.servings}
            </p>

            <div className='flex flex-col gap-2'>
                <div>
                    <p className='flex gap-5'>Ingredients</p>
                    <hr />
                </div>
                {/* {primaryIngredientsString} */}
                <div className={`grid grid-cols-2 items-center border rounded p-2`}>
                    {
                        selectedRecipe?.primaryIngredients.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))
                    }
                </div>
                <div>
                    <p className='text-[0.8rem] mt-2'>Additional ingredients as per taste</p>
                    {/* {secondaryIngredientsString} */}
                    <div className={`grid grid-cols-2 items-center border rounded p-2`}>
                        {
                            selectedRecipe?.secondaryIngredients.map((data, index) => (
                                <div key={index}>{data}</div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <p className='text-[0.8rem] mt-2 flex gap-1 items-center'>Allergen alert<span><IoWarningOutline className='text-yellow-500' /></span></p>
                    {allergensString}
                </div>
            </div>

            <div>
                <p className='flex gap-2'>Cooking Details</p>
                <hr />
                <div>
                    <p>
                        Preparation time: {selectedRecipe?.prepTime.hours !== 0 ? selectedRecipe?.prepTime.hours + (selectedRecipe?.prepTime.hours === 1 ? " hour " : " hours ") : ""}
                        {selectedRecipe?.prepTime.minutes !== 0 ? selectedRecipe?.prepTime.minutes + " minutes" : ""}
                    </p>
                    <p>
                        Cooking time: {selectedRecipe?.cookingTime.hours !== 0 ? selectedRecipe?.cookingTime.hours + (selectedRecipe?.cookingTime.hours === 1 ? " hour " : " hours ") : ""}
                        {selectedRecipe?.cookingTime.minutes !== 0 ? selectedRecipe?.cookingTime.minutes + " minutes" : ""}
                    </p>
                </div>
            </div>

            <div className='w-full'>
                <div className='flex justify-between'>
                    <p className='flex gap-2'>Cooking Steps</p>
                    {selectedRecipe?.demoLink !== "" &&
                        <a href={selectedRecipe?.demoLink} className='underline' target='_blank' rel="noreferrer">Demo link</a>
                    }
                </div>
                <hr />
                <ol className='list-decimal ms-5'>
                    {
                        selectedRecipe?.cookingSteps.map((data, index) => (
                            data && <li key={index}>{data}</li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

export default RecipePage