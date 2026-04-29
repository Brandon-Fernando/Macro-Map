import "./BaseModal.css"
import { motion } from "framer-motion";
import { modalSlide, modalFade } from "../../../animations/motionVariants";


const BaseModal = ({children, handleClick, header, isBack, backPath, title, footer, isFade}) => {

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
				className="modal-wrapper"
				variants={modalSlide}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{/* CLOSE BUTTON */}
				<div onClick={handleClick} className="close-button">
					<i className="fa-solid fa-x"></i>
				</div>

				<div className="modal-container">
					{/* HEADER  */}
					<div className="modal-header">
						<div className="header-back-title">
							{isBack && (
								<div onClick={backPath} className="header-back">
									<i className="fa-solid fa-angle-left"></i>
								</div>
							)}
							
							<span className="modal-title">{title}</span>
						</div>

						{header && (
							{header}
						)}

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

export default BaseModal;