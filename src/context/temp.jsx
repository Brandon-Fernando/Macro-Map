import { useState, useEffect } from "react";
import { useContext } from "react";
import { useAuth } from "./AuthContext";
import { usePantryContext } from "./PantryContext";
import { createContext } from "react";
import { db } from "../../utils/firebase";
import { addDoc, collection, getDocs, setDoc, doc, getDoc, increment } from "firebase/firestore";



const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

const getTodayKey = () => new Date().toISOString().split("T")[0];

export const MealProvider = ({children}) => {
	const {currentUser} = useAuth();
	const [mealData, setMealData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [mealPrep, setMealPrep] = useState({});
	const [pantryGenRecipe, setPantryGenRecipe] = useState({});
	const [genRecipe, setGenRecipe] = useState({});
	const {pantryData} = usePantryContext();
	const [savedRecipes, setSavedRecipes] = useState([]);
	


	// SAVE IN LOCAL STORAGE
	useEffect(() => {
    const savedRecipe = localStorage.getItem("pantryGenRecipe");
    if (savedRecipe) {
      setPantryGenRecipe(JSON.parse(savedRecipe));
    }

		const savedMealPrep = localStorage.getItem("mealPrep");
		if(savedMealPrep) {
			setMealPrep(JSON.parse(savedMealPrep));
		}
  }, []);

  useEffect(() => {
    if (Object.keys(pantryGenRecipe).length > 0) {
      localStorage.setItem("pantryGenRecipe", JSON.stringify(pantryGenRecipe));
    }

		if(Object.keys(mealPrep).length > 0) {
			localStorage.setItem("mealPrep", JSON.stringify(mealPrep));
		}
  }, [pantryGenRecipe, mealPrep]);


	// PANTRY RECIPE
	const saveRecipeData = (data) => setPantryGenRecipe(data);

	const saveRecipeToFirestore = async (data) => {
		if (!currentUser) return;
		setLoading(true)
		try{
			const recipeRef = collection(db, "users", currentUser.uid, "recipes");
			await addDoc(recipeRef, {items: data});
			console.log("Recipe saved to Firestore")
		} catch (error) {
			console.error("Error saving recioe", error)
		} finally{
			setLoading(false)
		}
	}

	const saveRecipe = async (data) => {
		saveRecipeData(data);
		await saveRecipeToFirestore(data);
	}

	const generatePantryRecipe = async () => {
		setLoading(true);
		try{
			const jsonIngredients = JSON.stringify(pantryData, null, 2);
			const prompt = `
				Create a recipe based on these ingredients: ${jsonIngredients}
				No Additional Text or Explanations: Do not include any additional explanations, comments, or descritive text. The response should be limited to the JSON object.
				For the macros do not show the calculations just show the final total.
				Return in the following JSON format:
				{
					"recipe":
						{
							"title": "Name of the recipe",
							"prep_time": "Time it takes to prep the recipe",
							"cook_time": "Time it takes to cook the recipe",
							"servings": "Amount of servings the recipe is",
							"ingredients_needed": ["list of ingredients with units"],
							"instructions": ["steps of the recipe"],
							"macros": {
								"calories": 0,
								"protein": 0,
								"carbs": 0,
								"fat": 0,
								"fiber": 0,
								"sugars": 0
							}
						}
				}
			`;

			const res = await fetch("http://localhost:5050/api/recipe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({prompt}),
			});
			const data = await res.json();
			const cleaned = data.recipe.replace(/```/g, ""); 
			const parsed = JSON.parse(cleaned); 
			setPantryGenRecipe(parsed.recipe);
			console.log(parsed.recipe)
		} catch (error) {
			console.error("Error generating pantry recipe:", error)
		} finally { 
			setLoading(false)
		}
		
	}


	// RANDOM RECIPE
	const saveRandomRecipeData = (data) => setGenRecipe(data);

	const saveRandomRecipeToFirestore = async (data) => {
		if (!currentUser) return;
		try{
			const recipeRef = collection(db, "users", currentUser.uid, "recipes");
			await addDoc(recipeRef, {items: data});
			console.log("Recipe saved to Firestore")
		} catch (error) {
			console.error("Error saving recioe", error)
		}
	}

	const saveRandomRecipe = async (data) => {
		saveRandomRecipeData(data);
		await saveRandomRecipeToFirestore(data);
	}

	const generateRandomRecipe = async () => {
		setLoading(true);

		try{
			const prompt = `
				Create a random recipe using any ingredients.
				No Additional Text or Explanations: Do not include any additional explanations, comments, or descritive text. The response should be limited to the JSON object.
				For the macros do not show the calculations just show the final total.
				Return in the following JSON format:
				{
					"recipe":
						{
							"title": "Name of the recipe",
							"prep_time": "Time it takes to prep the recipe",
							"cook_time": "Time it takes to cook the recipe",
							"servings": "Amount of servings the recipe is",
							"ingredients_needed": ["list of ingredients with units"],
							"instructions": ["steps of the recipe"],
							"macros": {
								"calories": 0,
								"protein": 0,
								"carbs": 0,
								"fat": 0,
								"fiber": 0,
								"sugars": 0
							}
						}
				}
			`;

			const res = await fetch("http://localhost:5050/api/recipe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({prompt}),
			});
			const data = await res.json();
			const cleaned = data.recipe.replace(/```/g, ""); 
			const parsed = JSON.parse(cleaned); 
			setGenRecipe(parsed.recipe);
			console.log(parsed.recipe)
		} catch (error) {
			console.error("Error generating recipe:", error)
		} finally {
			setLoading(false)
		}
		
	}




	//MEAL PREP GENERATOR
	const saveMealPrepData = (data) => setMealPrep(data);

	const saveMealPrepToFirestore = async (data) => {
		if (!currentUser) return;
		try{
			const recipeRef = collection(db, "users", currentUser.uid, "mealPrep");
			await addDoc(recipeRef, {items: data});
			console.log("Meal Plan saved to Firestore")
		} catch (error) {
			console.error("Error saving meal plan", error)
		}
	}

	const saveMealPrep = async (data) => {
		saveMealPrepData(data);
		await saveMealPrepToFirestore(data);
	}

	const generateMealPrep = async ({goals}) => {
		console.log("genereat clicked")
		setLoading(true);

		try{
			const jsonIngredients = JSON.stringify(pantryData, null, 2);
			const prompt = `
				You are an assistant that generates meal plans in strict JSON.

				Each meal (breakfast, lunch, dinner, snack) must use this exact schema:
				{
					"title": "Name of recipe",
					"prep_time": "Time it takes to prep the recipe (mins or hrs)",
					"cook_time": "Time it takes to cook the recipe (mins or hrs)",
					"servings": 1,
					"ingredients_needed": ["list of ingredients with units"],
					"instructions": ["steps of the recipe"],
					"macros": {
						"calories": number,
						"protein": number,
						"carbs": number,
						"fat": number,
						"fiber": number,
						"sugars": number
					}
				}

				Now, using these pantry ingredients:
				${jsonIngredients}

				and make sure to hit these goals:
				${goals}
				
				Generate a full-day meal plan following this JSON format (No Additional Text or Explanations: Do not include any additional explanations, comments, or descritive text. The response should be limited to the JSON object.For the macros do not show the calculations just show the final total.):
				{
					"mealPrep": {
						"breakfast": <meal schema>,
						"lunch": <meal schema>,
						"dinner": <meal schema>,
						"snack": <meal schema>,
						"totalMacros": {
							"calories": number,
							"protein": number,
							"carbs": number,
							"fat": number
						}
					}
				}
				Return **only** valid JSON.
				`;
				
				const res = await fetch("http://localhost:5050/api/recipe", {
					method: "POST", 
					headers: { "Content-Type": "application/json"}, 
					body: JSON.stringify({prompt}),
				});
				
				
				const data = await res.json();
				console.log("RAW RESPONSE:", data);

				let cleaned;
				if (data.recipe) {
					cleaned = data.recipe.replace(/```/g, "");
				} else if (data.mealPrep) {
					cleaned = JSON.stringify(data);
				} else {
					console.error("Unexpected response:", data);
					return;
				}

				const parsed = JSON.parse(cleaned);
				const plan = parsed.mealPrep || parsed;
				setMealPrep(plan);
				console.log("FINAL MEAL PLAN:", plan);
		} catch (error) {
			console.error("Error generating meal plan:", error);
		} finally {
			setLoading(false)
		}
	}

	const fetchRecipes = async () => {
		try{
			const recipeRef = collection(db, "users", currentUser.uid, "recipes");
			const snapshot = await getDocs(recipeRef);

			const recipes = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));

			setSavedRecipes(recipes);
			return recipes;
		} catch (error) {
			console.errror("Error fetching recipes", error)
		}
	}

	// useEffect(() => {
  //   const totals = logFoodData.reduce(
  //     (acc, food) => {
  //       acc.calories += Number(food.calories || 0);
  //       acc.protein += Number(food.protein || 0);
  //       acc.carbs += Number(food.carbs || 0);
  //       acc.fat += Number(food.fat || 0);
  //       return acc;
  //     },
  //     { calories: 0, protein: 0, carbs: 0, fat: 0 }
  //   );

  //   setMacroTotals({
  //     calories: Number(totals.calories.toFixed(1)),
  //     protein: Number(totals.protein.toFixed(1)),
  //     carbs: Number(totals.carbs.toFixed(1)),
  //     fat: Number(totals.fat.toFixed(1)),
  //   });
  // }, [logFoodData]);

	// useEffect(() => {
  //   if (!currentUser) return;
  //   fetchDayLog();
	// 	// fetchDayMacros();
  // }, [currentUser, selectedDate]);

	return(
		<MealContext.Provider value={{
			generatePantryRecipe, 
			generateRandomRecipe, 
			pantryGenRecipe, 
			saveRecipeData, 
			saveRecipe, 
			saveRandomRecipe, 
			saveRandomRecipeData, 
			genRecipe, 
			saveMealPrep, 
			saveMealPrepData, 
			mealPrep, 
			generateMealPrep, 
			loading, 
			fetchRecipes, 
			savedRecipes, 
			logFoodData, 
			setSelectedDate, 
			macroTotals
			
		}}>
			{children}
		</MealContext.Provider>
	)

}