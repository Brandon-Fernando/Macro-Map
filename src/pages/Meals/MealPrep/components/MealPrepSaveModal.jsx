import Button from "../../../../components/Buttons/Button";
import SaveModal from "../../../../components/Modal/SaveModal/SaveModal";
import "../MealPrep.css";
import { useMealContext } from "../../../../context/MealContext";
import { useState } from "react";
import usePantryAction from "../../../Pantry/components/usePantryActions";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";
import EditModal from "../../../../components/Modal/EditModal/EditModal";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../../animations/motionVariants";

const MealPrepSaveModal = ({setModal, mealPrep}) => {
	const { handleSaveMealPreps, isSaving, loading } = usePantryAction(setModal);
	const { savedMealPreps, saveMealPrep } = useMealContext();
	const numSaved = Object.keys(savedMealPreps).length;
	const [defaultName, setDefaultName] = useState(`Meal Prep (${numSaved+1})`);
	const [name, setName] = useState("");

	const [temp, setTemp] = useState(false)

	if(isSaving) {
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

	const finalName = name.trim() === "" ? defaultName : name;

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
						<span className="main-reg-subtitle">Save meal prep as:</span>

						<input 
							type="text" 
							className="edit-title"
							placeholder={defaultName}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</motion.div>

					<motion.div variants={itemVariants} className="edit-delete-btns">
						<Button 
							type="tertiary"
							text="Save"
							handleClick={() => handleSaveMealPreps(mealPrep, finalName)}
						/>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</EditModal>
	)
}

export default MealPrepSaveModal;