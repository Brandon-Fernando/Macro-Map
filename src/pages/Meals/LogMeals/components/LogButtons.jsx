import "../LogMeals.css";
import { useLogContext } from "../../../../context/LogContext";
import { motion, scale } from "framer-motion";
import { scaleVariant } from "../../../../animations/motionVariants";

const LOG_ICONS = [
	{label: "Breakfast", icon: "/LogIcons/Breakfast.svg"}, 
	{label: "Lunch", icon: "/LogIcons/Lunch.svg"}, 
	{label: "Dinner", icon: "/LogIcons/Dinner.svg"}, 
	{label: "Snack", icon: "/LogIcons/Snack.svg"}
]

const LogButtons = ({ setModalOpen, modalOpen, setMealType, mealType, isDesktop, setCurrentView }) => {
	const {logFoodData} = useLogContext();

	const handleOpenModal = (type) => {
		setMealType(type)
		setModalOpen(true)
		setCurrentView("main")
	}

	const getCalories = (mealType) => {
		const foods = logFoodData.filter(food => food.mealType === mealType);
		const totals = foods.reduce(
			(acc, food) => {
				const calories = food?.items?.macros ?
					food?.items?.macros?.calories : 
					food.calories ?? 0

				acc.calories += Number(calories);
				return acc;
			}, 
			{calories: 0}
		)

		return totals;
	}


	return(
		<div className="log-buttons-container">
			{LOG_ICONS.map((meal) => {
				const totals = getCalories(meal.label)

				return(
					<motion.div
						key={meal.label}
						className="log-card card-design"
						onClick={() => handleOpenModal(meal.label)}
						variants={scaleVariant}
						animate={mealType === meal.label ? "active" : "inactive"}
						exit="exit"
					>
						<img src={meal.icon} alt={meal.label} />

						<span className="log-card-label">{meal.label}</span>

						<span className="log-card-cal">{totals.calories} kcal</span>

						<div className="log-card-add">
							<i className="fa-solid fa-plus"></i>
						</div>
					</motion.div>
				)
			})}
		</div>
	)
}

export default LogButtons;