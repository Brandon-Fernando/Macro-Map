import { motion } from "framer-motion";
import { modalFade, modalSpring } from "../../../animations/motionVariants";
"./GenerateModal.css";

const DesktopGenModal = ({handleClick, children}) => {

  return(
    <>
      <motion.div
        className="backdrop"
        onClick={handleClick}
        variants={modalFade}
        initial="hidden"
        animate="visible"
        exit="exit"
      />

      <motion.div
        className="desk-gen-wrapper"
        onClick={handleClick}
        variants={modalFade}
        initial="hidden"
        animate="visible"
        exit="exit"
      > 
        <div onClick={handleClick} className="close-bttn">
          <i className="fa-solid fa-x"></i>
        </div>

        <div className="desk-gen-modal-body" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </motion.div>
    </>
  )
}

export default DesktopGenModal;