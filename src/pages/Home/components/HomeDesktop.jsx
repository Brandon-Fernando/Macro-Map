import Button from "../../../components/Buttons/Button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";
import { useNavigate } from "react-router-dom";

const INFO = [
  {title: "Track Macros", subtitle: "Log calories and macros in seconds.", icon: "fa-solid fa-chart-bar"}, 
  {title: "Manage Pantry", subtitle: "Keep track of ingredients you already have.", icon: "fa-solid fa-basket-shopping"}, 
  {title: "Generate Meals", subtitle: "Turn what you have into meals that hit your goals.", icon: "fa-solid fa-utensils"}
]


const HomeDesktop = () => {
  const navigate = useNavigate();
  
  return (
    <div className="home-desktop-body-container">
      {/* NAV BAR */}
      <div className="home-navbar">
        <img src="/Logo/Logo.svg" alt="Logo" />

        <div className="home-desktop-buttons">
          <Button type={"primary"} text="Sign In" handleClick={() => navigate("/Login")}/>
          <Button type={"tertiary"} text="Sign Up" handleClick={() => navigate("/Signup")}/>
        </div>
      </div>

      {/* HERO BODY  */}
      <motion.div 
        className="hero-body"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HERO TITLE  */}
        <motion.div variants={itemVariants} className="hero-text">
          <div className={`bg-dashboard-container`}>
            <div className="circle circ-one"></div>
            <div className="circle circ-two"></div>
          </div>

          <div className="hero-titles">
            <span className="hero-title">FROM PANTRY TO PROGRESS</span>

            <span className="hero-subtitle">Track your macros, manage your ingredients, and create meals that keep you on track.</span>
          </div>
         
        </motion.div>

        {/* HERO INFO  */}
        <motion.div variants={itemVariants} className="hero-info">
          <motion.div 
            className="hero-info-cards"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {INFO.map((info) => (
              <motion.div variants={itemVariants} className="hero-info-card">
                <div className="hero-info-icon">
                  <i className={info.icon}></i>
                </div>
                <span className="info-title">{info.title}</span>
                <span className="info-subtitle">{info.subtitle}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      
    </div>
  )
}

export default HomeDesktop;