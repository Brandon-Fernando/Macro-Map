import Icons from "../../../../components/Icons/Icons";
import { motion } from "framer-motion";
import { scaleVariantSmall,generateVariant } from "../../../../animations/motionVariants";


const BUTTONS = [
	{
		title: "Pantry Recipe", 
		subtitle: "Generate a recipe based on what is in your pantry!",
    icon: "/GenerateIcon/Pantry.svg"
	}, 
	{
		title: "Random Recipe", 
		subtitle: "Generate a random recipe that you can try out!",
		icon: "/GenerateIcon/Random.svg"
	}
]

const GenerateButtonDesktop = ({setIsSelected, isSelected, showError, setModal}) => {
  const handleButtonSelect = (title) => {
    if(isSelected === title){
      setIsSelected("")
      setModal(false)
    } else{
      setIsSelected(title)
    }
  }

  return(
    <div className="gen-meal-buttons">
      {BUTTONS.map((button) => (
        <motion.div 
          key={button.title}
          className={`gen-meal-button card-design ${showError ? "error" : ""}`}
          onClick={() => handleButtonSelect(button.title)}
          variants={generateVariant}
          animate={isSelected === button.title ? "active" : "inactive"}
          exit="exit"
          whileHover={isSelected === button.title ? "" : "hover"}
        >
          {/* <Icons size="XL" icon={button.icon}/> */}
          <img src={button.icon} alt={button.label} />

          <span className="main-bold-title">{button.title}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default GenerateButtonDesktop;