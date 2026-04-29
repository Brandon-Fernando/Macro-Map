import "./Quiz.css"
import { motion } from "framer-motion"
import { radioInputsVariants } from "../../animations/motionVariants"
import { containerVariants, itemVariants } from "../../animations/motionVariants"

const QuizQuestions = ({question, formState, setFormState}) => {
	const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev, 
      [name]: value,
    }));
  };

	if(question.type === "none"){
		return(
			<motion.div 
				className="quiz-first-page"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.h1 variants={itemVariants} className="quiz-title">{question.label}</motion.h1>

				<div className="quiz-first-body">
					<motion.img variants={itemVariants} src="/Quiz/Quiz.svg" alt="Quiz" />
				</div>
			</motion.div>
		)
	}

	if(question.type === "number"){
		return(
			<div className="quiz-question-container">
				<h3 className="quiz-title">{question.label}</h3>

				<div className="answer-container">
					<input 
						type="number" 
						className="quiz-text-input"
						name={question.name}
						value={formState[question.name]}
						onChange={handleChange}
						placeholder={question.name}
					/>
				</div>
			</div>
		)
	}

	if(question.type === "radio"){
		return(
			<div className="quiz-question-container">
				<h3 className="quiz-title">{question.label}</h3>

				{question.options.map((opt) => (
					<motion.label
						key={opt}
						className={`radio-answers ${formState[question.name] === opt ? "checked" : ""}`}
						variants={radioInputsVariants}
						initial="inactive"
						animate={formState[question.name] === opt ? "active" : "inactive"}
					>
						{opt}
						<input 
							type="radio" 
							name={question.name}
							value={opt}
							checked={formState[question.name] === opt}
							className="radio-inputs"
							onChange={handleChange}
						/>

						<motion.div 
							// onClick={() => handleSelect(meal.id)} 
							// onClick={() => handleLogMeal(meal)}
							className="radio"
							key={opt}
							initial={{ scale: 0 }}
							animate={{
								scale: 1,
								backgroundColor: formState[question.name] === opt ? "#FE9844" : "transparent",
								border: formState[question.name] === opt ? "#FE9844" : "2px solid #CECECE",
								color: formState[question.name] === opt ? "#FFFFFF" : "#FE9844"
							}}
							transition={{ duration: 0.2 }}
						>
							{
							formState[question.name] === opt
								? <i className="fa-solid fa-check"/>
								: ""
							}
						</motion.div>
					</motion.label>
				))}
			</div>
		)
	}

	if(question.type === "height"){
		return(
			<div className="quiz-question-container">
				<h3 className="quiz-title">{question.label}</h3>

				<input 
					type="number" 
					name="Feet"
					placeholder="Feet"
					value={formState.Feet}
					onChange={handleChange}
					className="quiz-text-input"
				/>

				<input 
					type="number" 
					name="Inches"
					placeholder="Inches"
					value={formState.Inches}
					onChange={handleChange}
					className="quiz-text-input"
				/>

			</div>
		)
	}

	return null;
}

export default QuizQuestions;