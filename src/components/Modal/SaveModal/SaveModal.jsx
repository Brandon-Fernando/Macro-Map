import "./SaveModal.css"
import { motion } from "framer-motion"
import { modalFade, modalSpring } from "../../../animations/motionVariants"
import { useEffect } from "react"

const SaveModal = ({handleClick, children}) => {
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