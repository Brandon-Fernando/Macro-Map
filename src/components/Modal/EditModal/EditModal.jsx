import { motion } from "framer-motion"
import { modalFade, modalSpring } from "../../../animations/motionVariants"
import "./EditModal.css"
import { useEffect } from "react"

const EditModal = ({handleClick, children}) => {
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