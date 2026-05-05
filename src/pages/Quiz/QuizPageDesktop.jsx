import "./Quiz.css";
import { motion } from "framer-motion";
import { slideFromLeftLong, slideFromRightLong, circleContainer, circleSpring } from "../../animations/motionVariants";
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
          <span className="sidebar-main-subtitle">A few quick questions before we start!</span>
        </div>
      </motion.div>

      <motion.div
        className="quiz-forms-container"
        variants={slideFromRightLong}
        initial="hidden"
        animate="visible"
      >
        <QuizContent />
      </motion.div>
    </div>
  )
}

export default QuizPageDesktop;