import { useState } from "react";
import "../MacroModal.css";
import axios from "axios";
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../../../animations/motionVariants";

const Servings = ({
	food,
	servings, 
	setServings, 
	handleServingChange, 
	incrementServings, 
	decrementServings
}) => {
	
	return(
		<div className="servings-container">
			{/* SERVINGS TITLE  */}
			<div className="servings-title">
				<span className="main-bold-title">Servings</span>
				<span className="main-reg-subtitle">({food.servingUnit})</span>
			</div>


			<div className="edit-servings">
				<motion.div 
					onClick={() => decrementServings()} 
					className="plus-minus"
					variants={buttonHoverClickVariant}
					whileHover="hover"
					whileTap={"tap"}
				>
					-
				</motion.div>

				<input 
					type="number" 
					className="serving-input"
					value={servings}
					onChange={(e) => {
						let value = e.target.value;

						if(value === ""){
							setServings("")
							return
						}

						if(value.includes(".")){
							const [whole, decimal] = value.split(".")
							if(decimal.length > 1) return;
						}

						const num = Number(value);

						if(!isNaN(num)){
							setServings(Math.max(num, 1));
							handleServingChange(num)
						}
					}}

				/>

				<motion.div 
					onClick={() => incrementServings()} 
					className="plus-minus"
					variants={buttonHoverClickVariant}
					whileHover="hover"
					whileTap="tap"
				>
					+
				</motion.div>
			</div>
		</div>
	)
}

export default Servings