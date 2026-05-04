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
	{label: "Protein", icon: "fa-solid fa-drumstick-bite"},
	{label: "Carbs", icon: "fa-solid fa-wheat-awn"}, 
	{label: "Fat", icon: "fa-solid fa-droplet"}
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
		<div className="meal-prep-list-container">
			{MEALS.map((meal) => (
				<motion.div
					key={meal.label}
					className="meal-prep-list-card card-design"
					onClick={() => handleRecipeModal(meal)}
					variants={buttonHoverClickVariant}
					whileHover={"hover"}
					whileTap={"tap"}
				>
					{/* MEAL TYPE AND CALORIES  */}
					<div className="meal-type-cal">
						<span className="main-bold-title">{meal.label}</span>

						<div className="cal-continue">
							<span className="main-light-subtitle">{mealPrep[meal.label.toLowerCase()].macros.calories} kcal</span>

							<div className="continue">
								<i className="fa-solid fa-angle-right"></i>
							</div>
						</div>
					</div>

					<hr className="break"/>

					{/* MEAL ICON AND MEAL  */}
					<div className="meal-container">
						<div className="meal-icon">
							<img src={meal.icon} alt={meal.label} />
						</div>

						<div className="meal-title-macros">
							<span className="main-bold-subtitle">{mealPrep[meal.label.toLowerCase()].title}</span>

							<div className="meal-macro-container">
								{NUTRI.map((nutri) => (
									<div
										className="meal-macro"
									>
										<i className={nutri.icon}></i>

										<span>{mealPrep[meal.label.toLowerCase()].macros[nutri.label.toLowerCase()]} g</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	)
}

export default MealPrepList;