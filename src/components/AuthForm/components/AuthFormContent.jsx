import Button from "../../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { buttonHoverClickVariant, containerVariants, itemVariants } from "../../../animations/motionVariants";

const AuthFormContent = ({config, renderField, handleGoogleLogIn, handleSubmit, type}) => {
  const navigate = useNavigate();

  return(
    <motion.div 
			className="login-form-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* TITLE  */}
			<div className="login-form-title-subtitle">
				<motion.span variants={itemVariants} className="login-form-title">{config.title}</motion.span>
				<motion.span variants={itemVariants} className="login-form-subtitle">{config.subtitle}</motion.span>
			</div>

			{/* FIELDS  */}
			<motion.div variants={itemVariants} className="email-password-container">
				{/* INPUT FIELDS  */}
				{type === "signup" && (
					<div className="flname-container">
						{config.fields
							.filter(f => f === "firstName" || f === "lastName")
							.map(renderField)}
				  </div>
				)}

				{config.fields
				.filter(f => f !== "firstName" && f !== "lastName")
				.map(renderField)}

				<div className="login-button">
					<Button 
						type="tertiary"
						text={config.buttonText}
						handleClick={handleSubmit}
					/>
				</div>	
			</motion.div>

			{/* OR DIVIDER */}
			<motion.div variants={itemVariants} className="or-break">
				<div className="left-line"></div>
				<span>Or</span>
				<div className="right-line"></div>
			</motion.div>

			{/* GOOGLE LOG IN  */}
			<motion.div 
        className="google" 
				variants={itemVariants}
      >
				<motion.div
					onClick={() => handleGoogleLogIn()}
					variants={buttonHoverClickVariant}
					whileHover="hover"
					whileTap="tap"
				>
					<i className="fa-brands fa-google"></i>
					<span>Sign in with Google</span>
				</motion.div>
	 			
	 		</motion.div>

			{/* REDIRECT  */}
			<motion.span variants={itemVariants} className="redirect">{config.redirectText}{" "}
	 			<span className="redirect-link" onClick={() => navigate(config.redirectTo)}
					style={{cursor: "pointer"}}>
						{config.redirectLink}
				</span>
			</motion.span>
		</motion.div>
  )
}

export default AuthFormContent;