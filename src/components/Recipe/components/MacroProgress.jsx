import { useQuiz } from "../../../context/QuizContext";

const MacroProgress = ({currentProgress, goal, title}) => {

	const percentage = ((currentProgress / goal) * 100).toFixed(1);

	return(
		<div className="macro-prog-container" style={{ "--percentage": percentage}}>
			<div className="macro-prog-vals">
				<span className="macro-prog-val">{currentProgress}  {title !== "Calories" ? "g" : ""}</span>
				<span className="macro-prog-title">{title}</span>
			</div>
			
		</div>
	)
}

export default MacroProgress;