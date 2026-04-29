import { useMemo } from "react";
import { useState } from "react";


export default function useEditServings(food) {

	const [servings, setServings] = useState(food.serving);
	const [updatedMacros, setUpdatedMacros] = useState(food);
	const originalMacros = food;

	const handleServingChange = (newServing) => {
		const ratio = newServing / food.serving;

		const newMacros = {
			...food, 
			serving: newServing, 
			calories: +(food.calories * ratio).toFixed(1), 
			protein: +(food.protein * ratio).toFixed(1), 
			carbs: +(food.carbs * ratio).toFixed(1), 
			fat: +(food.fat * ratio).toFixed(1)
		}

		setServings(newServing)
		setUpdatedMacros(newMacros);
	}

	const incrementServings = () => {
		handleServingChange(Number(servings + 1));
	}

	const decrementServings = () => {
		handleServingChange(Number(servings) <= 1 ? Number(servings) : Number(servings) - 1)
	}

	const nutritionalFacts = useMemo(() => [
		{label: "Calories", value: updatedMacros.calories}, 
		{label: "Protein", value: updatedMacros.protein}, 
		{label: "Carbs", value: updatedMacros.carbs}, 
		{label: "Fat", value: updatedMacros.fat}
	], [updatedMacros])
	

	return{
		servings, 
		setServings, 
		updatedMacros, 
		originalMacros,
		handleServingChange, 
		incrementServings, 
		decrementServings, 
		nutritionalFacts
	}
}