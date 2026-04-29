import { useNavigate } from "react-router-dom"
import "../Login/Login.css"
import { motion } from "framer-motion";
import { slideFromLeftLong, slideFromRightLong } from "../../animations/motionVariants";
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
        <div className={`bg-sidebar-container`}>
          <div className="circle circle-one"></div>
          <div className="circle circle-two"></div>
        </div>

        <div className="back-title-sidebar">
          <div onClick={() => navigate("/")} className="back-btn-sidebar">
            <div className="back-btn">
              <i className="fa-solid fa-angle-left"></i>
            </div>

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
          <AuthForm type={"signup"}/>
        </div>
      </motion.div>
    </>
  )
}

export default SignupDesktop;