import React, { createContext, useContext, useState } from 'react';

// Create the RecipeContext
const RecipeContext = createContext();

// Create a RecipeProvider component to wrap your app
export const RecipeProvider = ({ children }) => {
    // State to hold the recipe data
    const [recipeData, setRecipeData] = useState({
        name: "Dosai",
        description: "Dosa is a beloved South Indian culinary delight, renowned for its exquisite blend of flavors and textures. This thin, crispy crepe is crafted from a fermented batter of rice and urad dal, yielding a delicate tanginess. Typically accompanied by an array of flavorful chutneys and aromatic sambar, dosa offers a harmonious symphony of taste. Its versatility shines, from traditional masala dosa to contemporary fusion variations, making it a cherished culinary treasure loved by people worldwide.",
        dietaryInfo: ["Vegetarian", "Dairy-Free"],
        nutrientList: [
            "Fat (5-10%)",
            "Carbohydrates (80-85%)",
            "Protein (5-7%)",
            "Fiber (2-3%)",
            "Sugars (<1%)",
        ],
        mealTypes: ["breakfast", "snack"],
        servings: "1",
        primaryIngredients: [
            "Rice (2 cups)",
            "Urad dal (1/2 cup)",
            "Fenugreek seeds (1 teaspoon)",
            "Water (as needed)",
            "Salt (1-2 teaspoons)",
            "Oil or ghee (variable)",
            "Chana dal (1 tablespoon)",
        ],
        secondaryIngredients: [
            "Curry leaves (a handful)",
            "Cumin seeds (1 teaspoon)",
            "Green chilies (2-3)",
            "Ginger (1-inch piece, grated)",
            "Fresh coriander leaves (a handful)",
            "Onions (1-2)",
        ],
        allergenList: ["Wheat"],
        prepTime: { hours: 0, minutes: 45 },
        cookingTime: { hours: 1, minutes: 30 },
        difficultyLevel: "moderate",
        cookingSteps: [
            "Batter Preparation",
            "Heating the Griddle",
            "Pouring and Spreading Batter",
            "Cooking the Dosa",
        ],
        videoLink: "http://youtube.com",
        tagList: ["southindian", "snack"],
    });

    return (
        <RecipeContext.Provider value={{ recipeData, setRecipeData }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(RecipeContext);
}
