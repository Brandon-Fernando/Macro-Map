import { Riple, OrbitProgress } from "react-loading-indicators";
import { motion } from "framer-motion";
import { slideFromBottomSmall, springVariant } from "../../animations/motionVariants";
import "./LoadSuccess.css"
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";

const LoadSuccess = ({isLoading, loadText, successText, isQuiz, path, dark}) => {
	const navigate = useNavigate();

	if(isLoading){
		return(
			<motion.div 
				className="load-container"
				variants={slideFromBottomSmall}
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.5 }}
			>
				{dark ? (
					<OrbitProgress color="#FE9844" size="large" text="" textColor="" />
				) : (
					<OrbitProgress color="#ffffff" size="large" text="" textColor="" />
				)}
				

				<h3 className={`load-text ${dark ? "dark" : ""}`}>{loadText}</h3>
			</motion.div>
		)
	}


  return(
		<div className="load-container">
			<div className="center-group">
				<motion.div 
					className={`success-check ${dark ? "dark" : ""}`}
					variants={springVariant}
					initial="hidden"
					animate="visible"
				>
					<i className="fa-solid fa-check"></i>
				</motion.div>

				<motion.h3 
					className={`load-text ${dark ? "dark" : ""}`}
					variants={slideFromBottomSmall}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.6 }}
				>
					{successText}
				</motion.h3>
			</div>
			
			{isQuiz && (
				<motion.div 
					className="load-button"
					variants={slideFromBottomSmall}
					initial="hidden"
					animate="visible"
				>
					<Button 
						type="tertiary"
						text="Continue"
						handleClick={() => navigate(path)}
					/>
				</motion.div>
			)}
			
		</div>
	)
}

export default LoadSuccess;