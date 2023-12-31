import React, { useState } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { PiBowlFoodLight } from 'react-icons/pi'
import { LiaCloudscale } from 'react-icons/lia'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdPeopleOutline } from 'react-icons/md'
import { IoWarningOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Loader } from '../../assets/spinner.svg'

import { useStateContext } from '../RecipeContext';

import { addNewRecipe } from '../../Backend/handleRecipeDB';
import { auth } from "../../Backend/firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

function RecipeSummary() {
    const { recipeData, setRecipeData } = useStateContext();

    // const primaryIngredientsString = recipeData?.primaryIngredients.join(", ");
    // const secondaryIngredientsString = recipeData?.secondaryIngredients.join(", ");
    const allergensString = recipeData?.allergenList?.join(", ");

    const navigate = useNavigate();

    const goToPage = (page) => {
        navigate(page);
    }

    const difficultyTypes = ["easy", "moderate", "hard"];
    const changeDifficulty = () => {
        let currIndex = difficultyTypes.indexOf(recipeData?.difficultyLevel);
        let newIndex = (currIndex + 1) % difficultyTypes.length;
        setRecipeData({ ...recipeData, difficultyLevel: difficultyTypes[newIndex] });
    }

    const [finishBtnLoading, setFinishBtnLoading] = useState(false);
    const finishLoading = async (state) => {
        setFinishBtnLoading(state);
    }

    const [user] = useAuthState(auth);
    const updateDB = async () => {
        let returnVal = await addNewRecipe(user, recipeData);
        finishLoading(false);
        return returnVal;
    }

    const submitRecipe = () => {
        finishLoading(true).then(() => updateDB()).then((returnValue) => {
            if (returnValue === "no errors") {
                setRecipeData({
                    name: "",
                    description: "",
                    dietaryInfo: [],
                    nutrientList: [],
                    mealTypes: [],
                    servings: "",
                    primaryIngredients: [],
                    secondaryIngredients: [],
                    allergenList: [],
                    prepTime: { hours: 0, minutes: 0 },
                    cookingTime: { hours: 0, minutes: 0 },
                    difficultyLevel: "",
                    cookingSteps: [''],
                    demoLink: "",
                    tagList: [],
                });
                navigate("/home");
                return true;
            }
            else {
                console.warn(returnValue);
                return false;
            }
        });
    }

    const goBack = (e) => {
        e.preventDefault();

        navigate("/home/additionalinfo");
    }

    const cancelNewRecipe = (e) => {
        e.preventDefault();

        navigate("/home");
    }

    return (
        <div className='text-left bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-2 p-4 rounded w-full sm:w-[50vw] m-auto'>
            <div>
                <div className='flex gap-x-5 items-center'>
                    <h2 className='text-2xl whitespace-nowrap'>
                        {recipeData?.name}
                    </h2>
                    <div className='flex gap-x-2 gap-y-1 flex-wrap p-0 m-0'>
                        {
                            recipeData?.tagList?.map((data, index) => (
                                <div key={index} className='text-[0.8rem] flex gap-x-1 items-center bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2'>
                                    #{data}
                                </div>
                            ))
                        }
                        <span onClick={() => goToPage("/home/additionalinfo")} className='underline cursor-pointer'>edit</span>
                    </div>
                </div>
                <p>Difficulty: <i onClick={changeDifficulty}
                    className={`cursor-pointer ${recipeData?.difficultyLevel === "easy" ? 'text-green-500' : recipeData?.difficultyLevel === "hard" ? 'text-red-500' : 'text-orange-500'}`}
                >{recipeData?.difficultyLevel}
                </i></p>
                <hr />
                <p>{recipeData?.description}</p>
            </div>

            <div className='flex gap-2 items-baseline'>
                <PiBowlFoodLight /* className='text-[1.4rem]' */ />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        recipeData?.dietaryInfo?.map((data, index) => (
                            <div key={index}
                                className='bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2 py-1 w-fit flex gap-x-1 items-center'>
                                {data}
                            </div>
                        ))
                    }
                    <p onClick={() => goToPage("/home/basicdetails")} className='underline cursor-pointer'>click to edit</p>
                </div>
            </div>
            <div className='flex gap-2 items-baseline'>
                <LiaCloudscale /* className='text-[1.4rem]' */ />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        recipeData?.nutrientList?.map((data, index) => (
                            <div key={index} className='bg-[rgb(39,52,68)] bg-opacity-80 rounded px-2 py-1 w-fit flex gap-x-1 items-center'>
                                {data}
                            </div>
                        ))
                    }
                    <p onClick={() => goToPage("/home/additionalinfo")} className='underline cursor-pointer'>click to edit</p>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <AiOutlineClockCircle />
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        recipeData?.mealTypes?.map((data, index) => (
                            <p key={index}>{data}</p>
                        ))
                    }
                    <p onClick={() => goToPage("/home/basicdetails")} className='underline cursor-pointer'>edit</p>
                </div>
            </div>
            <p className='flex gap-2 items-center'><MdPeopleOutline />Serves: {recipeData?.servings}
                <span onClick={() => goToPage("/home/basicdetails")} className='underline cursor-pointer'>edit</span>
            </p>

            <div className='flex flex-col gap-2'>
                <div>
                    <p className='flex gap-5'>Ingredients<span onClick={() => goToPage("/home/ingredients")} className='underline cursor-pointer'>edit</span></p>
                    <hr />
                </div>
                {/* {primaryIngredientsString} */}
                <div className={`grid grid-cols-2 items-center border rounded p-2`}>
                    {
                        recipeData?.primaryIngredients?.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))
                    }
                </div>
                <div>
                    <p className='text-[0.8rem] mt-2'>Additional ingredients as per taste</p>
                    {/* {secondaryIngredientsString} */}
                    <div className={`grid grid-cols-2 items-center border rounded p-2`}>
                        {
                            recipeData?.secondaryIngredients?.map((data, index) => (
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
                <p className='flex gap-2'>Cooking Details<span onClick={() => goToPage("/home/cookingdetails")} className='underline cursor-pointer'>edit</span></p>
                <hr />
                <div>
                    <p>
                        Preparation time: {recipeData?.prepTime?.hours !== 0 ? recipeData?.prepTime?.hours + (recipeData?.prepTime?.hours === 1 ? " hour " : " hours ") : ""}
                        {recipeData?.prepTime?.minutes !== 0 ? recipeData?.prepTime?.minutes + " minutes" : ""}
                    </p>
                    <p>
                        Cooking time: {recipeData?.cookingTime?.hours !== 0 ? recipeData?.cookingTime?.hours + (recipeData?.cookingTime?.hours === 1 ? " hour " : " hours ") : ""}
                        {recipeData?.cookingTime?.minutes !== 0 ? recipeData?.cookingTime?.minutes + " minutes" : ""}
                    </p>
                </div>
            </div>

            <div className='w-full'>
                <div className='flex justify-between'>
                    <p className='flex gap-2'>Cooking Steps<span onClick={() => goToPage("/home/cookingsteps")} className='underline cursor-pointer'>edit</span></p>
                    {recipeData?.demoLink !== "" &&
                        <a href={recipeData?.demoLink} className='underline' target='_blank' rel="noreferrer">Demo link</a>
                    }
                </div>
                <hr />
                <ol className='list-decimal ms-5'>
                    {
                        recipeData?.cookingSteps?.map((data, index) => (
                            data && <li key={index}>{data}</li>
                        ))
                    }
                </ol>
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
                <button onClick={submitRecipe} disabled={finishBtnLoading}
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded w-fit m-auto flex gap-2 items-center'
                > Finish
                    {finishBtnLoading === true ?
                        <Loader className="animate-spin duration-500 infinite linear" /> :
                        <BsArrowRightCircle />
                    }
                    {/* Finish <BsArrowRightCircle /> */}
                </button>
            </div>
        </div>
    )
}

export default RecipeSummary