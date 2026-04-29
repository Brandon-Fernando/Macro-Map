import "../Dashboard.css"
import { motion } from "framer-motion";
import { slideFromTop } from "../../../animations/motionVariants";

const DashboardHeader = ({name, isDesktop}) => {

  return(
    <motion.div 
      className={`dashboard-header-container ${isDesktop ? "desktop" : ""}`}
      variants={slideFromTop}
      initial="hidden"
      animate="visible"
    >
      {/* ===== BACKGROUND GRADIENT ===== */}
      <div className={`bg-dashboard-container ${isDesktop ? "desktop" : ""}`}>
				<div className="circle circOne"></div>
				<div className="circle circTwo"></div>
			</div>

      {/* ===== TITLE =====  */}
      <div className="dashboard-title-subtitle">
        <span className="main-title">Macro Map</span>

        <span>hello {name}</span>
      </div>
      
    </motion.div>
  )
}

export default DashboardHeader;