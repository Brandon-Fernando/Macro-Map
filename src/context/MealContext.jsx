import { addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { db } from "../../utils/firebase";
import { useAuth } from "./AuthContext";
import { usePantryContext } from "./PantryContext";
import { useQuiz } from "./QuizContext";


const MealContext = createContext();
export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({children}) => {
	const {currentUser} = useAuth();
	const {quizData} = useQuiz();
	const {pantryData} = usePantryContext();
	const [mealPrep, setMealPrep] = useState({});
	const [pantryRecipe, setPantryRecipe] = useState({});
	const [randomRecipe, setRandomRecipe] = useState({});
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [savedMealPreps, setSavedMealPreps] = useState([])

	// ===== GET SAVED RECIPES ===== 
	// useEffect(() => {
	// 	if(!currentUser) return;

	// 	const itemsRef = collection(
	// 		db, 
	// 		"users", 
	// 		currentUser.uid, 
	// 		"recipes"
	// 	);

	// 	const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
	// 		setSavedRecipes(
	// 			snapshot.docs.map(doc => ({
	// 				id: doc.id, 
	// 				...doc.data()
	// 			}))
	// 		);
	// 	});

	// 	return () => unsubscribe();
	// }, [currentUser])

	useEffect(() => {
		if (!currentUser) return;
	
		const itemsRef = collection(
			db,
			"users",
			currentUser.uid,
			"mealPrep"
		);
	
		const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
			const mealPreps = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
	
			setSavedMealPreps(mealPreps);
		});
	
		return () => unsubscribe();
	}, [currentUser]);

	useEffect(() => {
		if(!currentUser) return;

		const recipeRef = collection(
			db, 
			"users", 
			currentUser.uid, 
			"recipes"
,		);

		const unsubscribe = onSnapshot(recipeRef, (snapshot) => {
			const recipes = snapshot.docs.map(doc => ({
				id: doc.id, 
				...doc.data()
			}));

			setSavedRecipes(recipes);
		});

		return () => unsubscribe();
	}, [currentUser])

	// SAVE IN LOCAL STORAGE 
	useEffect(() => {
		const savedMealPrep = localStorage.getItem("mealPrep");
		if(savedMealPrep) {
			setMealPrep(JSON.parse(savedMealPrep))
		}
	}, []);

	useEffect(() => {
		if(Object.keys(mealPrep).length > 0) {
			localStorage.setItem("mealPrep", JSON.stringify(mealPrep));
		}
	}, [mealPrep])

	// ===== DELETE RECIPE ===== 
	const deleteRecipe = async (recipeID) => {
		if(!currentUser) return;

		try{
			const recipeRef = doc(
				db, 
				"users", 
				currentUser.uid, 
				"recipes", 
				recipeID
			);

			await deleteDoc(recipeRef);

			setSavedRecipes(prev => 
				prev.filter(recipe => recipe.id !== recipeID))
			
			console.log("recipe deleted")
		} catch (error) {
			console.error(error);
		}
	}

	// ===== SAVE RECIPES ===== 
	const saveRecipeData = (data) => setPantryRecipe(data);

	const saveRecipeToFirestore = async (recipe) => {
		if(!currentUser) return;

		try{
			const recipeRef = collection(
				db, 
				"users", 
				currentUser.uid, 
				"recipes"
			);

			await addDoc(recipeRef, {items: recipe});
			console.log("Recipe saved to firestore");
		} catch (error) {
			console.error("Error saving recipe", error);
		}
	};

	const saveRecipe = async (recipe) => {
		saveRecipeData(recipe);
		await saveRecipeToFirestore(recipe);
	};

	// ===== RANDOM RECIPE ===== 
	const generateRandomRecipe = async () => {
		setIsLoading(true)

		try{
			const prompt = 
			`
				Create a recipe using any ingredients.
				No Additional Text or Explanation: Do not include any additional explanations, comments, or descriptive text. The response should be limited to the JSON object.
				For the macros do not show the calculations just show the final total.
				Return in the following JSON format: 
				{
					"recipe":
						{
							"title": "Name of the recipe", 
							"prep_time": "Time it takes to prep the recipe (mins or hrs)", 
							"cook_time": "Time it takes to cook the recipe (mins or hrs)", 
							"servings": 1, 
							"ingredients_needed": [
								{
									"name": "ingredient name (string only, no units)",
									"quantity": number (must be numeric, no fractions),
									"unit": "measurement unit (g, oz, cup, tbsp, tsp, ml, piece, etc.)"
								}
							],
							"instructions": ["steps of the recipe"], 
							"macros": {
								"calories": number, 
								"protein": number, 
								"carbs": number, 
								"fat": number
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
			setRandomRecipe(parsed.recipe);
		} catch (error) {
			console.error("Error generating", error);
		} finally {
			setIsLoading(false);
		}
	}

	//===== PANTRY RECIPE =====
	const generatePantryRecipe = async () => {
		setIsLoading(true)

		try{
			const jsonIngredients = JSON.stringify(pantryData, null, 2);

			const prompt = 
			`
				Create a recipe based on these ingredients: ${jsonIngredients}
				No Additional Text or Explanation: Do not include any additional explanations, comments, or descriptive text. The response should be limited to the JSON object.
				For the macros do not show the calculations just show the final total.
				Return in the following JSON format: 
				{
					"recipe":
						{
							"title": "Name of the recipe", 
							"prep_time": "Time it takes to prep the recipe (mins or hrs)", 
							"cook_time": "Time it takes to cook the recipe (mins or hrs)", 
							"servings": 1, 
							"ingredients_needed": [
								{
									"name": "ingredient name (string only, no units)",
									"quantity": number (must be numeric, no fractions),
									"unit": "measurement unit (g, oz, cup, tbsp, tsp, ml, piece, etc.)"
								}
							],
							"instructions": ["steps of the recipe"], 
							"macros": {
								"calories": number, 
								"protein": number, 
								"carbs": number, 
								"fat": number
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
			setPantryRecipe(parsed.recipe);

		} catch (error) {
			console.error("Error generating", error);
		} finally {
			setIsLoading(false);
		}
	}

	// ===== SAVE MEAL PREP ===== 
	const saveMealPrepData = (data) => setMealPrep(data);

	const saveMealPrepToFirestore = async (mealPrep, title) => {
		if(!currentUser) return;

		try{
			const mealPrepRef = collection(
				db, 
				"users", 
				currentUser.uid, 
				"mealPrep"
			);
			
			await addDoc(mealPrepRef, {
				title: title, 
				items: mealPrep
			});
			console.log("Meal Plan saved to Firestore");
		} catch (error) {
			console.error("Error saving meal plan", error)
		}
	}

	const saveMealPrep = async (mealPrep, title) => {
		saveMealPrepData(mealPrep);
		await saveMealPrepToFirestore(mealPrep, title)
	}

	// ====== UPDATE MEAL PREP TITLE ====== 
	const updateMealPrepTitle = async (mealPrepId, newTitle) => {
		if(!currentUser) return;

		try{
			const mealPrepRef = doc(
				db, 
				"users", 
				currentUser.uid, 
				"mealPrep", 
				mealPrepId
			);

			await updateDoc( mealPrepRef, {
				title: newTitle
			})

		} catch (error) {
			console.error(error);
		}
	}

	// ===== DELETE SAVED MEAL PREP ===== 
	const deleteMealPrep = async (mealId) => {
		if(!currentUser) return;

		try{
			const itemsRef = doc(
				db, 
				"users", 
				currentUser.uid, 
				"mealPrep", 
				mealId
			)

			await deleteDoc(itemsRef);

			setSavedMealPreps(prev => 
				prev.filter(meal => meal.id !== mealId));

			console.log("meal prep deleted");
		} catch (error) {
			console.error(error);
		}
	}

	// ===== GENERATE MEAL PREP ===== 
	const generateMealPrep = async () => {
		setIsLoading(true);

		try{
			const jsonIngredients = JSON.stringify(pantryData, null, 2);
			const prompt = 
			`
				You are an assistant that generates meal plans in strict JSON.

				Each meal (breakfast, lunch, dinner, snack) must use this exact schema:
				{
					"title": "Name of recipe", 
					"prep_time": "Time it takes to prep the recipe (mins or hrs)", 
					"cook_time": "Time it takes to cook the recipe (mins or hrs)", 
					"servings": 1, 
					"ingredients_needed": [
						{
							"name": "ingredient name (string only, no units)",
							"quantity": number (must be numeric, no fractions),
							"unit": "measurement unit (g, oz, cup, tbsp, tsp, ml, piece, etc.)"
						}
					],
					"instructions": ["steps of the recipe"], 
					"macros": {
						"calories": number, 
						"protein": number, 
						"carbs": number, 
						"fat": number
					}
				}

				Now, using these pantry ingredients: 
				${jsonIngredients}

				The totalMacros must EXACTLY match the following targets:
					Calories: ${quizData.results.calories}
					Protein: ${quizData.results.protein}
					Carbs: ${quizData.results.carbs}
					Fat: ${quizData.results.fat}

					Allowed deviation: ±5 calories and ±2g per macro.

				Generate a full-day meal plan following this JSON format (No Additional Text or Explanations: Do not include any additional explanations, comments, or descriptive text. The response should be limited to the JSON object. For the macros do not show the calculations just show the final total. Round all numbers to one decimal point if there are decimals):
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

			let cleaned;
			if (data.recipe) {
				cleaned = data.recipe.replace(/```/g, "");
			} else if (data.mealPrep) {
				cleaned = JSON.stringify(data);
			} else {
				console.error("Unexpected response: ", data);
				return
			}

			const parsed = JSON.parse(cleaned);
			const plan = parsed.mealPrep || parsed;
			setMealPrep(plan);
		} catch (error) {
			console.error("Error generating: ", error);
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<MealContext.Provider
			value={{
				generateMealPrep, 
				generatePantryRecipe, 
				generateRandomRecipe,
				pantryRecipe, 
				randomRecipe,
				mealPrep, 
				saveMealPrep, 
				saveRecipe, 
				isLoading, 
				savedRecipes, 
				savedMealPreps, 
				deleteMealPrep, 
				deleteRecipe, 
				updateMealPrepTitle
			}}
		>
			{children}
		</MealContext.Provider>
	)

	
}