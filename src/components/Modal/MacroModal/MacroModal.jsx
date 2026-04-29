import "./MacroModal.css";
import Servings from "./components/Servings";
import MacroCards from "./components/MacroCards";
import Button from "../../Buttons/Button";
import useEditServings from "./useEditServings";
import usePantryAction from "../../../pages/Pantry/components/usePantryActions";
import LoadSuccess from "../../LoadSuccess/LoadSuccess";
import { motion } from "framer-motion";
import { 
	containerVariants, 
	itemVariants
} from "../../../animations/motionVariants";
import { useEffect } from "react";

const MacroModal = ({
	showBack, 
	backPath, 
	setModalOpen, 
	isAdd, isUpdate, 
	food, 
	handleButton, 
	isLog, 
	mealType, 
	isLogUpdate, 
	setFinalFood

}) => {
	
	const {
		servings, 
		setServings, 
		updatedMacros, 
		handleServingChange, 
		incrementServings, 
		decrementServings, 
		nutritionalFacts, 
		originalMacros
	} = useEditServings(food)


	useEffect(() => {
		if (setFinalFood) {
			setFinalFood(updatedMacros);
		}
	}, [updatedMacros, setFinalFood]);


	// if(isSaving){
	// 	return(
	// 		<div className="load-success-container">
	// 			<LoadSuccess 
	// 				isLoading={loading}
	// 				loadText={loadingText}
	// 				successText={successText}
	// 				dark
	// 			/>
	// 		</div>
	// 	)
	// }


	return(
		<motion.div 
			className="macro-modal-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* ===== HEADER =====  */}
			{showBack && (
				<div 
					className="back-container"
					onClick={backPath}
				>
					<div className="back-circ">
						<i className="fa-solid fa-angle-left"></i>
					</div>

					<span className="back-label">Back</span>
				</div>
			)}

			{/* TITLE  */}
			<motion.div variants={itemVariants} className="food-name-brand-container">
				<div className="name-brand">
					<span className="main-bold-title">{food.foodName}</span>
					<span className="main-reg-subtitle">{food.brand ? food.brand : "Generic"}</span>
				</div>
			</motion.div>

			{/* SERVINGS  */}
			<motion.div variants={itemVariants}>
				<Servings 
					food={food}
					servings={servings}
					setServings={setServings}
					handleServingChange={handleServingChange}
					incrementServings={incrementServings}
					decrementServings={decrementServings}
				/>
			</motion.div>
			

			{/* MACROS */}
			<motion.div variants={itemVariants} className="motion-container">
				<span className="macro-nutri-facts-title">Nutritional Facts</span>

				<MacroCards 
					nutritionalFacts={nutritionalFacts}
				/>
			</motion.div>
			

			{/* BUTTONS  */}
			{/* <motion.div variants={itemVariants} className="macro-modal-buttons">
				{isAdd && (
					<Button h
						type={"tertiary"}
						text={"Add Food"}
						handleClick={() => handleButton(updatedMacros)}
					/>
				)}
				
				{isUpdate && (
					<div className="macro-modal-update">
						<div className="update">
							<Button 
								type={"tertiary"}
								text={"Update Food"}
								handleClick={
									isLogUpdate 
									? () => handleUpdateLogFood(originalMacros.id, originalMacros, updatedMacros)
									: () => handleUpdateFood(updatedMacros)
								}

							/>
						</div>
						

						<div 
							className="delete" 
							onClick={
								isLogUpdate
								? () => handleDeleteLogFood(food)
								: () => handleDeleteFood(food)
							}
						>
							<i className="fa-solid fa-trash"></i>
						</div>
					</div>
				)}

				{isLog && (
					<Button 
						type={"tertiary"}
						text="Log Food"
						handleClick={() => handleLogFood(updatedMacros, mealType)}
					/>
				)}
				
			</motion.div> */}
		</motion.div>
	)
}

export default MacroModal;


// import "./MacroModal.css";
// import Servings from "./components/Servings";
// import MacroCards from "./components/MacroCards";
// import Button from "../../Buttons/Button";
// import useEditServings from "./useEditServings";
// import usePantryAction from "../../../pages/Pantry/components/usePantryActions";
// import LoadSuccess from "../../LoadSuccess/LoadSuccess";
// import { motion } from "framer-motion";
// import { 
// 	containerVariants, 
// 	itemVariants
// } from "../../../animations/motionVariants";
// const MacroModal = ({
//   food,
//   servings,
//   setServings,
//   handleServingChange,
//   incrementServings,
//   decrementServings,
//   nutritionalFacts,
//   isSaving,
//   loading,
//   loadingText,
//   successText,
//   showBack,
//   backPath
// }) => {
//   if (isSaving) {
//     return (
//       <div className="load-success-container">
//         <LoadSuccess
//           isLoading={loading}
//           loadText={loadingText}
//           successText={successText}
//           dark
//         />
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="macro-modal-container"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {showBack && (
//         <div className="back-container" onClick={backPath}>
//           <div className="back-circ">
//             <i className="fa-solid fa-angle-left"></i>
//           </div>
//           <span className="back-label">Back</span>
//         </div>
//       )}

//       <motion.div variants={itemVariants} className="food-name-brand-container">
//         <div className="name-brand">
//           <span className="main-bold-title">{food.foodName}</span>
//           <span className="main-reg-subtitle">{food.brand ? food.brand : "Generic"}</span>
//         </div>
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <Servings
//           food={food}
//           servings={servings}
//           setServings={setServings}
//           handleServingChange={handleServingChange}
//           incrementServings={incrementServings}
//           decrementServings={decrementServings}
//         />
//       </motion.div>

//       <motion.div variants={itemVariants} className="motion-container">
//         <MacroCards nutritionalFacts={nutritionalFacts} />
//       </motion.div>
//     </motion.div>
//   );
// };

// export default MacroModal;