import "./EmptyState.css"
import Button from "../Buttons/Button"
import { AnimatePresence, motion } from "framer-motion"
import { containerVariants, itemVariants } from "../../animations/motionVariants"

const EmptyState = ({icon, title, subtitle, isButton, buttonText, handleButton}) => {

	return(
		<AnimatePresence mode="wait">
			<motion.div 
				className="empty-state-container"
				variants={containerVariants}
				key={title}
				initial="hidden"
				animate="visible"
			>
				<motion.img variants={itemVariants} src={icon} alt="empty-icon" className="empty-icon"/>

				<motion.span variants={itemVariants} className="main-bold-title">{title}</motion.span>

				<motion.span variants={itemVariants} className="main-light-subtitle">{subtitle}</motion.span>

				{isButton && (
					<motion.div variants={itemVariants} className="empty-btn">
						<Button 
							type="tertiary"
							text={buttonText}
							handleClick={handleButton}
						/>
					</motion.div>
					
				)}
			</motion.div>
		</AnimatePresence>
	)
}

export default EmptyState;