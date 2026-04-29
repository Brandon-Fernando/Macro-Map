import "./Quiz.css";
import { motion } from "framer-motion";
import { slideFromLeftLong, slideFromRightLong } from "../../animations/motionVariants";
import { useNavigate } from "react-router-dom";
import QuizContent from "./QuizContent";

const QuizPageDesktop = () => {
  const navigate = useNavigate();

  return(
    <div className="quiz-desktop-container">
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
          {/* <div onClick={() => navigate("/")} className="back-btn-sidebar">
            <div className="back-btn">
              <i className="fa-solid fa-angle-left"></i>
            </div>

            <span className="back-txt">Back</span>
          </div> */}
          <span className="sidebar-main-subtitle">A few quick questions before we start!</span>

          <span className="sidebar-main-title">MACRO MAP</span>
        </div>
      </motion.div>

      <motion.div
        className="quiz-forms-container"
        variants={slideFromRightLong}
        initial="hidden"
        animate="visible"
      >
        {/* <div className="quiz-forms"> */}
          {/* <img src="/Logo/Logo.svg" alt="Logo" className="quiz-form-logo"/> */}
          <QuizContent />
        {/* </div> */}
      </motion.div>
    </div>
  )
}

export default QuizPageDesktop;