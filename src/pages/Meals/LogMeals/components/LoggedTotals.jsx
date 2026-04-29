import Icon from "../../../../components/Icon/Icon";
import ProgressBarCircle from "../../../../components/NutrientInfo/ProgressBarCircle";
import { useQuiz } from "../../../../context/QuizContext";

const NUTRI = [
	{ label: "Calories", icon: "fa-solid fa-fire"}, 
	{ label: "Protein", icon: "/NutriIcons/Protein-Gray.svg"}, 
	{ label: "Carbs", icon: "/NutriIcons/Carbs-Gray.svg"}, 
	{ label: "Fat", icon: "/NutriIcons/Fat-Gray.svg"}
];

const LoggedTotals = ({nutritionalFacts}) => {
	const { quizData } = useQuiz();

	return(
		<div className="logged-totals-container card-design">
			{/* PROGRESS CIRCLES  */}
			<div className="logged-circs">
				{NUTRI.map((nutri) => {
					const currentProgress = nutritionalFacts[nutri.label.toLowerCase()];
					const goal = quizData?.results[nutri.label.toLowerCase()];

					return(
						<div 
							key={nutri.label}
							className="logged-circ-label"
						>
							<ProgressBarCircle size="S" currentProgress={currentProgress} goal={goal}/>

							<span className="main-reg-subtitle-s">{nutri.label}</span>
						</div>
					)
				})}
			</div>

			{/* PROGRESS VALUES  */}
			<div className="logged-vals">
				{NUTRI.map((n) => (
					<div 
						className="logged-val-list"
						key={n.label}
					>
						<div className="logged-val-list-icon">
							<Icon 
								size={"M"}
								type={n.label === "Calories" ? "" : "img"}
								icon={n.icon}
							/>

							<span className="main-bold-subtitle">{nutritionalFacts[n.label.toLowerCase()]} g</span>
						</div>
						
						<span className="reg-subtitle">{n.label}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default LoggedTotals;