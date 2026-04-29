import "./PageHeader.css"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { slowSpringVariant, slideFromLeft, slideFromRight } from "../../animations/motionVariants";

const PageHeader = ({title, isButton, handleClick, isBack, backPath, buttonText}) => {
	const navigate = useNavigate();

	return(
		<div className="page-header-container">
			{!isBack ? (
				<motion.img 
					src="/Logo/Logo.svg" 
					alt="Logo" 
					className="logo"
					variants={slowSpringVariant}
					initial="hidden"
					animate="visible"
					onClick={() => navigate("/dashboard")}
				/>
			) : (
				<motion.div 
					className="back-header" 
					onClick={() => navigate(backPath)}
					variants={slideFromLeft}
					initial="hidden"
					animate="visible"
				>
					<div className="back">
						<i className="fa-solid fa-angle-left"></i>
					</div>

					<span>Back</span>
				</motion.div>
			)}
			

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
		</div>
	)
}

export default PageHeader;