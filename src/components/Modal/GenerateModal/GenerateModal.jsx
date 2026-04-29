import { motion } from "framer-motion"
import { modalSlide, modalFade } from "../../../animations/motionVariants"
import "./GenerateModal.css"

const GenerateModal = ({children, handleClick}) => {

  return(
		<>
			<motion.div 
				className="backdrop"
				onClick={handleClick}
				variants={modalFade}
				initial="hidden"
				animate="visible"
				exit={"exit"}
			/>

			<motion.div
				className="gen-modal-container"
				variants={modalSlide}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<div className="gen-modal-header">
					<span className="main-bold-title">Select Recipe Type</span>

					<i onClick={handleClick} className="fa-solid fa-angle-down angle-down"></i>
				</div>

				{children}
			</motion.div>
		</>
	)
}

export default GenerateModal;