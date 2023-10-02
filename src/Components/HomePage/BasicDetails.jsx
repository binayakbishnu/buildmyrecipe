import React from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../RecipeContext';

function BasicDetails() {
    const { recipeData, setRecipeData } = useStateContext();

    const dietaryInfoList = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Egg-Free", "Soy-Free", "Low-Carb", "High-Protein", "Keto", "Pescatarian", "Low-Fat", "Low-Sodium", "Halal", "Kosher", "Sugar-Free", "Raw", "Low-Calorie", "High-Fiber", "Heart-Healthy", "Diabetic-Friendly", "Weight-Loss", "Low-Cholesterol", "DASH Diet", "GERD Friendly",]
    // const [dietaryInfo, setDietaryInfo] = useState([]);
    const handleRecipeDietaryInfoChange = (e) => {
        if (e.target.checked) {
            // setDietaryInfo(oldValues => [...oldValues, e.target.value]);
            setRecipeData({ ...recipeData, dietaryInfo: [...recipeData.dietaryInfo, e.target.value] });
        }
        else {
            const value = e.target.value;
            // setDietaryInfo(current =>
            //     current.filter(dietaryInfoMember => dietaryInfoMember !== value)
            // );

            setRecipeData(current => ({
                ...current,
                dietaryInfo: current.dietaryInfo.filter((dietaryInfoMember) => dietaryInfoMember !== value)
            })
            );
        }
    }

    const servingsList = ["1", "2", "4", "5+"];
    // const [servings, setServings] = useState("");
    const handleRecipeServingsChange = (e) => {
        for (let index = 0; index < servingsList.length; index++) {
            const element = servingsList[index];
            if (element !== e.target.value)
                document.getElementById(`${element}`).checked = false;
            else {
                document.getElementById(`${element}`).checked = true;
                // setServings(e.target.value);
                setRecipeData({ ...recipeData, servings: e.target.value });
            }
        }
    }

    const mealTypes = ["breakfast", "dessert", "dinner", "lunch", "snack"];
    // const [mealType, setMealType] = useState([]);
    const handleMealTypeChange = (e) => {
        if (e.target.checked) {
            // setMealType(oldValues => [...oldValues, e.target.value]);
            setRecipeData({ ...recipeData, mealTypes: [...recipeData.mealTypes, e.target.value] })
        }
        else {
            const value = e.target.value;
            // setMealType(current =>
            //     current.filter(mealType => {
            //         return mealType !== value;
            //     })
            // );
            setRecipeData(current => ({
                ...current,
                mealTypes: current.mealTypes.filter((mealTypesMember) => mealTypesMember !== value)
            })
            );
        }
    }

    const sortMealTypes = async () => {
        recipeData.mealTypes.sort((a, b) => a > b ? 1 : -1);
    }

    const navigate = useNavigate();
    const submitBasicDetails = async (e) => {
        e.preventDefault();
        // mealType.sort((a, b) => a > b ? 1 : -1);

        await sortMealTypes();

        // alert("basic details submit");

        navigate("/home/ingredients");
    }

    const goBack = (e) => {
        e.preventDefault();

        navigate("/home/newrecipe");
    }

    const cancelNewRecipe = (e) => {
        e.preventDefault();

        navigate("/home");
    }

    return (
        /* Dietary Information
        Servings
        Meal Type
        Privacy Settings */
        <form onSubmit={submitBasicDetails} className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[70vw] md:w-[50vw] m-auto'>
            <h2 className='text-2xl'>{recipeData?.name}</h2>

            <div>
                <p className='text-left p-0 m-0'>Dietary information</p>
                <hr />
                <div className='text-left flex flex-row flex-wrap gap-2'>
                    {
                        dietaryInfoList.map((data, index) => (
                            <div key={index} className='flex flex-row items-center gap-1'>
                                <input id={`${data}`} type="checkbox" value={data} name={data}
                                    checked={recipeData.dietaryInfo.includes(data)}
                                    onChange={handleRecipeDietaryInfoChange} />
                                <label htmlFor={data}>{data}</label>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <p className='text-left p-0 m-0'>Servings</p>
                <hr />
                <div className='text-left flex flex-row flex-wrap gap-2'>
                    {
                        servingsList.map((data, index) => (
                            <div key={index} className='flex flex-row items-center gap-1'>
                                <input id={data} type="radio" value={data} name={data}
                                    checked={recipeData.servings === data}
                                    onChange={handleRecipeServingsChange} />
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
                    {
                        mealTypes.map((data, index) => (
                            <div key={index} className='flex flex-row items-center gap-1'>
                                <input id={data} type="checkbox" value={data} name={data}
                                    checked={recipeData.mealTypes.includes(data)}
                                    onChange={handleMealTypeChange} />
                                <label htmlFor={data}>{data}</label>
                            </div>
                        ))
                    }
                </div>
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

export default BasicDetails