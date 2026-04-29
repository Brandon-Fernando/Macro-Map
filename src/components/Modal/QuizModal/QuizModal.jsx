import "./QuizModal.css"
import { motion } from "framer-motion";
import { modalSlide, modalFade } from "../../../animations/motionVariants";


const QuizModal = ({children, handleClick, title, footer, isFade}) => {

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
				className="quiz-modal-wrapper"
				variants={modalSlide}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{/* CLOSE BUTTON */}
				<div onClick={handleClick} className="close-button">
					<i className="fa-solid fa-x"></i>
				</div>

				<div className="quiz-modal-container">
					{/* HEADER  */}
					<div className="modal-header">
						<div className="header-back-title">
							<span className="modal-title">{title}</span>
						</div>

						<div className="border-line"></div>
					</div>

					<div className="modal-body">
						{children}
					</div>


					{/* FOOTER  */}
					{footer && (
						<div className="modal-footer">
							{footer}
						</div>
					)}
					
				</div>
			</motion.div>
		</>
	)
}

export default QuizModal;