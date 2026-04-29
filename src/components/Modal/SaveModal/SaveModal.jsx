import "./SaveModal.css"
import { motion } from "framer-motion"
import { modalFade, modalSpring } from "../../../animations/motionVariants"

const SaveModal = ({handleClick, children}) => {

  return(
		<>
			<motion.div 
				className="backdrop"
				onClick={handleClick}
				variants={modalFade}
				initial="hidden"
				animate="visible"
				exit="exit"
			/>

			<div onClick={handleClick} className="modal-center-container">
				<motion.div 
					className="save-modal-container"
					variants={modalSpring}
					initial="hidden"
					animate="visible"
					exit="exit"
					onClick={(e) => e.stopPropagation()}
				>
					<i onClick={handleClick} className="fa-solid fa-x x"></i>

					{children}
				</motion.div>
			</div>
			
		</>
	)
}

export default SaveModal;