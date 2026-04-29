import "./NutrientInfo.css"
import ProgressBar from "./ProgressBar";
import useIsDesktop from "../../hooks/useIsDesktop";
import Icon from "../Icon/Icon";

const OTHER_NUTRI = ["Protein", "Carbs", "Fat"];

const NutrientInfo = ({macroTotals, quizData, size}) => {
	const isDesktop = useIsDesktop();

	return(
		<div className="nutrient-info-container">
			{/* ===== CALORIES =====  */}
			<div className="nutri-container card-design">
				{/* ICON, LABEL  */}
				<div className="nutri-icon-label">
					<Icon size={"M"} icon="fa-solid fa-fire"/>

					<span className="nutri-label">Calories</span>

					<span className="nutri-label-unit">(kcal)</span>
				</div>

				{/* VALUE  */}
				<div className="nutri-cal">
					<span className="nutri-cal-val">{macroTotals.calories} </span>
					<span className="total-cal-val">/ {quizData?.results.calories}</span>
				</div>

				{/* PROGRESS BAR  */}
				{/* <div className="cal-progress-bar"></div> */}
				<ProgressBar
					currentProgress={macroTotals.calories}
					goal={quizData?.results.calories}
					size={"big"}
				/>
			</div>

			{/* ===== OTHER NUTRIENTS =====  */}
			<div className="nutri-container card-design">
				{/* ICON, LABEL */}
				<div className="nutri-icon-label">
					<Icon size={"M"} icon="fa-solid fa-chart-simple"/>

					<span className="nutri-label">Nutrition Info</span>
				</div>

				{/* VALUES  */}
				<div className={`nutri-val-container ${size}`}>
					{OTHER_NUTRI.map((nutri) => (
						<div className="nutri-val-cards">
							<span className="nutri-val-card-label">{nutri}</span>

							<div className="other-nutri-val">
								<span className="nutri-val-num">{macroTotals[nutri.toLowerCase()]}</span>
								<span className="total-val-num">/ {quizData?.results[nutri.toLowerCase()]} g</span>
							</div>

							<ProgressBar 
								currentProgress={macroTotals[nutri.toLowerCase()]}
								goal={quizData?.results[nutri.toLowerCase()]}
								size={isDesktop ? "big" : "small"}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default NutrientInfo;