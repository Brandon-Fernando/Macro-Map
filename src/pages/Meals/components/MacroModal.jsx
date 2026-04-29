import "../Meals.css";
import { useQuiz } from "../../../context/QuizContext";
import Icon from "../../../components/Icon/Icon";

const NUTRI = [
	{label: "Protein", icon: "/NutriIcons/Protein-Dark-Gray.svg"},
	{label: "Carbs", icon: "/NutriIcons/Carbs-Dark-Gray.svg"}, 
	{label: "Fat", icon: "/NutriIcons/Fat-Dark-Gray.svg"}
];

const MacroModal = ({nutritionalFacts}) => {
	return(
		<div className="macro-totals-card-container card-design">
			{/* CALORIES, CARD ICON  */}
			<div className="calories-card-icon">
				<div className="calories-label-cont">
					<span className="calories-value">{nutritionalFacts.calories}</span>
					<span className="calories-label">Calories</span>
				</div>

				<Icon icon={"fa-solid fa-chart-simple"} size={"main"}/>				
			</div>

			{/* OTHER NUTRIENTS  */}
			<div className="nutri-totals-container">
				{NUTRI.map((nutri) => (
					<div className="nutri-totals-card" key={nutri.label}>
						<Icon size={"ML"} icon={nutri.icon} type="img"/>

						<div className="nutri-totals-vals">
							<span className="nutri-totals-val">{nutritionalFacts[nutri.label.toLowerCase()]} g</span>
							<span>{nutri.label}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default MacroModal;