import { useNavigate } from "react-router-dom"
import "../Login/Login.css"
import { motion } from "framer-motion";
import { slideFromLeftLong, slideFromRightLong, circleContainer, circleSpring } from "../../animations/motionVariants";
import AuthForm from "../../components/AuthForm/AuthForm";

const SignupDesktop = () => {
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
            <div className="back-btn">
              <i className="fa-solid fa-angle-left"></i>
            </div>

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
          <AuthForm type={"signup"}/>
        </div>
      </motion.div>
    </>
  )
}

export default SignupDesktop;