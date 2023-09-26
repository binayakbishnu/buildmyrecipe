import React, { createContext, useContext, useState } from 'react';

// Create the RecipeContext
const RecipeContext = createContext();

// Create a RecipeProvider component to wrap your app
export const RecipeProvider = ({ children }) => {
    // State to hold the recipe data
    const [recipeData, setRecipeData] = useState({
        name: "",
        // description: "Dosa is a beloved South Indian culinary delight, renowned for its exquisite blend of flavors and textures. This thin, crispy crepe is crafted from a fermented batter of rice and urad dal, yielding a delicate tanginess. Typically accompanied by an array of flavorful chutneys and aromatic sambar, dosa offers a harmonious symphony of taste. Its versatility shines, from traditional masala dosa to contemporary fusion variations, making it a cherished culinary treasure loved by people worldwide.",
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

    return (
        <RecipeContext.Provider value={{ recipeData, setRecipeData }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(RecipeContext);
}
