import React, { useEffect, useRef, useState } from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Backend/firebase"
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { PiBowlFoodLight } from 'react-icons/pi';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import RecipePage from './RecipePage';

function Dashboard() {
    const [user] = useAuthState(auth);

    const [recipesFetched, setRecipesFetched] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const fetchRecipes = async () => {
        if ((recipes.length === 0) && !recipesFetched && user) {
            try {
                const q = query(collection(db, "recipes"), where("uid", "==", user?.uid));
                const doc = await getDocs(q);
                if (doc.docs.length === 0) {
                    return;
                }

                const recipesReceived = doc?.docs[0]?.data();

                console.log(recipesReceived.recipes);
                setRecipes(recipesReceived.recipes);
                setRecipesFetched(true);
            } catch (err) {
                console.error(err);
                alert("An error occured while fetching recipe data");
            }
        }
    }

    const joinDietaryInfo = (dietaryInfo) => {
        return dietaryInfo.join(", ");
    }

    const [showRecipePage, setShowRecipePage] = useState(true);
    const toggleShowRecipePage = () => {
        if (!showRecipePage) setShowRecipePage(!showRecipePage);
    }

    const [recipeIndexToShow, setRecipeIndexToShow] = useState(0);
    const resultRef = useRef(null);
    const selectRecipe = (index) => {
        setRecipeIndexToShow(index);
        toggleShowRecipePage();
        resultRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const topRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // if (!recipes && !recipesFetched) fetchRecipes();
        // if (!recipes && !recipesFetched) fetchRecipes();
        fetchRecipes();
    });
    return (
        <div id="top" ref={topRef} className='flex-1 flex flex-col gap-5 relative'>
            <div className='welcomeMsg mx-5'>
                <h2 className={`text-4xl`}>My recipes</h2>
            </div>
            <div className='mx-5'>
                <button className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded w-fit m-auto mb-4'
                    onClick={() => navigate("/home/newrecipe")}>New recipe</button>
            </div>

            <div className='mx-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    recipes.map((data, index) => (
                        <div key={index} className=' bg-[rgb(39,52,68)] bg-opacity-80 p-4 rounded text-left flex flex-col justify-between cursor-pointer'
                            onClick={() => selectRecipe(index)}>
                            <div>
                                <div>
                                    <p>
                                        {data.name}
                                    </p>
                                    <hr />
                                </div>

                                <div className='mt-2 border border-white rounded-xl p-2'>
                                    {data.description}
                                    <div className='flex gap-2 flex-wrap'>
                                        Suitable for:
                                        {
                                            data.mealTypes.map((meal, mealIndex) => (
                                                <div key={mealIndex}>
                                                    <p>
                                                        {meal}
                                                    </p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div>
                                    <p>
                                        Cooking time: {data.cookingTime.hours !== 0 ? data.cookingTime.hours + (data.cookingTime.hours === 1 ? " hour " : " hours ") : ""}
                                        {data.cookingTime.minutes !== 0 ? data.cookingTime.minutes + " minutes" : ""}
                                    </p>
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <PiBowlFoodLight />
                                    {joinDietaryInfo(data.dietaryInfo)}
                                </div>

                            </div>
                            <div className='flex gap-2 flex-wrap mt-2'>
                                {
                                    data.tagList.map((tag, tagIndex) => (
                                        <p key={tagIndex}>#{tag}</p>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className={`mx-5 pt-4 pb-10 sm:pb-4 ${recipes.length === 0 ? "hidden" : "block"}`} ref={resultRef} >
                <RecipePage selectedRecipe={recipes[recipeIndexToShow]} />
            </div>

            <button onClick={() => topRef.current.scrollIntoView({ behavior: "smooth" })}
                className='fixed right-5 bottom-5 rounded-full bg-[rgb(39,52,68)] bg-opacity-80'>
                <IoArrowUpCircleOutline className='text-4xl' />
            </button>
        </div >
    )
}

export default Dashboard