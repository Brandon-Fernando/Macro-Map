import "./PantryModal.css"
import { useState } from "react";
import { motion } from "framer-motion";
import { buttonHoverClickVariant, containerVariants, itemVariants, pantryCardVariant } from "../../../animations/motionVariants";

const FoodSearchResults = ({results, handleGetNutrition, setView}) => {
	const [visibleCount, setVisibleCount] = useState(5);

	const handleShowMore = () => {
		setVisibleCount((prev) => prev + 5)
	}
	
	return(
		<motion.div 
			variants={containerVariants} 
			className="search-list"
			initial="hidden"
			animate="visible"
		>
			{results.slice(0, visibleCount).map((food) => (
				<motion.div 
					className="search-result-card card-design" 
					onClick={() =>  handleGetNutrition(food.food_id, setView)}
					key={food.food_id}
					variants={pantryCardVariant}
					initial="hidden"
					animate="visible"
					whileHover="hover"
					whileTap="tap"
				>
					<div className="search-title-serv">
						<span className="pantry-item-title">{food.food_name}</span>
						<span className="pantry-item-serv">{food.brand_name ? food.brand_name : food.food_type}</span>
					</div>

					<div className="search-cal-arrow">
						<i className="fa-solid fa-angle-right arrow"></i>
					</div>
				</motion.div>
			))}

			<motion.div variants={itemVariants} className="show-more-container">
				<motion.div 
					className="show-more" 
					onClick={() => handleShowMore()}
					variants={buttonHoverClickVariant}
					whileHover="hover"
					whileTap="tap"
				>
					<span>Show More</span>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

export default FoodSearchResults;