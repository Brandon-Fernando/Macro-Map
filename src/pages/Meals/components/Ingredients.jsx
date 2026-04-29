import "../Meals.css"
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";

const Ingredients = ({ingredients}) => {

	return(
		<motion.div 
			className="ingredients-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{ingredients.map((ingredient) => (
				<motion.div variants={itemVariants} className="ingredient-card card-design">
					<span className="main-bold-subtitle ingredient-title">{ingredient.name}</span>
					<span className="main-reg-subtitle">{ingredient.quantity} {ingredient.unit}</span>
				</motion.div>
			))}
		</motion.div>
	)
}

export default Ingredients;