import "./NutrientInfo.css"

const ProgressBarCircle = ({currentProgress, goal, size}) => {

	const percentage = ((currentProgress / goal) * 100).toFixed(1);

	return(
		<div className={`prog-circ-container ${size}`} style={{ "--percentage": percentage}} />
	)
}

export default ProgressBarCircle;