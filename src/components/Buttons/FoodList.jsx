import "./FoodList.css";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../animations/motionVariants";

const FoodList = ({foodList, handleClick}) => {
	

	return(
		<motion.div
			className="food-list-grid"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{foodList.map((food) => {
				const logType = food.logType;

				return(
					<motion.div
						className="food-item-card card-design"
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						onClick={() => handleClick(food)}
						key={logType === "meal" ? food.items?.title : food.foodName}
					>
						<div className="title-serv">
							<span className="food-item-title">{logType === "meal" ? food.items?.title : food.foodName}</span>
							{logType === "food" && (
								<span className="food-item-serv">{food.serving} {food.servingUnit}</span>
							)}
							
						</div>

						<div className="cal-arrow">
							<span className="food-item-cal">{logType === "meal" ? food.items?.macros?.calories : food.calories} kcal</span>
							<i className="fa-solid fa-angle-right arrow"></i>
						</div>
					</motion.div>
				)
				
			})}
		</motion.div>
	)
}

export default FoodList;