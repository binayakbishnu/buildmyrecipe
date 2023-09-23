import React, { useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../RecipeContext';

function AdditionalInfo() {
    const { recipeData, setRecipeData } = useStateContext();

    const [currValue1, setCurrValue1] = useState("");
    const [currValue11, setCurrValue11] = useState("");
    // const [nutrients, setNutrients] = useState([]);
    const handleNutrientAdd = () => {
        if (!currValue1 || !currValue11 || currValue1 === " " || currValue11 === " ") return;
        // setNutrients(oldValues => [...oldValues, currValue1 + " (" + currValue11 + ")"]);
        setRecipeData({ ...recipeData, nutrientList: [...recipeData.nutrientList, currValue1 + " (" + currValue11 + ")"] })

        setCurrValue1("");
        setCurrValue11("");
        document.getElementById("nutrientInput").focus();
    }
    const handleNutrientDelete = (value) => {
        // setNutrients(current =>
        //     current.filter(nutrient => {
        //         return nutrient !== value;
        //     })
        // );
        setRecipeData(current => ({
            ...current,
            nutrientList: current.nutrientList.filter((nutrientListMember) => nutrientListMember !== value)
        })
        );
    }

    const [currValue2, setCurrValue2] = useState("");
    // const [tags, setTags] = useState([]);
    const handleTagsAdd = () => {
        if (!currValue2 || currValue2 === " ") return;
        var value = currValue2.split(" ").join("").toLowerCase();
        // setTags(oldValues => [...oldValues, value]);
        setRecipeData({ ...recipeData, tagList: [...recipeData.tagList, value] });
        setCurrValue2("");
        document.getElementById("tagInput").focus();
    }
    const handleTagsDelete = (value) => {
        // setTags(current =>
        //     current.filter(tag => {
        //         return tag !== value;
        //     })
        // );
        setRecipeData(current => ({
            ...current,
            tagList: current.tagList.filter((tagListMember) => tagListMember !== value)
        })
        );
    }

    const navigate = useNavigate();
    const submitCookingSteps = () => {
        // alert("cooking steps submit");
        navigate("/home/recipesummary")
    }
    return (
        /* Tags or Categories
        Nutritional Information (optional)
        Comments and Ratings */
        <div className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] lg:w-[30vw] m-auto'>
            <h2 className='text-2xl'>{recipeData?.name}</h2>

            <div>
                <div className='flex flex-wrap gap-2'>
                    <input id="tagInput" className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                        onChange={(e) => setCurrValue2(e.target.value)} value={currValue2}
                        type="text" placeholder='add tags without "#"' />
                    <input type='button' value="Add" onClick={handleTagsAdd} className='bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer' />
                </div>
                <div className='flex gap-2 mt-1 flex-wrap'>
                    {
                        recipeData.tagList.map((data, index) => (
                            <div key={index} onClick={() => handleTagsDelete(data)} className='cursor-pointer flex gap-2 items-baseline bg-[rgb(39,52,68)] bg-opacity-80 p-2 rounded'>
                                #{data}<div onClick={() => handleTagsDelete(data)} className='text-red-500 text-[0.8rem]'>x</div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <div className='flex flex-wrap gap-2'>
                    <input id="nutrientInput" className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                        onChange={(e) => setCurrValue1(e.target.value)} value={currValue1}
                        type="text" placeholder='add nutrient' />
                    <input className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                        onChange={(e) => setCurrValue11(e.target.value)} value={currValue11}
                        type="text" placeholder='amount with unit' />
                    <input type='button' value="Add" onClick={handleNutrientAdd} className='bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer' />
                </div>
                <div className='flex gap-2 mt-1 flex-wrap'>
                    {
                        recipeData.nutrientList.map((data, index) => (
                            <div key={index} onClick={() => handleNutrientDelete(data)} className='cursor-pointer flex gap-2 items-baseline bg-[rgb(39,52,68)] bg-opacity-80 p-2 rounded'>
                                {data}<div onClick={() => handleNutrientDelete(data)} className='text-red-500 text-[0.8rem]'>x</div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <button onClick={submitCookingSteps}
                className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl flex gap-2 items-center w-fit m-auto'
            >Next <BsArrowRightCircle />
            </button>
        </div>
    )
}

export default AdditionalInfo