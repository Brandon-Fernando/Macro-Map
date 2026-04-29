import ProgressBar from "../ProgressBar";

const OTHER_NUTRI = ["Protein", "Carbs", "Fat"];

const NutrientDashboard = ({macros, quiz}) => {

  return(
		<div className="nutrient-dashboard-container card-design">
			<div className="cal-title-icon-dash">
				<i className="fa-solid fa-chart-bar"></i>

				<span className="main-reg-title">Nutrition Info</span>
			</div>
			
			<div className="nutri-val-dash-container">
				{OTHER_NUTRI.map((nutri) => (
					<div className="nutri-val-dash">
						<span className="main-bold-title">{nutri}</span>

						<div className="nutri-val-goal-container">
							<span className="main-reg-subtitle">{macros[nutri.toLowerCase()]} / {quiz?.results[nutri.toLowerCase()]} g</span>
						</div>

						<ProgressBar 
							currentProgress={macros[nutri.toLowerCase()]}
							goal={quiz?.results[nutri.toLowerCase()]}
							size="big"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default NutrientDashboard;