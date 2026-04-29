import { useState } from "react";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import "../LogMeals.css"
import { useLogContext } from "../../../../context/LogContext";
import FoodList from "../../../../components/Buttons/FoodList";
import MacroModal from "../../components/MacroModal";
import LoggedTotals from "./LoggedTotals";
import Macros from "../../../../components/Macros/Macros";

const LoggedMeals = ({setView, setFoodEdit, mealType}) => {
	const {logFoodData, getMealTypeTotals} = useLogContext();

	const loggedFoods = logFoodData.filter(food => food.mealType === mealType);

	const handleEditFood = (food) => {
		setFoodEdit(food);
		setView("edit");
	}

	return(
		<div className="logged-meals-container">
			{/* <div className="log-fade"/> */}

			{loggedFoods.length === 0 && (
				<div className="empty-body-container">
					<EmptyState 
						icon={"/EmptyState/Log.svg"}
						title="No Logged Meals"
						subtitle={"Search for a meal to add"}
					/>
				</div>
			)}

			{loggedFoods.length > 0 && (
				<div className="log-food-container">
					<LoggedTotals 
						nutritionalFacts={getMealTypeTotals(mealType)}
					/>
					{/* <Macros nutritionalFacts={getMealTypeTotals(mealType)}/> */}
					
					<span className="main-reg-subtitle">Logged Food</span>
				
					<FoodList 
						foodList={loggedFoods}
						handleClick={handleEditFood}
					/>

				</div>
			)}

		</div>
	)
}

export default LoggedMeals;