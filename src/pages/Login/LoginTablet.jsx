import AuthForm from "../../components/AuthForm/AuthForm";
import { motion } from "framer-motion";
import { slideFromBottomShort } from "../../animations/motionVariants";


const LoginTablet = () => {

  return(
    <div className="login-form-tablet-container">
      <motion.div 
        className="forms-tablet"
        variants={slideFromBottomShort}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src="/Logo/Logo.svg" alt="Logo" className="form-logo"/>
        <AuthForm type={"login"}/>
      </motion.div>
    </div>
  )
}

export default LoginTablet;