import MacroModal from "./MacroModal";
import "../Meals.css"
import Button from "../../../components/Buttons/Button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";
import useIsDesktop from "../../../hooks/useIsDesktop";

const MEAL_DETAILS = [
	{label: "Prep Time", key: "prep_time", icon: "fa-solid fa-clock"}, 
	{label: "Cook Time", key: "cook_time", icon: "fa-solid fa-kitchen-set"}, 
	{label: "Servings", key: "servings", icon: "fa-solid fa-users"}
]

const Details = ({meal, save, isButton}) => {
	const isDesktop = useIsDesktop();

	return(
		<motion.div 
			className="details-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{isDesktop && (
				<span className="main-bold-title">{meal.title}</span>
			)}

			<div className="meal-details">
				{MEAL_DETAILS.map((detail) => (
					<motion.div
						key={detail.label}
						className="detail card-design"
						variants={itemVariants}
					>
						<i className={detail.icon}></i>
						<span className="main-reg-subtitle">{detail.label}</span>
						<span className="main-bold-title">{meal[detail.key]}</span>
					</motion.div>
				))}
			</div>
			
			<motion.div variants={itemVariants}>
				<MacroModal 
					nutritionalFacts={meal.macros}
				/>
			</motion.div>
			
			{isButton && (
				<motion.div variants={itemVariants} className="detail-button">
					<Button 
						type={"tertiary"}
						text="Save Recipe"
						handleClick={() => save(meal)}
					/>
				</motion.div>
			)}
			
		</motion.div>
	)
}

export default Details;