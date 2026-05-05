import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import "../Login/Login.css"
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import SignupDesktop from "./SignupDesktop";
import useIsDesktop from "../../hooks/useIsDesktop";
import BackButton from "../../components/Buttons/BackButton";
import SignupTablet from "./SignupTablet";


const Signup = () => {
  const navigate = useNavigate();
	const isDesktopHorizontal = useIsDesktopHorizontal();
	const isDesktop = useIsDesktop();

	return(
		<div className="login-container">
			{/* MOBILE LAYOUT  */}
			{!isDesktopHorizontal && !isDesktop && (
				<div className="login-wrapper">
					<div className="login-back">
						<BackButton color={"orange"} handleClick={() => navigate("/")}/>
					</div>

					<img src="/Logo/Logo.svg" alt="form-logo" />

					<AuthForm type={"signup"}/>
				</div>
			)}

			{/* TABLET LAYOUT  */}
			{isDesktop && !isDesktopHorizontal && (
				<div className="login-wrapper-tablet">
					<div className="login-back">
						<BackButton color={"white"} handleClick={() => navigate("/")}/>
					</div>

					<SignupTablet />
				</div>
			)}

			{/* DESKTOP LAYOUT  */}
			{isDesktopHorizontal && (
				<SignupDesktop />
			)}
			
		</div>
	)
}

export default Signup;