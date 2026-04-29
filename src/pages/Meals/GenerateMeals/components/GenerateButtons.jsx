import "../GenerateMeals.css"
import Icon from "../../../../components/Icon/Icon.jsx"
import { motion } from "framer-motion"
import { scaleSelect, scaleNutri } from "../../../../animations/motionVariants"

const BUTTONS = [
	{
		title: "Pantry Recipe", 
		subtitle: "Generate a recipe based on what is in your pantry!",
		icon: "fa-solid fa-cart-flatbed-suitcase"
	}, 
	{
		title: "Random Recipe", 
		subtitle: "Generate a random recipe that you can try out!",
		icon: "fa-solid fa-dice"
	}
]

const GenerateButtons = ({pantryGen, randomGen, setIsSelected, isSelected}) => {

	return(
		<div className="generate-buttons-container">
			{BUTTONS.map((button) => (
				<motion.div 
					className={`generate-buttons-cards ${isSelected === button.title ? "selected" : ""}`}
					key={button.title}
					onClick={() => setIsSelected(button.title)}
					variants={scaleSelect}
					animate={isSelected === button.title ? "active" : "inactive"}
				>
					<div className="gen-btn-icon">
						<i className={button.icon}/>
					</div>

					<div className="btn-desc">
						<span className="main-reg-title desc-title">{button.title}</span>
						<span className="main-light-subtitle desc-subtitle">{button.subtitle}</span>
					</div>
				</motion.div>
			))}
		</div>
	)
}

export default GenerateButtons;