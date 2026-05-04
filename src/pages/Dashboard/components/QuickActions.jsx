import Icons from "../../../components/Icons/Icons";
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../../animations/motionVariants";
import { useNavigate } from "react-router-dom";

const ACTIONS = [
  { label: "Log Meals", icon: "fa-solid fa-chart-pie", path: "/meals/log"}, 
  { label: "Meal Prep", icon: "fa-solid fa-calendar-days", path: "/meals/prep"}, 
  { label: "Generate Meals", icon: "fa-solid fa-shuffle", path: "/meals/generate"}, 
  { label: "Saved Meals", icon: "fa-solid fa-bookmark", path: "/meals/saved"}
]

const QuickActions = () => {
  const navigate = useNavigate();
  
  return(
    <div className="quick-actions-container">
      {ACTIONS.map((action) => (
        <motion.div 
          className="quick-action"
          key={action.label}
          variants={buttonHoverClickVariant}
          whileHover={"hover"}
          whileTap={"tap"}
          onClick={() => navigate(action.path)}
        >
          <Icons size={"M"} icon={action.icon}/>
          
          <span className="main-bold-title">{action.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default QuickActions;