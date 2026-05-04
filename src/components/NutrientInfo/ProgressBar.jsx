import "./NutrientInfo.css"
import { motion } from "framer-motion"

const ProgressBar = ({currentProgress, goal, size, isPercentage, percentage}) => {

	const percent = 
		isPercentage ? 
		percentage : 
		((currentProgress / goal) * 100).toFixed(1)

	return(
		<div className={`progress-bar-container ${size}`}>
			<motion.div
				className="bar"
				initial={{width: 0}}
				animate={{width: `${percent}%`}}
				transition={{duration: 0.7, ease: "easeInOut"}}
			/>
		</div>
	)
}

export default ProgressBar;