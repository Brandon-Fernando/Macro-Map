import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";

const RecipeIngredients = ({ingredients}) => {

	return(
		<motion.div 
			className="recipe-ingredients"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{ingredients.map((ingredient) => (
				<motion.div
					className="ingredient card-design"
					key={ingredient.name}
					variants={itemVariants}
				>
					<span className="main-bold-subtitle ing-title">{ingredient.name}</span>

					<div className="ing-qty-unit">
						<span className="main-light-subtitle">{ingredient.quantity} {ingredient.unit}</span>
					</div>
				</motion.div>
			))}
		</motion.div>
	)
}

export default RecipeIngredients;