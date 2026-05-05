import { motion } from "framer-motion";
import { slideFromLeftLong, slideFromRightLong, buttonHoverClickVariant, circleContainer, circleSpring } from "../../animations/motionVariants";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthFormContent from "../../components/AuthForm/components/AuthFormContent";
import { useNavigate } from "react-router-dom";

const LoginDesktop = () => {
  const navigate = useNavigate();

  return(
    <>
      {/* GRADIENT SIDEBAR  */}
      <motion.div 
        variants={slideFromLeftLong} 
        initial="hidden"
        animate="visible"
        className="gradient-sidebar-container"
      >
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

        <div className="back-title-sidebar">
          <div onClick={() => navigate("/")} className="back-btn-sidebar">
            <motion.div 
              className="back-btn"
              variants={buttonHoverClickVariant}
              whileHover="hover"
              whileTap="tap"
            >
              <i className="fa-solid fa-angle-left"></i>
            </motion.div>

            <span className="back-txt">Back</span>
          </div>
        </div>
      </motion.div>

      {/* AUTH FORM  */}
      <motion.div
        className="login-forms-container"
        variants={slideFromRightLong}
        initial="hidden"
        animate="visible"
      >
        <div className="forms">
          <img src="/Logo/Logo.svg" alt="Logo" className="form-logo"/>
          <AuthForm type={"login"}/>
        </div>
      </motion.div>
    </>
  )
}

export default LoginDesktop;