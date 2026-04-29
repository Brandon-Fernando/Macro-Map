import { motion } from "framer-motion";
import "./Progress.css"

const ProgressCircle = ({currentProgress, goal, size, title, subtitle, isPercent}) => {

	const percentage = ((currentProgress / goal) * 100).toFixed(1);

	return(
		<motion.div 
			className={`prog-circle-container ${size}`} 
			initial={{ "--percentage": 0 }}
      animate={{ "--percentage": percentage }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
		>
      <div className="circle-text">
				{isPercent ? (
					<span className="main-bold-title">{percentage} %</span>
				) : (
					<>
						<span className="prog-circ-title">{title}</span>
						<span className="prog-circ-subtitle">{subtitle}</span>
					</>
				)}
                
    	</div>
            
    </motion.div>
	)
}

export default ProgressCircle;