import { useState } from "react";
import Button from "../../../../components/Buttons/Button";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";
import SaveModal from "../../../../components/Modal/SaveModal/SaveModal"
import usePantryAction from "../../../Pantry/components/usePantryActions";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "../../../../animations/motionVariants";
import EditModal from "../../../../components/Modal/EditModal/EditModal";


const EditMealModal = ({setModal, meal}) => {
	const {handleDeleteRecipe, isSaving, loading} = usePantryAction(setModal);

	if(isSaving){
		return(
			<EditModal handleClick={() => setModal(false)}>
				<div className="load-success-container">
					<LoadSuccess 
						isLoading={loading}
						dark
					/>
				</div>
			</EditModal>
		)
	}

	return(
		<EditModal
			handleClick={() => setModal(false)}
		>
			<motion.div 
				className="delete-mp-container"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.img variants={itemVariants} src="/ModalIcons/Trash.svg" alt="Trash" />

				<motion.span variants={itemVariants} className="main-bold-title">Delete Meal</motion.span>

				<motion.span variants={itemVariants} className="main-reg-subtitle">Are you sure you want to delete this meal?</motion.span>

				<motion.div variants={itemVariants} className="dlt-btn">
					<Button type={"tertiary"} text="Delete" handleClick={() => handleDeleteRecipe(meal.id)}/>
				</motion.div>
			
				<motion.span onClick={() => setModal(false)} variants={itemVariants} className="cancel-btn">Cancel</motion.span>
			</motion.div>
		</EditModal>
	)
}

export default EditMealModal;