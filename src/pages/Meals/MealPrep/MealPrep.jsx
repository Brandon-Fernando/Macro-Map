import EmptyState from "../../../components/EmptyState/EmptyState";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useMealContext } from "../../../context/MealContext";
import MacroModal from "../components/MacroModal";
import { usePantryContext } from "../../../context/PantryContext";
import { useNavigate } from "react-router-dom";
import MealPrepList from "./components/MealPrepList";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import MealPrepModal from "./components/MealPrepModal";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";
import Button from "../../../components/Buttons/Button";
import MealPrepSaveModal from "./components/MealPrepSaveModal";
import useIsDesktop from "../../../hooks/useIsDesktop";
import MealPrepSidebar from "./components/MealPrepSidebar";
import LoadSuccess from "../../../components/LoadSuccess/LoadSuccess";
import Macros from "../../../components/Macros/Macros";
import useIsDesktopHorizontal from "../../../hooks/useIsDesktopHorizontal";

const MealPrep = () => {
	const { mealPrep, generateMealPrep, saveMealPrep, isLoading } = useMealContext();
	const { pantryData } = usePantryContext();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [mealType, setMealType] = useState("");
	const [meal, setMeal] = useState({});
	const [saveModalOpen, setSaveModalOpen] = useState(false);
	const isDesktop = useIsDesktop();
	const [isRecipe, setIsRecipe] = useState(false);
	const isDesktopHorizontal = useIsDesktopHorizontal();

	const hasMealPrep = Object.keys(mealPrep).length > 0;

	if(isLoading){
		return(
			<div className="page-container">
				<PageHeader 
				title="Meal Prep"
				isBack
				backPath={"/meals"}
				isButton={hasMealPrep}
				buttonText="Regenerate"
				handleClick={() => generateMealPrep()}
				/>
					<div className="load-success-container-mp">
						<LoadSuccess 
							isLoading={isLoading}
							dark
						/>
					</div>
			</div>
		)
	}

	return(
		<motion.div 
			className="page-container mp"
			animate={{
				marginRight: modalOpen && isDesktopHorizontal ? "368px" : "0px"
			}}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			<PageHeader 
				title="Meal Prep"
				isBack
				backPath={"/meals"}
				isButton={hasMealPrep}
				buttonText="Regenerate"
				handleClick={() => generateMealPrep()}

			/>
			
			{/* ===== CHECK PANTRY =====  */}
			{pantryData.length === 0 ? (
				<div className="empty-body-main-container">
					<EmptyState 
						icon={"/EmptyState/Pantry.svg"}
						title="Empty Pantry"
						subtitle="Add food to your pantry before generating!"
						isButton
						buttonText={"Add Food"}
						handleButton={() => navigate("/pantry")}
					/>
				</div>
			) : (
				<>
					{/* ===== CHECK IF THERES A MEAL PREP =====  */}
					{!hasMealPrep && (
					<div className="empty-body-main-container">
						<EmptyState 
							icon={"/EmptyState/MealPlan.svg"}
							title="Generate Meal Prep"
							subtitle="Click to hit your goals!"
							isButton
							buttonText={"Generate"}
							handleButton={() => generateMealPrep()}
						/>
					</div>
				)}

				{/* ===== MEAL PREP =====  */}
				{hasMealPrep && (
					<motion.div 	
						className="meal-prep-container"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{/* MACROS  */}
						<motion.div className="meal-prep-macros-container" variants={itemVariants}>
							{/* <span className="main-reg-title">Nutritional Facts</span> */}
							{/* <MacroModal 
								nutritionalFacts={mealPrep.totalMacros}
							/> */}
							<Macros nutritionalFacts={mealPrep.totalMacros}/>
						</motion.div>
						

						{/* MEAL PREP LIST  */}
						<motion.div variants={itemVariants} className="meal-prep-list-cont">
							<span className="main-reg-title">Meals</span>
							<MealPrepList 
								mealPrep={mealPrep}
								setMealType={setMealType}
								setModal={setModalOpen}
								setMeal={setMeal}
								setIsRecipe={setIsRecipe}
							/>
						</motion.div>
						
						<motion.div>
							<Button 
								type="tertiary"
								text="Save Meal Prep"
								// handleClick={() => saveMealPrep(mealPrep)}
								handleClick={() => setSaveModalOpen(true)}
							/>
						</motion.div>
						
					</motion.div>
				)}
				</>
			)}

			<AnimatePresence mode="wait">
				{modalOpen && !isDesktopHorizontal && (
					<MealPrepModal 
						setModal={setModalOpen}
						meal={meal}
						mealType={mealType}
					/>
				)}

				{saveModalOpen && (
					<MealPrepSaveModal 
						setModal={setSaveModalOpen}
						mealPrep={mealPrep}
					/>
				)}

				{modalOpen && isDesktopHorizontal && (
					<MealPrepSidebar 
						key={mealType}
						setModalOpen={setModalOpen}
						mealType={mealType}
						meal={meal}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default MealPrep;