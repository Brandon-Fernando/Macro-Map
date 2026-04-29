import RecipeDetails from "./components/RecipeDetails";
import RecipeMacros from "./components/RecipeMacros";
import ToggleOptions from "../ToggleOptions/ToggleOptions"
import "./Recipe.css"
import { useState } from "react";
import RecipeIngredients from "./components/RecipeIngredients";
import RecipeInstructions from "./components/RecipeInstructions";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../animations/motionVariants";

const OPTIONS = ["Ingredients", "Instructions"];

const Recipe = ({meal}) => {
	const [option, setOption] = useState("Ingredients");

	return(
		<motion.div 
			className="recipe-meal-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.span variants={itemVariants} className="main-bold-title-M recipe-title">{meal.title}</motion.span>

			<RecipeMacros macros={meal.macros}/>

			<motion.div variants={itemVariants}>
				<RecipeDetails meal={meal}/>
			</motion.div>
			

			<motion.div className="toggle-recipe" variants={itemVariants}>
				<ToggleOptions 
					option={option}
					setOption={setOption}
					options={OPTIONS}
				/>
			
				{option === "Ingredients" && (
				
						<RecipeIngredients ingredients={meal.ingredients_needed}/>
			
					
				)}	

				{option === "Instructions" && (
					<RecipeInstructions instructions={meal.instructions}/>
				)}

			</motion.div>	
			
		</motion.div>
	)
}

export default Recipe;