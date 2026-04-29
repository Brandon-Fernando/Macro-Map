import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stepVariants, slideFromBottomShort, containerVariants, itemVariants } from "../../../animations/motionVariants";


const RecipeInstructions = ({instructions}) => {

	const [currentStep, setCurrentStep] = useState(0);

	return(
		<motion.div 
			className="instructions-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.span variants={itemVariants} className="main-bold-title">Step {currentStep + 1}</motion.span>

			<motion.div variants={itemVariants} className="toggle-step">
				{instructions.map((_, index) => (
					<motion.div 
						className="step-circ"
						variants={stepVariants}
						animate={currentStep === index ? "active" : "inactive"}
						onClick={() => setCurrentStep(index)}
						key={index}
					/>
				))}
			</motion.div>

			<motion.div variants={itemVariants}>
				<AnimatePresence mode="wait">
					<motion.div 
						key={currentStep}
						variants={slideFromBottomShort} 
						initial="hidden" 
						animate="visible" 
						exit="exit"
						className="step-container card-design"
					>
						<span className="main-reg-subtitle">{instructions[currentStep]}</span>
					</motion.div>
				</AnimatePresence>
				
				
			</motion.div>
		</motion.div>
	)
}

export default RecipeInstructions;
