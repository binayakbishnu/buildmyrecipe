import React, { useState } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../RecipeContext';

function Ingredients() {
    const { recipeData, setRecipeData } = useStateContext();

    const [currValue1, setCurrValue1] = useState("");
    const [currValue11, setCurrValue11] = useState("");
    // const [primaryIngredients, setPrimaryIngredients] = useState([]);
    const handlePrimaryIngredientAdd = () => {
        if (!currValue1 || !currValue11 || currValue1 === " " || currValue11 === " ") return;
        // setPrimaryIngredients(oldValues => [...oldValues, currValue1 + " (" + currValue11 + ")"]);
        setRecipeData({ ...recipeData, primaryIngredients: [...recipeData.primaryIngredients, currValue1 + " (" + currValue11 + ")"] })
        setCurrValue1("");
        setCurrValue11("");
        document.getElementById("primaryIngredient").focus();
    }
    const handlePrimaryIngredientDelete = (value) => {
        // setPrimaryIngredients(current =>
        //     current.filter(primaryIngredient => {
        //         return primaryIngredient !== value;
        //     })
        // );
        setRecipeData(current => ({
            ...current,
            primaryIngredients: current.primaryIngredients.filter((primaryIngredientsMember) => primaryIngredientsMember !== value)
        })
        );
    }

    const [currValue2, setCurrValue2] = useState("");
    const [currValue21, setCurrValue21] = useState("");
    // const [secondaryIngredients, setSecondaryIngredients] = useState([]);
    const handleSecondaryIngredientAdd = () => {
        if (!currValue2 || !currValue21 || currValue2 === " " || currValue21 === " ") return;
        // setSecondaryIngredients(oldValues => [...oldValues, currValue2 + " (" + currValue21 + ")"]);
        setRecipeData({ ...recipeData, secondaryIngredients: [...recipeData.secondaryIngredients, currValue2 + " (" + currValue21 + ")"] })
        setCurrValue2("");
        setCurrValue21("");
        document.getElementById("secondaryIngredient").focus();
    }
    const handleSecondaryIngredientDelete = (value) => {
        // setSecondaryIngredients(current =>
        //     current.filter(secondaryIngredient => {
        //         return secondaryIngredient !== value;
        //     })
        // );
        setRecipeData(current => ({
            ...current,
            secondaryIngredients: current.secondaryIngredients.filter((secondaryIngredientsMember) => secondaryIngredientsMember !== value)
        })
        );
    }

    const allergens = ["Nuts", "Peanuts", "Dairy", "Eggs", "Soy", "Wheat", "Gluten", "Shellfish", "Mollusks", "Others",];
    // const [allergenList, setAllergenList] = useState([]);
    const [showOthers, setShowOthers] = useState(false);
    const [currAllergen, setcurrAllergen] = useState("");
    const handleAllergenAdd = (e) => {
        if (e.target.name === "Others") {
            setShowOthers(!showOthers);
            return;
        }
        if (currAllergen) {
            // setAllergenList(oldValues => [...oldValues, currAllergen]);
            setRecipeData({ ...recipeData, allergenList: [...recipeData.allergenList, currAllergen] })
            setcurrAllergen("");
            return;
        }

        if (e.target.checked) {
            // setAllergenList(oldValues => [...oldValues, e.target.value]);
            setRecipeData({ ...recipeData, allergenList: [...recipeData.allergenList, e.target.value] })

        }
        else {
            const value = e.target.value;
            // setAllergenList(current =>
            //     current.filter(allergenListMember => {
            //         return allergenListMember !== value;
            //     })
            // );
            setRecipeData(current => ({
                ...current,
                allergenList: current.allergenList.filter((allergenListMember) => allergenListMember !== value)
            })
            );
        }
    }
    const handleAllergenDelete = (value) => {
        // setAllergenList(current =>
        //     current.filter(allergenListMember => {
        //         return allergenListMember !== value;
        //     })
        // );

        setRecipeData(current => ({
            ...current,
            allergenList: current.allergenList.filter((allergenListMember) => allergenListMember !== value)
        })
        );

        var element = document.getElementById(`${value}`);
        if (element) element.checked = false;
    }

    const navigate = useNavigate();
    const submitIngredients = (e) => {
        e.preventDefault();
        // alert("ingredients submit");

        navigate("/home/cookingdetails");
    }

    const goBack = (e) => {
        e.preventDefault();

        navigate("/home/basicdetails");
    }

    const cancelNewRecipe = (e) => {
        e.preventDefault();

        navigate("/home");
    }

    return (
        /* Primary Ingredients
        Additional Ingredients
        Ingredient Amounts (with measurement methods)
        Allergen Information */
        <form onSubmit={submitIngredients} className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] m-auto'>
            <h2 className='text-2xl'>{recipeData?.name}</h2>

            <div>
                <div className='flex flex-wrap gap-2'>
                    <input id="primaryIngredient" className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                        onChange={(e) => setCurrValue1(e.target.value)} value={currValue1}
                        type="text" placeholder='add primary ingredient' />
                    <input className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                        onChange={(e) => setCurrValue11(e.target.value)} value={currValue11}
                        type="text" placeholder='amount with unit' />
                    <input type='button' value="Add" onClick={handlePrimaryIngredientAdd} className='bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer' />
                </div>
                <div className='flex gap-2 mt-1 flex-wrap'>
                    {
                        recipeData.primaryIngredients.map((data, index) => (
                            <div key={index} onClick={() => handlePrimaryIngredientDelete(data)} className='cursor-pointer flex gap-2 items-baseline bg-[rgb(39,52,68)] bg-opacity-80 p-2 rounded'>
                                {data}<div onClick={() => handlePrimaryIngredientDelete(data)} className='text-red-500 text-[0.8rem]'>x</div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <div className='flex flex-wrap gap-2'>
                    <input id="secondaryIngredient" className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                        onChange={(e) => setCurrValue2(e.target.value)} value={currValue2}
                        type="text" placeholder='add secondary ingredient' />
                    <input className='flex-1 bg-[rgba(0,0,0,0)] text-white border rounded p-2'
                        onChange={(e) => setCurrValue21(e.target.value)} value={currValue21}
                        type="text" placeholder='amount with unit' />
                    <input type='button' value="Add" onClick={handleSecondaryIngredientAdd} className='bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer' />
                </div>
                <div className='flex gap-2 mt-1 flex-wrap'>
                    {
                        recipeData.secondaryIngredients.map((data, index) => (
                            <div key={index} onClick={() => handleSecondaryIngredientDelete(data)} className='cursor-pointer flex gap-2 items-baseline bg-[rgb(39,52,68)] bg-opacity-80 p-2 rounded'>
                                {data}<div onClick={() => handleSecondaryIngredientDelete(data)} className='text-red-500 text-[0.8rem]'>x</div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <p className='text-left p-0 m-0'>Allergen information</p>
                <hr />
                <div className='text-left flex flex-row flex-wrap gap-2'>
                    {
                        allergens.map((data, index) => (
                            <div key={index} className='flex flex-row items-center gap-1'>
                                <input id={`${data}`} type="checkbox" value={data} name={data}
                                    checked={recipeData.allergenList.includes(data)}
                                    onChange={handleAllergenAdd} />
                                <label htmlFor={data}>{data}</label>
                            </div>
                        ))
                    }
                </div>
                <div className={`${showOthers ? 'block' : 'hidden'} flex gap-2 justify-between`}>
                    <input type="text" value={currAllergen} placeholder='others'
                        onChange={(e) => setcurrAllergen(e.target.value)} className={`bg-[rgba(0,0,0,0)] flex-1 text-white border rounded p-2`} />
                    <input type='button' value="Add" onClick={handleAllergenAdd} className='bg-[rgba(0,0,0,0)] text-white border rounded p-2 cursor-pointer' />
                </div>
                <div className='flex gap-2 mt-1 flex-wrap'>
                    {
                        recipeData.allergenList.map((data, index) => (
                            <div key={index} onClick={() => handleAllergenDelete(data)} className='cursor-pointer flex gap-2 items-baseline bg-[rgb(39,52,68)] bg-opacity-80 p-2 rounded'>
                                {data}<div onClick={() => handleAllergenDelete(data)} className='text-red-500 text-[0.8rem]'>x</div>
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

export default Ingredients