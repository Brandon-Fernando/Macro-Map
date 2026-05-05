import "./AuthForm.css"
import { motion } from "framer-motion";
import { slideFromBottom, inputHoverClickVariant, containerVariants } from "../../animations/motionVariants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthFormContent from "./components/AuthFormContent";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import useIsDesktop from "../../hooks/useIsDesktop";


const FORM_CONFIG = {
	login: {
		title: "Sign In",
		subtitle: "Welcome back! Please sign in to continue", 
		fields: ["email", "password"], 
		buttonText: "Sign In", 
		redirectText: "Don't have an account?", 
		redirectLink: "Sign Up", 
		redirectTo: "/signup"
	}, 

	signup: {
		title: "Sign Up", 
		subtitle: "Create your account to get started!", 
		fields: ["firstName", "lastName", "email", "password"], 
		buttonText: "Sign Up", 
		redirectText: "Already have an account?", 
		redirectLink: "Sign In", 
		redirectTo: "/login"
	}
}



const AuthForm = ({type}) => {
	const config = FORM_CONFIG[type];
	const navigate = useNavigate();
	const { signup, login, signInWithGoogle } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const isDesktopHorizontal = useIsDesktopHorizontal();
	const isDesktop = useIsDesktop();

	const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

	async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (type === "signup") {
        const fullName = `${form.firstName} ${form.lastName}`.trim();
        await signup(form.email, form.password, fullName);
        navigate("/Quiz");
      } else {
        await login(form.email, form.password);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Auth failed:", err);
      alert(err.message);
    }
  };

	const handleGoogleLogIn = async () => {
		try{
			const result = await signInWithGoogle();

			const isNewUser = result?._tokenResponse?.isNewUser;

			if (isNewUser) {
				navigate("/Quiz"); 
			} else {
				navigate("/dashboard"); 
			}
		} catch (error) {
			console.error("Error logging in:", error)
		}
	}

	const renderField = ( field ) => {
		const isPassword = field === "password";
	
			return (
				<div
				key={field}
				className={isPassword ? "password-container" : undefined}
			>
				<motion.input
					name={field}
					type={isPassword && !showPassword ? "password" : "text"}
					className={`text-input ${field}`}
					placeholder={
						field === "firstName"
							? "First Name"
							: field === "lastName"
							? "Last Name"
							: field.charAt(0).toUpperCase() + field.slice(1)
					}
					value={form[field]}
					onChange={handleChange}
					required
					variants={inputHoverClickVariant}
					whileHover={"hover"}
					whileFocus={"focus"}
				/>
	
				{isPassword && (
					<div
						className="eye-icon"
						onClick={() => setShowPassword(prev => !prev)}
					>
						<i
							className={`fa-solid ${
								showPassword ? "fa-eye" : "fa-eye-slash"
							}`}
						/>
					</div>
				)}
			</div>
			);
	}

	

  return(
		<>
		{!isDesktopHorizontal && !isDesktop &&(
			// <motion.div
			// 	className="auth-form-container"
			// 	variants={containerVariants}
			// 	initial="hidden"
			// 	animate="visible"
			// >
				<AuthFormContent 
					config={config}
					renderField={renderField}
					handleGoogleLogIn={handleGoogleLogIn}
					handleSubmit={handleSubmit}
					type={type}
				/>
			// </motion.div>
		)}
		
		{isDesktop && (
			<AuthFormContent 
				config={config}
				renderField={renderField}
				handleGoogleLogIn={handleGoogleLogIn}
				handleSubmit={handleSubmit}
				type={type}
			/>
		)}
		</>
	)
}

export default AuthForm;