import Icon from "../../../../components/Icon/Icon";
import "../MealPrep.css"
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../../../animations/motionVariants";

const MEALS = [
	{label: "Breakfast", icon: "/LogIcons/Breakfast.svg"}, 
	{label: "Lunch", icon: "/LogIcons/Lunch.svg"}, 
	{label: "Dinner", icon: "/LogIcons/Dinner.svg"}, 
	{label: "Snack", icon: "/LogIcons/Snack.svg"}
]

const NUTRI = [
	{label: "Protein", icon: "/NutriIcons/Protein-White.svg"},
	{label: "Carbs", icon: "/NutriIcons/Carbs-White.svg"}, 
	{label: "Fat", icon: "/NutriIcons/Fat-White.svg"}
]

const MealPrepList = ({mealPrep, setMealType, setModal, setMeal, setIsRecipe}) => {

	const handleRecipeModal = (mealType) => {
		// setMealType(mealType);
		setMeal(mealPrep[mealType.label.toLowerCase()]);
		setModal(true);
		setIsRecipe(true);
		setMealType(mealType.label)
	}

	return(
		// <div className="meal-prep-list-container">
		// 	{MEALS.map((meal) => (
		// 		<div className="meal-prep-list-card card-design">
		// 			<span className="main-bold-title">{meal}</span>
					
		// 			<hr className="break"/>

		// 			<div className="meal-prep-recipe-container" onClick={() => handleRecipeModal(meal)}>
		// 				<span className="main-reg-subtitle meal-prep-title">{mealPrep[meal.toLowerCase()].title}</span>

		// 				<div className="cal-angle">
		// 					<span className="main-reg-subtitle">{mealPrep[meal.toLowerCase()].macros.calories} kcal</span>
		// 					<i className="fa-solid fa-angle-right right"></i>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	))}
		// </div>

		// <div className="meal-prep-list-container">
		// 	{MEALS.map((meal) => (
		// 		<div className="meal-prep-list-card card-design" onClick={() => handleRecipeModal(meal)}>
		// 			<span className="main-bold-title">{meal}</span>

		// 			<hr className="break"/>

		// 			<div className="meal-recipe-container">
		// 				<div className="meal-recipe-title-cal">
		// 					<span className="main-bold-subtitle">{mealPrep[meal.toLowerCase()].title}</span>

		// 					<span className="main-reg-subtitle">{mealPrep[meal.toLowerCase()].macros.calories} kcal</span>
		// 				</div>

		// 				<div className="meal-recipe-macros">
		// 					{NUTRI.map((nutri) => (
		// 						<div className="nutri-icon-val">
		// 							{/* <img src={nutri.icon} alt={nutri.label} /> */}
		// 							<Icon size="S" icon={nutri.icon} type="img"/>
		// 							<span className="main-reg-subtitle">0.2 g</span>
		// 						</div>
		// 					))}
		// 				</div>

		// 				<i className="fa-solid fa-angle-right meal-ang"></i>
		// 			</div>

					
		// 		</div>
		// 	))}
		// </div>
		<div className="meal-prep-list-container">
			{MEALS.map((meal) => (
				<motion.div 
					key={meal.label} 
					className="meal-prep-list-card card-design" 
					onClick={() => handleRecipeModal(meal)}
					variants={buttonHoverClickVariant}
					whileHover="hover"
					whileTap="tap"
				>
					<div className="meal-prep-list-icon-label">
						<img src={meal.icon} alt={meal.label} />

						<div className="meal-prep-list-label-cal">
							<span className="main-reg-title">{meal.label}</span>
							<span className="main-light-title cal-sub">{mealPrep[meal.label.toLowerCase()].macros.calories} kcal</span>
						</div>
					</div>
					
					<i className="fa-solid fa-angle-right"></i>
				</motion.div>
			))}
		</div>
	)
}

export default MealPrepList;