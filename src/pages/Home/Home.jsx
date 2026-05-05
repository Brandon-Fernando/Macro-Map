import "./Home.css"
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, circleContainer, circleSpring } from "../../animations/motionVariants";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import HomeDesktop from "./components/HomeDesktop";

const Home = () => {
	const navigate = useNavigate();
	const isDesktopHorizontal = useIsDesktopHorizontal();

  return(
		<div className="container">
			{!isDesktopHorizontal && (
				// <div className="">
				<>
	
				{/* <div className="bg-gradient-container">
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
				</motion.div> */}
					<div className="gradient-bg-container">
						<span className="welcome">Welcome to Macro Map</span>

						<motion.div 
							className="circle-gradient"
							variants={circleContainer}
							initial="hidden"
							animate="show"
						>
							<motion.div variants={circleSpring} className="outer-circle"/>

							<motion.div variants={circleSpring} className="middle-circle"/>

							<motion.div variants={circleSpring} className="center-circle">
								<img src="/Logo/M.svg" alt="M" />
							</motion.div>
							
							
						</motion.div>
					</div>

					<motion.div 
						className="home-button"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>	
						<motion.div variants={itemVariants} className="sign-in-home">
							<Button type={"tertiary"} text={"Create An Account"} handleClick={() => navigate("/Signup")}/>
						</motion.div>
						

						{/* <motion.span onClick={() => navigate("/Signup")} variants={itemVariants} className="sign-up">Sign Up</motion.span> */}
						<motion.div variants={itemVariants} className="sign-in-home">
							<Button type={"primary"} text={"Sign In"} handleClick={() => navigate("/Login")}/>
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