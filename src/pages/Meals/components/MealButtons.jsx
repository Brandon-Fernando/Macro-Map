import "../Meals.css";
import { useNavigate } from "react-router-dom";
import useIsDesktopHorizontal from "../../../hooks/useIsDesktopHorizontal";
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../../animations/motionVariants";

const MEAL_BUTTONS = [
	{label: "Log Meals", icon: "/MealIcons/Log-Icon.svg", path: "log"}, 
	{label: "Meal Prep", icon: "/MealIcons/Meal-Prep-Icon.svg", path: "prep"}, 
	{label: "Generate", icon: "/MealIcons/Generate-Icon.svg", path: "generate"}, 
	{label: "Saved Meals", icon: "/MealIcons/Saved-Meal-Icon.svg", path: "saved"}
]

const MealButtons = ({setModal}) => {
	const navigate = useNavigate();
	const isDesktopHorizontal = useIsDesktopHorizontal();

	return(
		<div className="meal-buttons-container">
			{MEAL_BUTTONS.map((button) => (
				<motion.div
					className="meal-button card-design"
					key={button.label}
					// onClick={
					// 	button.label === "Generate" && !isDesktopHorizontal 
					// 	? () => setModal(true)
					// 	: () => navigate(button.path)}
					onClick={() => navigate(button.path)}
					variants={buttonHoverClickVariant}
					whileHover="hover"
					whileTap="tap"
				>
					<img src={button.icon} alt={button.label} />

					<div className="meal-button-title">
						<span>{button.label}</span>
						
						<div className="card-button">
							<i className="fa-solid fa-angle-right"></i>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	)
}

export default MealButtons;