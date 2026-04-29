import "../SavedMeals.css";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../../animations/motionVariants";
import { useNavigate } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import EmptyState from "../../../../components/EmptyState/EmptyState";

const SavedMealPrepList = ({mealPreps, setPrepEdit, setMealPrep}) => {
	const navigate = useNavigate();

	const handleOpenEdit = (mealPrep) => {
		setMealPrep(mealPrep);
		setPrepEdit(true);
	}

	const hasMealPreps = Object.keys(mealPreps).length > 0;
	
	if(!hasMealPreps){
		return(
			<div className="empty-body-main-container">
				<EmptyState 
					icon="/EmptyState/MealPlan.svg"
					title="No Saved Meal Preps"
					subtitle="Generate a meal prep and save if you like it!"
					isButton
					buttonText="Generate"
					handleButton={() => navigate("/meals/prep")}
				/>
			</div>
		)
	}

	return(
		<motion.div 
			className="saved-meals-list-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{mealPreps.map((mealPrep) => (
				<motion.div 
					variants={itemVariants} 
					className="meal-prep-folder"
					onClick={() => navigate("mealPrep", {
						state: {title: mealPrep.title, mealPrep: mealPrep.items}
					})}
					key={mealPrep.title}
				>
					<div className="folder-content">

						<div className="burger">
							<i onClick={
								(e) => {
									e.stopPropagation();
									handleOpenEdit(mealPrep);
								}
							} className="fa-solid fa-ellipsis-vertical edit"></i>
						</div>

						<span className="folder-title">{mealPrep.title}</span>
					</div>
				</motion.div>
			))}
		</motion.div>
	)
}

export default SavedMealPrepList