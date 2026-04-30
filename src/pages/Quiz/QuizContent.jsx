import { useState } from "react";
import Button from "../../components/Buttons/Button";
import QuizQuestions from "./QuizQuestions";
import { motion, AnimatePresence } from "framer-motion";
import { slideFromBottom, containerVariants, itemVariants } from "../../animations/motionVariants";
import { springVariant } from "../../animations/motionVariants";
import { calculateCaloriesAndMacros } from "./utils/quizUtils";
import { useNavigate } from "react-router-dom";
import LoadSuccess from "../../components/LoadSuccess/LoadSuccess";
import { useQuiz } from "../../context/QuizContext";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import Icons from "../../components/Icons/Icons";

const MACROS = [
	{ label: "Calories", icon: "fa-solid fa-fire"}, 
	{ label: "Protein", icon: "fa-solid fa-drumstick-bite"}, 
	{ label: "Carbs", icon: "fa-solid fa-wheat-awn"}, 
	{ label: "Fat", icon: "fa-solid fa-droplet"}
]

const questions = [
	{ name: "Title", label: "A few quick questions before we start!", type: "none"},
	{ name: "Age", label: "What is your age?", type: "number" },
	{ name: "Gender", label: "What is your gender?", type: "radio", options: ["Male", "Female"] },
	{ name: "Weight", label: "What is your weight (lbs)?", type: "number" },
	{ name: "Height", label: "What is your height?", type: "height" },
	{
		name: "ActivityLevel",
		label: "How active are you?",
		type: "radio",
		options: ["Sedentary", "Lightly", "Moderate", "Very", "Extra"],
	},
	{
		name: "Goal",
		label: "What’s your goal?",
		type: "radio",
		options: ["Lose", "Maintain", "Gain"],
	},
];

const initialQuizFormState = {
	Age: "", 
	Gender: "Male", 
	Weight: "", 
	Feet: "",
	Inches: "", 
	ActivityLevel: "Sedentary", 
	Goal: "Maintain"
};

const QuizContent = () => {
	const isDesktopHorizontal = useIsDesktopHorizontal();
	const [quizFormState, setQuizFormState] = useState(initialQuizFormState);
	const [step, setStep] = useState(isDesktopHorizontal ? 1 : 0);
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const { saveQuiz, quizData } = useQuiz();
	const navigate = useNavigate()

	const handleNext = () => {
		const currentQuestion = questions[step];

		if( currentQuestion.type !== "none"){
			const fieldName = currentQuestion.name;

			if(fieldName === "Height"){
				if(!quizFormState.Feet || !quizFormState.Inches){
					alert("Please enter your full height.");
					return;
				}
			}

			else if(!quizFormState[fieldName]){
				alert("Please answer the question before continuing.");
				return;
			}
		}

		if(step < questions.length - 1) setStep(step + 1);
	}

	const handleBack = () => {
		setStep(step - 1);
	}

	async function handleSubmit(e) {
		setIsLoading(true)
		setIsSaving(true);
		
		try{
			e.preventDefault();
			const results = calculateCaloriesAndMacros(quizFormState);
			await saveQuiz({ ...quizFormState, results});
			setIsLoading(false)
		} catch (error) {
			console.error("Error submitting quiz:", error);
		}
		

	}
	
	const currentQ = questions[step];

	if(isSaving){
		return(
			isLoading ? (
				<div className="quiz-content-container">
					<img src="/Logo/Logo.svg" alt="Logo" className="main-logo"/>

					<LoadSuccess 
						isLoading={isLoading}
						isQuiz
						dark
						// path="/dashboard"
					/>
				</div>
			) : (
				<motion.div 
					className="quiz-content-container"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.img variants={itemVariants} src="/Logo/Logo.svg" alt="Logo" className="main-logo"/>

					<div className="macro-map-container">
						<motion.span variants={itemVariants} className="quiz-title">Your Macro Map</motion.span>

						<div className="macro-map">
							{MACROS.map((macro) => (
								<motion.div 
									className="map-card"
									key={macro.label}
									variants={itemVariants}
								>
									<Icons size={"M"} icon={macro.icon}/>

									<span className="main-reg-title">{macro.label}</span>

									<span className="main-bold-title-map">{quizData?.results[macro.label.toLowerCase()]} {macro.label === "Calories" ? "" : "g"}</span>
								</motion.div>
							))}
						</div>

						
					</div>

					<motion.div variants={itemVariants} className="macro-map-button">
						<Button type={"tertiary"} text="Continue" handleClick={() => navigate("/dashboard")}/>
					</motion.div>
				</motion.div>
			)
		)
	}

	return(
		<div className="quiz-content-container">
			<img src="/Logo/Logo.svg" alt="Logo" className="main-logo" />

			{/* QUES QUESTIONS  */}
			<AnimatePresence mode="wait">
				<motion.div 
					key={step}
					className="quiz-form-wrapper"
					initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
				>
					<form className="quiz-form">
						<QuizQuestions 
							question={currentQ}
							formState={quizFormState}
							setFormState={setQuizFormState}
						/>
					</form>
				</motion.div>
			</AnimatePresence>

			{/* BUTTONS  */}
		 	<div className="quiz-buttons-container">
		 		{currentQ.name !== "Title" && currentQ.name !== "Age" &&(
					<motion.div 
						className="prev-button"
						variants={springVariant}
						initial="hidden"
						animate="visible"
						onClick={() => handleBack()}
					>
						<i className="fa-solid fa-angle-left"></i>
					</motion.div>
				)}

				<motion.div 
					className="continue-buttons"
					layout
					transition={{duration: 0.25}}
				>
					{currentQ.name === "Goal" ? (
						<Button 
							type="tertiary"
							text="Submit"
							handleClick={handleSubmit}
						/>
					) : (
						<Button 
							type="tertiary"
							text="Continue"
							handleClick={() => handleNext()}
						/>
					)}
					
				</motion.div>
				
			</div>
		</div>
	)
}

export default QuizContent;
