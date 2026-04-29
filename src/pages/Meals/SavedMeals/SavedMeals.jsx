import PageHeader from "../../../components/PageHeader/PageHeader";
import ToggleOptions from "../../../components/ToggleOptions/ToggleOptions";
import { useState } from "react";
import { useMealContext } from "../../../context/MealContext";
import SavedMealsList from "./components/SavedMealsList";
import SavedMealPrepList from "./components/SavedMealPrepList";
import { AnimatePresence } from "framer-motion";
import MealPrepModal from "../MealPrep/components/MealPrepModal";
import { Outlet, useLocation } from "react-router-dom";
import EditMealPrepModal from "./components/EditMealPrepModal";
import SaveModal from "../../../components/Modal/SaveModal/SaveModal";
import EditMealModal from "./components/EditMealModal";
import EditModal from "../../../components/Modal/EditModal/EditModal";

const OPTIONS = ["Meals", "Meal Prep"];

const SavedMeals = () => {
	const [option, setOption] = useState("Meals");
	const [modalOpen, setModalOpen] = useState(false);
	const [prepEdit, setPrepEdit] = useState(false);
	const [meal, setMeal] = useState({});
	const [mealPrep, setMealPrep] = useState({});
	const [mealEdit, setMealEdit] = useState(false);
	const location = useLocation();

	const isSubRoute = location.pathname !== "/meals/saved/mealPrep";
	
	const {savedRecipes, savedMealPreps} = useMealContext();

	return(
		<>
		{isSubRoute && (
			<div className="page-container">
				<PageHeader
					title="Saved Meals"
					isBack
					backPath={"/meals"}
				/>

				<ToggleOptions 
					option={option}
					options={OPTIONS}
					setOption={setOption}
				/>

				{option === "Meals" && (
					<SavedMealsList 
						meals={savedRecipes}
						setMeal={setMeal}
						setModal={setModalOpen}
						setMealEdit={setMealEdit}

					/>
				)}

				{option === "Meal Prep" && (
					<SavedMealPrepList 
						mealPreps={savedMealPreps}
						setPrepEdit={setPrepEdit}
						setMealPrep={setMealPrep}
					/>
				)}

				<AnimatePresence>
					{modalOpen && (
						<MealPrepModal 
							setModal={setModalOpen}
							meal={meal}
							isSaved

						/>
					)}

					{prepEdit && (
						<EditMealPrepModal 
							setModal={setPrepEdit}
							mealPrep={mealPrep}
							
						/>
						// <EditModal handleClick={() => setPrepEdit(false)}/>
					)}

					{mealEdit && (
						<EditMealModal
							setModal={setMealEdit}
							setRecipeModal={setModalOpen}
							meal={meal}
						/>
					)}
				</AnimatePresence>

				{/* <div className="progress-circle" style={{ "--progress": 65 }}>
						<span className="progress-text">65%</span>
				</div> */}


			</div>
		)}

		<Outlet />
		</>
	)
}

export default SavedMeals;