import { useState } from "react";
import Button from "../../../../components/Buttons/Button";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";
import SaveModal from "../../../../components/Modal/SaveModal/SaveModal";
import usePantryAction from "../../../Pantry/components/usePantryActions";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../../animations/motionVariants";
import EditModal from "../../../../components/Modal/EditModal/EditModal";

const EditMealPrepModal = ({setModal, mealPrep}) => {
	const { handleDeleteSaveMealPreps, loading, isSaving, handleUpdateMealPrepTitle } = usePantryAction(setModal);
	const [isDelete, setIsDelete] = useState(false);
	const [title, setTitle] = useState("");

	const handleUpdate = () => {
		if (!title.trim()) return;
	
		handleUpdateMealPrepTitle(mealPrep.id, title);
	};

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

	if(isDelete) {

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

					<motion.span variants={itemVariants} className="main-bold-title">Delete Meal Prep</motion.span>

					<motion.span variants={itemVariants} className="main-reg-subtitle">Are you sure you want to delete this meal prep?</motion.span>

					<motion.div variants={itemVariants} className="dlt-btn">
						<Button type={"tertiary"} text="Delete" handleClick={() => handleDeleteSaveMealPreps(mealPrep.id)}/>
					</motion.div>
					

					<motion.span onClick={() => setIsDelete(false)} variants={itemVariants} className="cancel-btn">Cancel</motion.span>
				</motion.div>
			</EditModal>
		)
		
	}

	return(
		<EditModal 
			handleClick={() => setModal(false)}
		>
			<AnimatePresence>
				<motion.div 
					className="edit-delete-mp-container"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.img variants={itemVariants} src="/ModalIcons/Edit.svg" alt="Edit" />

					<motion.div variants={itemVariants} className="edit-title-container">
						<span className="main-reg-subtitle">Edit Title</span>

						<input 
							type="text" 
							className="edit-title"
							placeholder={mealPrep.title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</motion.div>

					<motion.div variants={itemVariants} className="edit-delete-btns">
						<div className="update-title-btn">
							<Button 
								type={"tertiary"}
								text="Update"
								handleClick={() => handleUpdate(mealPrep.id, title)}
							/>
						</div>
						
						<div onClick={() => setIsDelete(true)} className="delete-mp-btn">
							<i className="fa-solid fa-trash"></i>
						</div>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</EditModal>
	)
}

export default EditMealPrepModal;