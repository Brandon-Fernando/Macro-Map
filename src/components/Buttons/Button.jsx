import "./Button.css"
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../animations/motionVariants";

const Button = ({type, text, handleClick}) => {
  
	return(
		<motion.div 
			className={`button ${type}`} 
			onClick={handleClick}
			variants={buttonHoverClickVariant}
			whileTap={"tap"}
			whileHover={"hover"}
		>
			<span className="button-text">{text}</span>
		</motion.div>
	)
}

export default Button;