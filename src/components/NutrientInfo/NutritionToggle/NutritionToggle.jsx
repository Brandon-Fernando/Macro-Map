import { useState } from "react";
import Icon from "../../Icon/Icon";
import "./NutritionToggle.css";
import { AnimatePresence, motion } from "framer-motion";
import { scaleNutri, containerVariants, itemVariants, slideFromLeft } from "../../../animations/motionVariants";
import ProgressBar from "../ProgressBar";

const NUTRI = [
	{label: "Calories", icon: "fa-solid fa-fire", iconSelect: "fa-solid fa-fire", unit: "kcal"},
	{label: "Protein", icon: "/NutriIcons/Protein-Dark-Gray.svg", iconSelect: "/NutriIcons/Protein-White.svg", unit: "grams"}, 
	{label: "Carbs", icon: "/NutriIcons/Carbs-Dark-Gray.svg", iconSelect: "/NutriIcons/Carbs-White.svg", unit: "grams"}, 
	{label: "Fat", icon: "/NutriIcons/Fat-Dark-Gray.svg", iconSelect: "/NutriIcons/Fat-White.svg", unit: "grams"}
];

const NutritionToggle = ({macroTotals, quizData}) => {
	const [selected, setSelected] = useState("Calories");

	const selectedVal = macroTotals[selected.toLowerCase()];
	const selectedGoal = quizData?.results[selected.toLowerCase()]

	const percentage = ((selectedVal / selectedGoal) * 100).toFixed(1);


	return(
		<div className="nutri-toggle-container card-design">
			{/* DISPLAY PROGRESS  */}
			<div className="nutri-prog-display">
				<AnimatePresence mode="wait">
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="nutri-toggle-motion" key={selected}>
						<motion.span variants={slideFromLeft} className="main-reg-title">{selected}</motion.span>

						<motion.div variants={slideFromLeft} className="nutri-prog-goal">
							<span className="selected-val">{selectedVal} </span>

							<span className="selected-goal">/ {selectedGoal}</span>
						</motion.div>
					</motion.div>
				</AnimatePresence>
				
				

				<div className="prog-cont">
					<motion.div 
						className="bar"
						initial={{width: 0}}
						animate={{width: `${percentage}%`}}
						transition={{duration: 0.7, ease: "easeInOut"}}
					/>
				</div>
				{/* <ProgressBar currentProgress={selectedVal} goal={selectedGoal} size="M"/> */}
		
			</div>

			{/* NUTRI TOGGLES  */}
			<div className="nutri-toggle-button-container">
				{NUTRI.map((nutri) => (
					<motion.div 
						variants={scaleNutri}
						className={`nutri-toggle ${selected === nutri.label ? "selected" : ""}`}
						animate={selected === nutri.label ? "active" : "inactive"}
						onClick={() => setSelected(nutri.label)}
						key={nutri.label}
					>
						<span className="main-light-title">{nutri.label}</span>

						{/* ICON VALUES  */}
						<div className="nutri-toggle-val">
							<div className="nutri-toggle-icon">
								{nutri.label === "Calories" ? (
									<i className={nutri.icon}></i>
								) : (
									<img src={nutri.label === selected ? nutri.iconSelect : nutri.icon} alt={nutri.label}/>
								)}
							</div>

							<div className="nutri-val-unit">
								<span className="toggle-val">{macroTotals[nutri.label.toLowerCase()]}</span>
								<span className="toggle-unit">{nutri.unit}</span>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default NutritionToggle;