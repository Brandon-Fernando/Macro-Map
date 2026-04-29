import { useNavigate } from "react-router-dom";
import Icons from "../../../components/Icons/Icons";
import { useQuiz } from "../../../context/QuizContext";
import { useLogContext } from "../../../context/LogContext";
import ProgressCircle from "../../../components/Progress/ProgressCircle";
import Button from "../../../components/Buttons/Button";

const MACROS = ["Calories", "Protein", "Carbs", "Fat"];

const LogButton = () => {
	const navigate = useNavigate();
	const { macroTotals } = useLogContext();

	const { quizData } = useQuiz();

	return(
		<div className="db-log-card card-design">
			{/* HEADER  */}
			<div className="db-daily-header">
        <Icons size={"S"} icon="fa-solid fa-location-crosshairs"/>

        <span className="main-bold-title">Logged Food Totals</span>
      </div>

			{/* PROGRESS CIRCLES  */}
			<div className="db-log-prog">
				{MACROS.map((macro) => (
					<div
						key={macro}
						className="db-log-val"
					>
						<ProgressCircle 
							size={"SM"}
							title={macroTotals[macro.toLowerCase()]}
							subtitle={macro === "Calories" ? "kcal" : "g"}
							currentProgress={macroTotals[macro.toLowerCase()]}
							goal={quizData?.results[macro.toLowerCase()]}
						/>

						<span className="db-log-val-title">{macro}</span>
					</div>
				))}
			</div>

			<Button text={"Log Meals"} type="tertiary" handleClick={() => navigate("/meals/log")}/>
		</div>
	)
}

export default LogButton;