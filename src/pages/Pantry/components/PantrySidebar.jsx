import SideBar from "../../../components/Modal/SideBar/SideBar";
import Searchbar from "../../../components/Searchbar/Searchbar";
import FoodSearch from "./FoodSearch";
import MacroModal from "../../../components/Modal/MacroModal/MacroModal";
import { useState } from "react";
import Button from "../../../components/Buttons/Button";
import usePantryAction from "./usePantryActions";
import LoadSuccess from "../../../components/LoadSuccess/LoadSuccess";
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../../animations/motionVariants";

const PantrySidebar = ({setModal, type, setType, selectedFoods}) => {
	const [isHeader, setIsHeader] = useState(true);
	const [finalFood, setFinalFood] = useState();
	const [searchFooter, setSearchFooter] = useState(false);

	const { 
		handleAddFood, 
		handleDeleteFood, 
		handleUpdateFood,
		isSaving, 
		loading, 
		showNutrients, 
		setShowNutrients, 
		handleSearch, 
		getNutrition, 
		query, 
		setQuery, 
		results, 
		selectedFood
	} = usePantryAction(setModal)

	const footer =
	type === "add" ? (
		searchFooter === true && (
			<Button
				type="tertiary"
				text="Add Food"
				handleClick={() => handleAddFood(finalFood)}
			/>
		)
	) : (
		<div className="modal-footer-update">
			<div className="modal-update">
				<Button
					type="tertiary"
					text="Update Food"
					handleClick={() => handleUpdateFood(finalFood)}
				/>
			</div>

			<motion.div
				className="trash"
				onClick={() => handleDeleteFood(selectedFoods)}
				variants={buttonHoverClickVariant}
				whileTap="tap"
				whileHover="hover"
			>
				<i className="fa-solid fa-trash"></i>
			</motion.div>
		</div>
	);

	if(isSaving) {
		return(
			<SideBar
				setModal={setModal}
				title={type === "add" ? "Food Search" : "Pantry"}
				footer={footer}
				isFooter={footer}
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
			title={type === "add" ? "Add Food" : "Pantry"}
			isHeader={isHeader}
			isBack={showNutrients}
			backPath={() => setShowNutrients(false)}
			footer={footer}
			isFooter={footer}
			isClose
		>
			
			{type === "add" && (
				<FoodSearch 
					setType={setType}
					setIsHeader={setIsHeader}
					setModalOpen={setModal}
					setFinalFood={setFinalFood}
					setSearchFooter={setSearchFooter}
					showNutrients={showNutrients}
					setShowNutrients={setShowNutrients}
					handleSearch={handleSearch}
					getNutrition={getNutrition}
					query={query}
					setQuery={setQuery}
					results={results}
					selectedFood={selectedFood}
				/>
			)}

			{type === "macro" && (
				<MacroModal 
						setModalOpen={setModal}
						isUpdate
						food={selectedFoods}
						setFinalFood={setFinalFood}
				/>
			)}
		</SideBar>
	)
}

export default PantrySidebar;