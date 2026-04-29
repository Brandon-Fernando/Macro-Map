import { useQuiz } from "../../../../context/QuizContext";

// const MACROS = [
// 	{label: "Protein", icon: "/NutriIcons/Protein-White.svg"}, 
// 	{label: "Carbs", icon: "/NutriIcons/Carbs-White.svg"}, 
// 	{label: "Fat", icon: "/NutriIcons/Fat-White.svg"}
// ]

const MACROS = ["Protein", "Carbs", "Fat"];

const QuizResultsMacros = () => {
	const { quizData } = useQuiz();
	const results = quizData?.results;

	return(
		<div className="quiz-macros-container card-design">
			{/* ICON AND TITLE  */}
			<div className="q-icon-title">
				<div className="q-icon">
					<i className="fa-solid fa-chart-simple"></i>
				</div>

				<span className="main-bold-title">Nutrition Goals</span>
			</div>

			{/* CALORIES  */}
			<div className="q-cal-container">
				<span className="main-reg-subtitle">Calories</span>
				<span className="q-cal-val">{results.calories}</span>
			</div>

			{/* PROTEIN, CARBS, FAT  */}
			<div className="q-nutri-container">
				{MACROS.map((macro) => (
					<div
						className="q-nutri-card"
					>
						<span className="main-reg-subtitle">{macro}</span>
						<span className="main-bold-title q-nutri-val">{results[macro.toLowerCase()]} g</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default QuizResultsMacros;