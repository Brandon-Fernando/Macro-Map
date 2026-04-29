import Button from "../../../components/Buttons/Button";
import Icons from "../../../components/Icons/Icons";
import EditModal from "../../../components/Modal/EditModal/EditModal"
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";

const LogoutModal = ({setModal, logout}) => {

	const handleLogout = async () => {
		console.log("logout button clicked");
		try {
      await logout();        
      navigate("/Home");    
    } catch (error) {
      console.error("Failed to log out:", error);
    }
	}

	return(
		<EditModal
			handleClick={() => setModal(false)}
		>
			<motion.div
				className="logout-container"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants}>
					<Icons size={"L"} icon="fa-solid fa-right-from-bracket"/>
				</motion.div>
				
				
				<div className="logout-titles">
					<motion.span variants={itemVariants} className="main-bold-title">Logout</motion.span>

					<motion.span variants={itemVariants} className="main-reg-subtitle">Are you sure you want to logout?</motion.span>
				</div>
				
				<div className="logout-btns">
					<motion.div onClick={() => handleLogout()} variants={itemVariants} className="btn-logout">
						<Button type={"tertiary"} text="Logout" />
					</motion.div>

					<motion.span variants={itemVariants} onClick={() => setModal(false)} className="cancel-btn">Cancel</motion.span>
				</div>
			</motion.div>
		</EditModal>
	)
}

export default LogoutModal;