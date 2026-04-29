import "./Progress.css";
import { motion } from "framer-motion";

const ProgressCalendar = ({percentage, date}) => {
  return(
    <motion.div 
      className="prog-circle-container date" 
      initial={{ "--percentage": 0 }}
      animate={{ "--percentage": percentage }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="circle-text">
        <span className="date">{date}</span>
      </div>
    </motion.div>
  )
}

export default ProgressCalendar;