import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./Login.css";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import LoginDesktop from "./LoginDesktop";
import useIsDesktop from "../../hooks/useIsDesktop";
import LoginTablet from "./LoginTablet";
import BackButton from "../../components/Buttons/BackButton";

const Login = () => {
  const navigate = useNavigate();
	const isDesktopHorizontal = useIsDesktopHorizontal();
	const isDesktop = useIsDesktop();


	return(
		<div className="login-container">
			{!isDesktopHorizontal && !isDesktop && (
				<>
					{/* BG GRADIENT  */}
					<div className="bg-gradient-container">
						<div className="circ circ1"></div>
						<div className="circ circ2"></div>
					</div>

					{/* BACK BUTTON  */}
					<div className="back-button-signin-container" onClick={() => navigate("/")}>
						<div className="back-button">
							<i className="fa-solid fa-angle-left"></i>
						</div>

						<span>Back</span>
					</div>

					{/* TITLE */}
					<div className="login-title">
						<h1 className="main-title"></h1>
					</div>
					
					{/* AUTH FORM  */}
					<AuthForm 
						type="login"
					/>
				</>
			)}

			{isDesktop && !isDesktopHorizontal && (
				<>
					<div className="bg-gradient-container">
						<div className="circ circ1"></div>
						<div className="circ circ2"></div>
					</div>

					<div className="login-back">
						<BackButton color={"white"} handleClick={() => navigate("/")}/>
					</div>
					
					<LoginTablet />
				</>
				
			)}
			
			{isDesktopHorizontal && (
				<LoginDesktop />
			)}
		</div>
	)
}

export default Login;