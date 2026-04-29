import Button from "../../../components/Buttons/Button";
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../../animations/motionVariants";

const UserInfo = ({name, email, setLogoutModal}) => {

  return(
		<div className="user-info-container card-design">
			<div className="profile-icon">
				<i className="fa-solid fa-user"></i>
			</div>

			<div className="user-name-email">
				<span className="main-bold-title">{name}</span>

				<span className="main-reg-subtitle">{email}</span>
			</div>
			
			<motion.div 
				className="logout-btn"
				variants={buttonHoverClickVariant}
				whileHover="hover"
				whileTap="tap"
				onClick={() => setLogoutModal(true)}
			>
				{/* <Button 
					type="tertiary"
					text="Logout"
					handleClick={() => setModalOpen(true)}
				/> */}
				<span>Logout</span>

				<i className="fa-solid fa-right-from-bracket"></i>
			</motion.div>
			
		</div>
	)
}

export default UserInfo;