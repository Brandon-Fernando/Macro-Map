import { useState } from "react";
import BaseModal from "../../../../components/Modal/BaseModal/BaseModal";
import "../LogMeals.css";
import ToggleOptions from "../../../../components/ToggleOptions/ToggleOptions";
import LoggedMeals from "./LoggedMeals";
import LogSearch from "./LogSearch";
import usePantryAction from "../../../Pantry/components/usePantryActions";
import MacroModal from "../../../../components/Modal/MacroModal/MacroModal";
import Button from "../../../../components/Buttons/Button";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";
import Recipe from "../../../../components/Recipe/Recipe";

const OPTIONS = ["Logged Meals", "Search"];

const LogModal = ({setModalOpen, mealType}) => {
	const [option, setOption] = useState("Logged Meals");
	const [currentView, setCurrentView] = useState("main");
	const [foodEdit, setFoodEdit] = useState()
	const [finalFood, setFinalFood] = useState();

	const pantry = usePantryAction(setModalOpen);

	const {selectedFood, handleLogFood, handleUpdateLogFood, isSaving, loading, handleDeleteLogFood, isSearching} = pantry;

	const footer = 
	currentView === "nutrients" ? (
		<Button 
			type="tertiary"
			text={"Log Food"}
			handleClick={() => handleLogFood(finalFood, mealType)}
		/>
	) : currentView === "edit" ? (
		foodEdit.logType === "meal" ? (
			<Button type="tertiary" text="Delete" handleClick={() => handleDeleteLogFood(foodEdit)}/>
		) : (
			<div className="modal-footer-update">
				<div className="modal-update">
					<Button 
						type="tertiary"
						text="Update"
						handleClick={() => handleUpdateLogFood(foodEdit.id, foodEdit, finalFood)}
					/>
				</div>

				<div
					className="trash"
					onClick={() => handleDeleteLogFood(foodEdit)}
				>
					<i className="fa-solid fa-trash"></i>
				</div>
			</div>
		)
		
	) : (
		null
	)
	

	if(isSaving) {
		return(
			<BaseModal
				handleClick={() => setModalOpen(false)}
				title={mealType}
				footer={footer}
			>
			<div className="load-success-container">
				<LoadSuccess 
					isLoading={loading}
					dark
				/>
			</div>
			</BaseModal >
		)
	}
	

	return(
		<BaseModal 
			handleClick={() => setModalOpen(false)}
			title={mealType}
			isBack={currentView === "nutrients" || currentView === "edit"}
			backPath={() => setCurrentView("main")}
			footer={footer}
			
		>
			{currentView === "main" && (
				<div className="log-modal-container">
					{/* ===== HEADER =====  */}
					<div className="log-meal-header">
						<ToggleOptions 
							option={option}
							options={OPTIONS}
							setOption={setOption}
						/>
					</div>

					{option === "Logged Meals" && (
						<LoggedMeals 
							setView={setCurrentView}
							setFoodEdit={setFoodEdit}
							mealType={mealType}
						/>
					)}

					{option === "Search" && (
						<LogSearch 
							setModalOpen={setModalOpen}
							setView={setCurrentView}
							pantry={pantry}
							mealType={mealType}
							// setShowNutrients={setShowNutrients}
						/>
					)}
				</div>
			)}
			
			{currentView === "nutrients" && (
				<MacroModal 
					setModalOpen={setModalOpen}
					food={selectedFood}
					isLog
					handleButton={handleLogFood}
					mealType={mealType}
					finalFood={finalFood}
					setFinalFood={setFinalFood}
				/>
			)}

			{currentView === "edit" && (
				foodEdit.logType === "meal" ? (
					<Recipe meal={foodEdit.items} />
				) : (
					<MacroModal 
						setModalOpen={setModalOpen}
						food={foodEdit}
						mealType={mealType}
						handleButton={handleUpdateLogFood}
						isLogUpdate
						isUpdate
						finalFood={finalFood}
						setFinalFood={setFinalFood}
					/>
				)
				
			)}
		</BaseModal>
	)
}

export default LogModal;