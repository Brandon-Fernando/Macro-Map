import { useState } from "react";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import MacroModal from "../../../../components/Modal/MacroModal/MacroModal";
import Searchbar from "../../../../components/Searchbar/Searchbar";
import FoodSearchResults from "../../../Pantry/components/FoodSearchResults";
import usePantryAction from "../../../Pantry/components/usePantryActions";
import SavedMealsList from "../../SavedMeals/components/SavedMealsList";
import "../LogMeals.css";
import { useMealContext } from "../../../../context/MealContext";
import SavedMealsLog from "./SavedMealsLog";

const LogSearch = ({ setModalOpen, setView, pantry, mealType}) => {

	const {
		handleSearch, 
		getNutrition, 
		selectedFood, 
		query, 
		setQuery, 
		results
	} = pantry;

	const { savedRecipes } = useMealContext();



	return(
		<div className="log-search-container">
			<div className="log-searchbar">
				<Searchbar 
					query={query}
					setQuery={setQuery}
					handleSearch={handleSearch}
				/>
			</div>
			

			<div className="search-body">
				{results.length === 0 && (
					<div className="empty-body-container">
						<EmptyState 
							icon={"/EmptyState/Search.svg"}
							title="No Results"
							subtitle="Try searching something else"
						/>
					</div>
				)}

				{results.length > 0 && (
					<FoodSearchResults
						results={results}
						handleGetNutrition={getNutrition}
						setView={setView}
					/>
				)}

				<span className="main-reg-title">Saved Recipes</span>

				<div>
					<SavedMealsLog mealType={mealType} meals={savedRecipes}/>
				</div>
	
			</div>
		</div>
	)
}

export default LogSearch;