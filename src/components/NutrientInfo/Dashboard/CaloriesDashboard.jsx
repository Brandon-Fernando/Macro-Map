import "./DashboardNutri.css";

const CaloriesDashboard = ({macros, quiz}) => {
	const progress = ((macros.calories / quiz?.results.calories) * 100).toFixed(1)

	return(
		<div className="calories-dashboard-container card-design">
			<div className="cal-title-icon-dash">
				<i className="fa-solid fa-fire"></i>

				<span className="main-reg-title">Calories</span>

				<span className="main-reg-subtitle kcal">(kcal)</span>
			</div>

			<div className="cal-val-dash-container">
				<div className="cal-val-goal-dash">
					<span className="cal-val-dash">{macros.calories} </span>
					<span className="cal-goal-dash"> / {quiz?.results.calories}</span>
				</div>

				<div className="progress-circle" style={{ "--progress": progress }} />
			</div>
		</div>
	)
}

export default CaloriesDashboard;