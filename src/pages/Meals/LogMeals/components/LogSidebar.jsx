import { useState } from "react";
import SideBar from "../../../../components/Modal/SideBar/SideBar"
import ToggleOptions from "../../../../components/ToggleOptions/ToggleOptions";
import LoggedMeals from "./LoggedMeals";
import LogSearch from "./LogSearch";
import usePantryAction from "../../../Pantry/components/usePantryActions";
import MacroModal from "../../../../components/Modal/MacroModal/MacroModal";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import Button from "../../../../components/Buttons/Button";
import Recipe from "../../../../components/Recipe/Recipe";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";

const OPTIONS = ["Logged Meals", "Search"];

const LogSidebar = ({setModal, mealType, currentView, setCurrentView}) => {
	const [option, setOption] = useState("Logged Meals");
	// const [currentView, setCurrentView] = useState("unselected");
	const [foodEdit, setFoodEdit] = useState();
	const [finalFood, setFinalFood] = useState();


	const pantry = usePantryAction(setModal);

	const { selectedFood, handleLogFood, handleUpdateLogFood, isSaving, loading, handleDeleteLogFood, isSearching} = pantry;

	const footer = 
	currentView === "nutrients" ? (
		<Button
			type="tertiary"
			text="Log Food"
			handleClick={() => {
				handleLogFood(finalFood, mealType);
				setCurrentView("unselected")
			}}
		/>
	) : currentView === "edit" ? (
		foodEdit.logType === "meal" ? (
			<Button 
				type="tertiary" 
				text="Delete" 
				handleClick={() => {
					handleDeleteLogFood(foodEdit)
					setCurrentView("unselected")
				}}/>
		) : (
			<div className="modal-footer-update">
				<div className="modal-update">
					<Button 
						type="tertiary"
						text="Update"
						handleClick={() => {
							handleUpdateLogFood(foodEdit.id, foodEdit, finalFood)
							setCurrentView("unselected")
						}}
					/>
				</div>

				<div className="trash" 
					onClick={() => {
						handleDeleteLogFood(foodEdit)
						setCurrentView("unselected")
					}}>
					<i className="fa-solid fa-trash"></i>
				</div>
			</div>
		)
	) : (
		null
	)

	if(isSaving) {
		return(
			<SideBar
				setModal={setModal}
				title={mealType ? mealType : "Select Meal Type"}
				isHeader
				isBack={currentView === "nutrients" || currentView === "edit"}
				backPath={() => setCurrentView("main")}
				isFooter={footer}
				footer={footer}
			>
			<div className="load-success-container">
				<LoadSuccess 
					isLoading={loading}
					dark
				/>
			</div>
			</SideBar >
		)
	}

	return(
		<SideBar
			setModal={setModal}
			title={mealType ? mealType : "Select Meal Type"}
			isHeader
			isBack={currentView === "nutrients" || currentView === "edit"}
			backPath={() => setCurrentView("main")}
			isFooter={footer}
			footer={footer}
		>
			{currentView === "unselected" && (
				<div className="empty-body-main-container">
					<EmptyState 
						icon={"/EmptyState/Select.svg"}
						title="log Food"
						subtitle="Choose meal type to log food."
					/>
				</div>
			)}

			{currentView === "main" && (
				<div className="log-sidebar-container">
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
							setModalOpen={setModal}
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
					setModalOpen={setModal}
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
						setModalOpen={setModal}
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

		</SideBar>
	)
}

export default LogSidebar;