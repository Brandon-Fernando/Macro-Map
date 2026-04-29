import { useState } from "react";
import { motion } from "framer-motion";
import { useLogContext } from "../../../../context/LogContext";

const SavedMealsLog = ({meals, mealType}) => {

	const handleLogMeal = async (meal) => {
		const isAlreadyLogged = logFoodData.some(
			(item) => 
				item.mealId === meal.id && 
				item.logType === "meal" && 
				item.mealType === mealType
		);

		if (isAlreadyLogged) return;

		const mealItem = {
			items: meal.items,
			mealId: meal.id,
			mealType,
			logType: "meal"
		};

		try{
			await logFood(mealItem);
		} catch (error) {
			console.error(error)
		}
	}

	const { logFood, logFoodData } = useLogContext();


  return(
		<div className="saved-log-meals-container">
			{meals.map((meal) => {
				const isLogged = logFoodData.some(
					(item) => 
						item.mealId === meal.id && 
						item.logType === "meal" &&
						item.mealType === mealType
				);

				return(
					<div
						className="saved-lm-card card-design"
						key={meal.id}
					>
						<div className="saved-lm-title-cal">
							<span className="main-bold-subtitle">{meal.items.title}</span>
							<span className="main-light-subtitle">{meal.items.macros.calories} kcal</span>
						</div>

						<motion.div 
							// onClick={() => handleSelect(meal.id)} 
							onClick={() => handleLogMeal(meal)}
							className="saved-add"
							key={isLogged}
							initial={{ scale: 0 }}
							animate={{
								scale: 1,
								backgroundColor: isLogged ? "#FE9844" : "transparent",
								border: isLogged ? "#FE9844" : "3px solid #FE9844",
								color: isLogged ? "#FFFFFF" : "#FE9844"
							}}
							transition={{ duration: 0.2 }}
						>
							{
							isLogged 
								? <i className="fa-solid fa-check"/>
								: <i className="fa-solid fa-plus"/>
							}
						</motion.div>
					</div>
				)
				
			})}
		</div>
	)
}

export default SavedMealsLog;