import React, { useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function BasicDetails() {
    const dietaryInfoList = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Egg-Free", "Soy-Free", "Low-Carb", "High-Protein", "Keto", "Pescatarian", "Low-Fat", "Low-Sodium", "Halal", "Kosher", "Sugar-Free", "Raw", "Low-Calorie", "High-Fiber", "Heart-Healthy", "Diabetic-Friendly", "Weight-Loss", "Low-Cholesterol", "DASH Diet", "GERD Friendly",]
    const [dietaryInfo, setDietaryInfo] = useState([]);
    const handleRecipeDietaryInfoChange = (e) => {
        if (e.target.checked) {
            setDietaryInfo(oldValues => [...oldValues, e.target.value]);
        }
        else {
            const value = e.target.value;
            setDietaryInfo(current =>
                current.filter(dietaryInfoMember => {
                    return dietaryInfoMember !== value;
                })
            );
        }
    }

    const servingsList = ["1", "2", "4", "5+"];
    const [servings, setServings] = useState("");
    const handleRecipeServingsChange = (e) => {
        for (let index = 0; index < servingsList.length; index++) {
            const element = servingsList[index];
            if (element !== e.target.value)
                document.getElementById(`${element}`).checked = false;
            else {
                document.getElementById(`${element}`).checked = true;
                setServings(e.target.value);
            }
        }
    }

    const mealTypes = ["breakfast", "dessert", "dinner", "lunch", "snack"];
    const [mealType, setMealType] = useState([]);
    const handleMealTypeChange = (e) => {
        if (e.target.checked) {
            setMealType(oldValues => [...oldValues, e.target.value]);
        }
        else {
            const value = e.target.value;
            setMealType(current =>
                current.filter(mealType => {
                    return mealType !== value;
                })
            );
        }
    }

    const navigate = useNavigate();
    const submitBasicDetails = (e) => {
        e.preventDefault();
        mealType.sort((a, b) => a > b ? 1 : -1);

        alert("basic details submit");

        navigate("/home/ingredients");
    }
    return (
        /* Dietary Information
        Servings
        Meal Type
        Privacy Settings */
        <div>
            <form onSubmit={submitBasicDetails} className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] m-auto'>
                <h2 className='text-2xl'>Recipe Name</h2>

                <div>
                    <p className='text-left p-0 m-0'>Dietary information</p>
                    <hr />
                    <div className='text-left flex flex-row flex-wrap gap-2'>
                        {
                            dietaryInfoList.map((data, index) => (
                                <div key={index} className='flex flex-row items-center gap-1'>
                                    <input type="checkbox" value={data} name={data} onChange={handleRecipeDietaryInfoChange} />
                                    <label htmlFor={data}>{data}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <p className='text-left p-0 m-0'>Dietary information</p>
                    <hr />
                    <div className='text-left flex flex-row flex-wrap gap-2'>
                        {
                            servingsList.map((data, index) => (
                                <div key={index} className='flex flex-row items-center gap-1'>
                                    <input id={data} type="radio" value={data} name={data} onChange={handleRecipeServingsChange} />
                                    <label htmlFor={data}>{data}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <p className='text-left p-0 m-0'>Meal type</p>
                    <hr />
                    <div className='text-left flex flex-row flex-wrap gap-x-2'>
                        {/* <input className='bg-[rgba(0,0,0,0)] text-white border rounded p-2 w-full'
                        onChange={handleMealTypeChange} value={mealType}
                        type="text" placeholder='meal type' list='mealTypes' />
                    <datalist id="mealTypes">
                        {
                            mealTypes.map((data, index) => (
                                <option key={index} value={data} />
                                ))
                            }
                        </datalist> */}
                        {/* <p className='text-[0.8rem] ps-2'>You add more than one type, separate with commas</p> */}
                        {
                            mealTypes.map((data, index) => (
                                <div key={index} className='flex flex-row items-center gap-1'>
                                    <input type="checkbox" value={data} name={data} onChange={handleMealTypeChange} />
                                    <label htmlFor={data}>{data}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <button
                    className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl flex gap-2 items-center w-fit m-auto'
                >Next <BsArrowRightCircle />
                </button>

            </form>
        </div>
    )
}

export default BasicDetails