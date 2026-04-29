import { motion } from "framer-motion"
import { modalFade, modalSpring } from "../../../animations/motionVariants"
import "./EditModal.css"

const EditModal = ({handleClick, children}) => {

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

			<motion.div 
				className="edit-modal-wrapper" 
				onClick={handleClick}
				variants={modalSpring}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<div onClick={handleClick} className="close-btn">
					<i className="fa-solid fa-x"></i>
				</div>
				
				<div className="edit-modal-body" onClick={(e) => e.stopPropagation()}>
					{children}
				</div>	
			</motion.div>
		</>
	)
}

export default EditModal;