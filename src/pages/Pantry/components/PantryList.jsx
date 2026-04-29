import "../Pantry.css"
import { motion } from "framer-motion";
import { itemVariants, containerVariants, pantryCardVariant } from "../../../animations/motionVariants";
import useIsDesktop from "../../../hooks/useIsDesktop";

const PantryList = ({pantry, handleUpdateModal}) => {
	const isDesktop = useIsDesktop();

  return(
		<motion.div 
			className={`pantrylist-grid ${isDesktop ? "desktop" : ""}`}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{pantry.map((food) => (
				<motion.div 
					variants={pantryCardVariant} 
					initial="hidden"
					animate="visible"
					whileHover={"hover"}
					whileTap={"tap"}
					className="pantry-item-card card-design" 
					onClick={() => handleUpdateModal(food)}
					key={food.foodName}
				>
					<div className="title-serv">
						<span className="pantry-item-title">{food.foodName}</span>
						<span className="pantry-item-serv">{food.serving} {food.servingUnit}</span>
					</div>

					<div className="cal-arrow">
						<span className="pantry-item-cal">{food.calories} kcal</span>
						<i className="fa-solid fa-angle-right arrow"></i>
					</div>
				</motion.div>
			))}
		</motion.div>
	)
}

export default PantryList;