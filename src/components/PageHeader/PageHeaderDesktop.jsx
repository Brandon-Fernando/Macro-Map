import { motion } from "framer-motion";
import { slideFromRight, slideFromLeft } from "../../animations/motionVariants";

const PageHeaderDesktop = ({title, isButton, buttonText, handleClick}) => {

	return(
		<div className="header-title-container">
			<motion.span
				className="header-title"
				variants={slideFromLeft}
				initial="hidden"
				animate="visible"
			>
				{title}
			</motion.span>

			{isButton && (
					<motion.div 
						className="header-button" 
						onClick={handleClick}
						variants={slideFromRight}
						initial="hidden"
						animate="visible"
					>
						
						<span>{buttonText}</span>

						{buttonText === "Add Food" && (
							<i className="fa-solid fa-plus"></i>
						)}

						{buttonText === "Regenerate" && (
							<i className="fa-solid fa-rotate"></i>
						)}
						
					</motion.div>
				)}
		</div>
	)
}

export default PageHeaderDesktop;