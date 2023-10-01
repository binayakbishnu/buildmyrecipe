import React, { useEffect, useState } from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Backend/firebase"
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user] = useAuthState(auth);

    const [name, setName] = useState("");
    const fetchUserName = async () => {
        console.log("user data");
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const userData = doc?.docs[0]?.data();
            setName(userData?.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const [recipes, setRecipes] = useState([]);
    const fetchRecipes = async () => {
        try {
            const q = query(collection(db, "recipes"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            if (doc.docs.length === 0) {
                return;
            }

            const recipesReceived = doc?.docs[0]?.data();

            console.log(recipesReceived.recipes);
            setRecipes(recipesReceived.recipes);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching recipe data");
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserName();
    });
    return (
        <div className='flex-1 flex flex-col gap-5'>
            <div className='welcomeMsg'>
                <h2 className='text-4xl'>Welcome {name}!</h2>
                {user?.email}
            </div>

            <button onClick={fetchRecipes}>Recipes</button>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    recipes.map((data, index) => (
                        <div key={index} className='bg-[rgb(39,52,68)] bg-opacity-60 p-4 rounded text-left'>
                            <div>
                                <p>
                                    {data.name}
                                </p>
                                <hr />
                            </div>

                            <p>
                                {data.description}
                            </p>


                        </div>
                    ))
                }
            </div>

            <div>
                <button className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded w-fit m-auto'
                onClick={() => navigate("/home/newrecipe")}>New recipe</button>
            </div>
        </div>
    )
}

export default Dashboard