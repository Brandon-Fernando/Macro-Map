import Icons from "../../../../components/Icons/Icons";
import { useQuiz } from "../../../../context/QuizContext";

const QuizDataList = ({handleClick}) => {
	const { quizData } = useQuiz();

	const USER_SUMMARY = [
		{ name: "Age", label: "Age", value: quizData?.Age, icon: "fa-solid fa-calendar-days", type: "number"},
		{ name: "Gender", label: "Gender", value: quizData?.Gender,  icon: "fa-solid fa-person-half-dress", type: "radio", options: ["Male", "Female"]},
		{ name: "Weight", label: "Weight", value: quizData?.Weight, icon: "fa-solid fa-weight-scale", type: "number"},
		{ name: "Height", label: "Height", value: `${quizData?.Feet}' ${quizData?.Inches}"`, icon: "fa-solid fa-ruler-vertical", type: "height"},
		{ name: "ActivityLevel", label: "Activity Level", value: quizData?.ActivityLevel, icon: "fa-solid fa-person-running", type: "radio", options: ["Sedentary", "Lightly", "Moderate", "Very", "Extra"]},
		{ name: "Goal", label: "Goal", value: quizData?.Goal, icon: "fa-solid fa-medal", type: "radio", options: ["Lose", "Maintain", "Gain"]},
	];

	return(
		<div className="quiz-data-list-container">
			{USER_SUMMARY.map((ans) => (
				<div
					key={ans.label}
					onClick={() => handleClick(ans)}
					className="q-data-card card-design"
				>
					<Icons icon={ans.icon} size="S"/>

					<div className="q-data-q-a">
						<span className="main-bold-subtitle">{ans.label}</span>
						<span className="main-light-subtitle">{ans.value}</span>
					</div>
					
					<div className="edit-btn">
						<i className="fa-solid fa-ellipsis-vertical"></i>
					</div>
				</div>
			))}
		</div>
	)
}

export default QuizDataList;