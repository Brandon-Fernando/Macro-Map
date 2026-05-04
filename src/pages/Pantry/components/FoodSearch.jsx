import { useState, useEffect } from "react";
import Searchbar from "../../../components/Searchbar/Searchbar";
import EmptyState from "../../../components/EmptyState/EmptyState";
import axios from "axios";
import FoodSearchResults from "./FoodSearchResults";
import "./PantryModal.css"
import MacroModal from "../../../components/Modal/MacroModal/MacroModal";
import { usePantryContext } from "../../../context/PantryContext";
import usePantryAction from "./usePantryActions";
import LoadSuccess from "../../../components/LoadSuccess/LoadSuccess";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";

const FoodSearch = ({setModalOpen, 
	// setIsHeader, 
	setType, 
	setFinalFood, 
	setSearchFooter, 
	setShowNutrients, 
	showNutrients, 
	handleSearch, 
	getNutrition, 
	query, 
	setQuery, 
	results,
	selectedFood, 
	isSearching
}) => {
	const {savePantry} = usePantryContext();
	const [view, setView] = useState("");
	

	useEffect(() => {
    if (showNutrients) {
        setSearchFooter(true);
    } else {
			setSearchFooter(false)
		}
	}, [showNutrients, setSearchFooter, setShowNutrients]);


	if(showNutrients){
		return(
			<MacroModal 
				setModalOpen={setModalOpen}
				isAdd
				food={selectedFood}
				setFinalFood={setFinalFood}
			/>
		)
	}
	

	return(
		<motion.div 
			className="food-search-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* ===== HEADER ===== */}
			<div className="food-search-header">
				{/* <motion.div variants={itemVariants} className="search-header">
					<span className="main-bold-title modal-title">Food Search</span>

					<i className="fa-solid fa-angle-down angle"></i>
				</motion.div> */}

				<motion.div variants={itemVariants} className="food-searchbar">
					<Searchbar 
						query={query}
						setQuery={setQuery}
						handleSearch={handleSearch}
					/>
				</motion.div>
				
			</div>

			{isSearching && (
				<div className="load-success-container">
					<LoadSuccess 
						isLoading={isSearching}
						dark
					/>
				</div>
			)}

			{results.length === 0 && !isSearching && (
				<motion.div variants={itemVariants} className="empty-body-container">
					<EmptyState 
						icon={"/EmptyState/Search.svg"}
						title="Hmm... Nothing Here"
						subtitle="Search for a food to add!"
					/>
				</motion.div>
			)}
			
			<motion.div variants={itemVariants} className="food-search-body">

				{results.length > 0 && (
					<div className="food-search-results-container">
						<span className="main-reg-subtitle">Search Results</span>

						<FoodSearchResults 
							handleGetNutrition={getNutrition}
							results={results}
							setView={setView}
						/>
					</div>
					
				)}
			</motion.div>
			


		</motion.div>
	)
}

export default FoodSearch;