import { motion } from "framer-motion"
import Button from "../../Buttons/Button";
import "./SideBar.css"
import { buttonHoverClickVariant } from "../../../animations/motionVariants";

const SideBar = ({setModal, children, title, isHeader, isFooter, footer, isBack, backPath, isClose}) => {
  return(
		<motion.div 
			className="sidebar"
			initial={{x:400}}
			animate={{x:0}}
			exit={{x:400}}
			transition={{duration: 0.5}}
		>

		{/* HEADER  */}
		<div className="sidebar-header">
			{isClose && (
				<motion.div 
					onClick={() => setModal(false)} 
					className="sidebar-close sb-btn"
					variants={buttonHoverClickVariant}
					whileHover={"hover"}
					whileTap="tap"
				>
					<i className="fa-solid fa-x"></i>
				</motion.div>
			)}

			<span className="sidebar-title">{title}</span>

			{isBack && (
				<motion.div 
					onClick={backPath} 
					className="sidebar-back sb-btn"
					variants={buttonHoverClickVariant}
					whileHover="hover"
					whileTap="tap"
				>
					<i className="fa-solid fa-angle-left"></i>
				</motion.div>
			)}
		</div>

		{/* BODY  */}
		<div className={`sidebar-body ${isFooter ? "footer-margin" : ""}`}>
			<div className="sidebar-children">
				{children}
			</div>
			<div className="fade-top"/>
			<div className="fade-bottom"/>
		</div>

		{/* FOOTER  */}
		{isFooter && (
			<div className="sidebar-footer">
				{footer}
			</div>
		)} 
		

			{/* {isHeader && (
				<div className="sidebar-header">
					<span className="main-bold-subtitle">{title}</span>

					<div className="x-circ">
						<i onClick={() => setModal(false)} className="fa-solid fa-x"></i>
					</div>
				</div>
			)}
			

			<div className="sidebar-children">
				{children}
				<div className="fade-bottom"></div>
			</div>
			 */}


		</motion.div>
	)
}

export default SideBar;