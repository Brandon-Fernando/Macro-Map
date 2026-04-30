import "../SavedMeals.css"
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../../animations/motionVariants";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import { useNavigate } from "react-router-dom";

const NUTRI = [
	{label: "Protein", icon: "/NutriIcons/Protein.svg"}, 
	{label: "Carbs", icon: "/NutriIcons/Carbs.svg"}, 
	{label: "Fat", icon: "/NutriIcons/Fat.svg"}
]

const SavedMealsList = ({meals, setMeal, setModal, setMealEdit}) => {
	const hasRecipes = Object.keys(meals).length > 0;
	const navigate = useNavigate();

	const handleShowRecipe = (meal) => {
		setMeal(meal);
		setModal(true);
	}

	const handleModalShowRecipe = (meal) => {
		setMeal(meal);
		setMealEdit(true);
	}

	if(!hasRecipes){
		return(
			<div className="empty-body-main-container">
				<EmptyState 
					icon="/EmptyState/MealPlan.svg"
					title="No Saved Recipes"
					subtitle="Generate some recipes and save if you like it!"
					isButton
					buttonText="Generate"
					handleButton={() => navigate("/meals/generate")}
				/>
			</div>	
		)
	}

	return(
		<motion.div 
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="saved-meals-container"
		>
			{meals.map((meal) => (
				<motion.div 
					onClick={() => handleShowRecipe(meal.items)}
					className="saved-meals-card card-design"
					key={meal.id}
				>
					<div className="saved-title-cal">
						<span className="main-bold-subtitle">{meal.items.title}</span>
						<span className="main-light-subtitle">{meal.items.macros.calories} kcal</span>
					</div>

					<div className="burger-meals">
						<i 
							className="fa-solid fa-ellipsis-vertical"
							onClick={
								(e) => {
									e.stopPropagation()
									handleModalShowRecipe(meal)
								}
							}
						/>
					</div>
				</motion.div>
			))}
		</motion.div>
	)
}

export default SavedMealsList;