import { motion } from "framer-motion";
import { slideFromLeftLong, slideFromRightLong, buttonHoverClickVariant } from "../../animations/motionVariants";
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
        <div className={`bg-sidebar-container`}>
          <div className="circle circle-one"></div>
          <div className="circle circle-two"></div>
        </div>

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

          <span className="sidebar-main-title">MACRO MAP</span>
        </div>
      </motion.div>

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