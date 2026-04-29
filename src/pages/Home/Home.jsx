import "./Home.css"
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../animations/motionVariants";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import HomeDesktop from "./components/HomeDesktop";

const Home = () => {
	const navigate = useNavigate();
	const isDesktopHorizontal = useIsDesktopHorizontal();

  return(
		<div className="container">
			{!isDesktopHorizontal && (
				<>
	
				<div className="bg-gradient-container">
					<div className="circs circ1"></div>
					<div className="circs circ2"></div>
				</div>
			
			
				<motion.div 
					className="home-body-container"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.span variants={itemVariants} className="main-title">Macro Map</motion.span>

					<motion.div variants={itemVariants} className="register-buttons">
						<Button 
							type="primary"
							text="Sign In"
							handleClick={() => navigate("/Login")}
						/>

						<Button 
							type="tertiary"
							text="Sign Up"
							handleClick={() => navigate("/Signup")}
						/>
					</motion.div>
				</motion.div>
				</>
			)}

			{isDesktopHorizontal && (
				<HomeDesktop />
			)}
			
		</div>
	)
}

export default Home;