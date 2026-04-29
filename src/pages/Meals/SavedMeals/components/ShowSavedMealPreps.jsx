import { useState } from "react";
import PageHeader from "../../../../components/PageHeader/PageHeader";
import MacroModal from "../../components/MacroModal";
import MealPrepList from "../../MealPrep/components/MealPrepList";
import { motion, AnimatePresence } from "framer-motion";
import MealPrepModal from "../../MealPrep/components/MealPrepModal";
import { useLocation } from "react-router-dom";
import { containerVariants, itemVariants } from "../../../../animations/motionVariants";

const ShowSavedMealPreps = () => {
	// const [mealType, setMealType] = useState("")
	const [modalOpen, setModalOpen] = useState(false);
	const [meal, setMeal] = useState({})

	const location = useLocation();
	const { title, mealPrep } = location.state || {}

	return(
		<div className="page-container">
			<PageHeader 
				title={title}
				isBack 
				backPath={"/meals/saved"}
			/>

			<motion.div
				className="meal-prep-container"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants}>
					<MacroModal 
						nutritionalFacts={mealPrep.totalMacros}
					/>
				</motion.div>

				<motion.div variants={itemVariants}>
					<MealPrepList 
						mealPrep={mealPrep}
						setModal={setModalOpen}
						setMeal={setMeal}
					/>
				</motion.div>
			</motion.div>

			<AnimatePresence>
				{modalOpen && (
					<MealPrepModal 
						setModal={setModalOpen}
						meal={meal}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ShowSavedMealPreps;