import "./BaseModal.css"
import { motion } from "framer-motion";
import { modalSlide, modalFade } from "../../../animations/motionVariants";
import { useEffect } from "react";


const BaseModal = ({children, handleClick, header, isBack, backPath, title, footer, isFade}) => {

	useEffect(() => {
		const scrollY = window.scrollY;
	
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.left = "0";
		document.body.style.right = "0";
		document.body.style.width = "100%";
		document.body.style.overflow = "hidden";
	
		return () => {
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.left = "";
			document.body.style.right = "";
			document.body.style.width = "";
			document.body.style.overflow = "";
	
			window.scrollTo(0, scrollY);
		};
	}, []);

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