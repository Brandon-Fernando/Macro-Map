import axios from "axios"
import { useState } from "react";
import { usePantryContext } from "../../../context/PantryContext";
import { useLogContext } from "../../../context/LogContext";
import { useMealContext } from "../../../context/MealContext";


export default function usePantryAction(setModalOpen){
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [selectedFood, setSelectedFood] = useState();
	const [showNutrients, setShowNutrients] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const [successText, setSuccessText] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const { savePantry, deletePantryItem, updatePantry } = usePantryContext();
	const {logFood, updateLogFood, deleteLogFood} = useLogContext();
	const { saveRecipe, saveMealPrep, deleteMealPrep, deleteRecipe, updateMealPrepTitle } = useMealContext();

	// SEARCH FOOD
	const handleSearch = async () => {
		try{
			const res = await axios.get(
				`http://localhost:5050/api/food/search?query=${query}`
			);

			const foods = res.data.foods?.food;
			setResults(Array.isArray(foods) ? foods : foods ? [foods] : []);
		} catch (error) {
			console.error(error);
		}
	}

	// GET NUTRIENTS OF SELECTED FOOD 
	const getNutrition = async (foodId, setView) => {
		try{
			const res = await axios.get(
				`http://localhost:5050/api/food/${foodId}`
			);

			setSelectedFood(res.data);
			setShowNutrients(true);
			setView("nutrients");
		} catch (error) {
			console.error(error);
		}
	}

	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const handleAddFood = async (food) => {
		setIsSaving(true)
		setShowNutrients(false);
		setLoading(true);

		try{
			await Promise.all([
				savePantry(food), 
				wait(1000)
			]);

			setLoading(false)
			setSuccess(true)

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleDeleteFood = async (food) => {
		setLoadingText("Deleting item from pantry...");
		setSuccessText("Item deleted from pantry!");
		setIsSaving(true);
		setLoading(true)

		try{
			await Promise.all([
				deletePantryItem(food.id), 
				wait(1000)
			]);

			setLoading(false)
			setSuccess(true)

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error)
		}
	}

	const handleUpdateFood = async (food) => {
		setLoadingText("Updating item ...");
		setSuccessText("Item updated!");
		setIsSaving(true);
		setLoading(true);

		try{
			await Promise.all([
				updatePantry(food), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true);

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleLogFood = async (food, mealType) => {
		setLoadingText("Logging food ...");
		setSuccess("Food logged!");
		setIsSaving(true);
		setLoading(true);

		const foodItem = {
			...food, 
			mealType: mealType, 
			logType: "food"
		};

		try{
			await Promise.all([
				logFood(foodItem), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true);

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleUpdateLogFood = async (foodItemID, originalFood, newFood) => {
		setLoadingText("Updating ...");
		setSuccess("Food updated!");
		setIsSaving(true);
		setLoading(true);

		try{
			await Promise.all([
				updateLogFood(foodItemID, originalFood, newFood), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true);

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleDeleteLogFood = async (foodItem) => {
		setLoadingText("Deleting...");
		setSuccessText("Food deleted!");
		setIsSaving(true);
		setLoading(true);

		try{
			await Promise.all([
				deleteLogFood(foodItem), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true);

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleSaveRecipe = async (meal) => {
		setLoadingText("Saving Recipe...");
		setSuccessText("Recipe saved!");
		setIsSaving(true);
		setLoading(true);

		try{
			await Promise.all([
				saveRecipe(meal), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true);

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleSaveMealPreps = async (mealPrep, title) => {
		setIsSaving(true);
		setLoading(true);

		try{
			await Promise.all([
				saveMealPrep(mealPrep, title), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true);

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleDeleteSaveMealPreps = async (mealPrepId) => {
		setIsSaving(true);
		setLoading(true);

		try{
			await Promise.all([
				deleteMealPrep(mealPrepId), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true)

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleDeleteRecipe = async (recipeID) => {
		setIsSaving(true);
		setLoading(true);

		try{
			await Promise.all([
				deleteRecipe(recipeID), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true);

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	const handleUpdateMealPrepTitle = async (mealPrepId, title) => {
		setIsSaving(true);
		setLoading(true);

		try{
			await Promise.all([
				updateMealPrepTitle(mealPrepId, title), 
				wait(1000)
			]);

			setLoading(false);
			setSuccess(true);

			setTimeout(() => {
				setModalOpen(false)
			}, 800);
		} catch (error) {
			console.error(error);
		}
	}

	return{
		handleSearch, 
		getNutrition, 
		handleAddFood, 
		handleDeleteFood, 
		handleUpdateFood,
		handleLogFood,
		handleUpdateLogFood,
		handleDeleteLogFood,
		handleSaveRecipe,
		handleSaveMealPreps,
		selectedFood, 
		showNutrients, 
		query, 
		setQuery, 
		results, 
		setResults, 
		setShowNutrients, 
		loading, 
		isSaving, 
		loadingText,
		successText, 
		handleDeleteSaveMealPreps, 
		handleDeleteRecipe, 
		handleUpdateMealPrepTitle
	}

}