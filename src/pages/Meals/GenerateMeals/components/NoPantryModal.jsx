import EditModal from "../../../../components/Modal/EditModal/EditModal"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "../../../../animations/motionVariants"
import Button from "../../../../components/Buttons/Button"
import { useNavigate } from "react-router-dom"

const NoPantryModal = ({setModal}) => {
  const navigate = useNavigate();

  return(
    <EditModal
      handleClick={() => setModal(false)}
    >
      <motion.div 
				className="pantry-gen-container"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.img variants={itemVariants} src="/EmptyState/Pantry.svg" alt="Trash" />

				<motion.span variants={itemVariants} className="main-bold-title">No Pantry Items</motion.span>

				<motion.span variants={itemVariants} className="main-reg-subtitle">Add items to pantry to generate meal!</motion.span>

        <div className="pantry-modal-btns">
          <motion.div variants={itemVariants}>
            <Button type={"tertiary"} text="Add Items" handleClick={() => navigate("/pantry")}/>
          </motion.div>
        
          <motion.span onClick={() => setModal(false)} variants={itemVariants} className="cancel-btn">Cancel</motion.span>
        </div>
				
			</motion.div>
    </EditModal>
  )
}

export default NoPantryModal