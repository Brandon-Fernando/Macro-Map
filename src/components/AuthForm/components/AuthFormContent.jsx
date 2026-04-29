import Button from "../../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../../animations/motionVariants";

const AuthFormContent = ({config, renderField, handleGoogleLogIn, handleSubmit, type}) => {
  const navigate = useNavigate();

  return(
    <div className="login-form-container">
			{/* TITLE  */}
			<div className="login-form-title-subtitle">
				<span className="login-form-title">{config.title}</span>
				<span className="login-form-subtitle">{config.subtitle}</span>
			</div>

			{/* FIELDS  */}
			<div className="email-password-container">
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
			</div>

			{/* OR DIVIDER */}
			<div className="or-break">
				<div className="left-line"></div>
				<span>Or</span>
				<div className="right-line"></div>
			</div>

			{/* GOOGLE LOG IN  */}
			<motion.div 
        className="google" 
        onClick={() => handleGoogleLogIn()}
        variants={buttonHoverClickVariant}
        whileHover={"hover"}
        whileTap={"tap"}
      >
	 			<i className="fa-brands fa-google"></i>
	 			<span>Sign in with Google</span>
	 		</motion.div>

			{/* REDIRECT  */}
			<span className="redirect">{config.redirectText}{" "}
	 			<span className="redirect-link" onClick={() => navigate(config.redirectTo)}
					style={{cursor: "pointer"}}>
						{config.redirectLink}
				</span>
			</span>
		</div>
  )
}

export default AuthFormContent;