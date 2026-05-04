import ProgressBar from "../../../NutrientInfo/ProgressBar"
import ProgressBarCircle from "../../../NutrientInfo/ProgressBarCircle"
import "../MacroModal.css"
import { useQuiz } from "../../../../context/QuizContext"
import Icon from "../../../Icon/Icon"
import useIsDesktop from "../../../../hooks/useIsDesktop"
import ProgressCircle from "../../../Progress/ProgressCircle"

const NUTRI = [
	{label: "Protein", icon: "/Macros/Protein.svg"}, 
	{label: "Carbs", icon: "/Macros/Carbs.svg"}, 
	{label: "Fat", icon: "/Macros/Fat.svg"}
]

const MacroCards = ({nutritionalFacts, isLogModal}) => {
	const { quizData} = useQuiz();
	const isDesktop = useIsDesktop();

	return(
		<div className="macro-cards-container">
			{/* CALORIES  */}
			<div className="cal-card card-design">
				<div className="cal-card-l">
					<span className="main-reg-title">Calories</span>

					<div className="cal-card-icon-val">
						<Icon icon={"/Macros/Calories.svg"} size="L" type={"img"}/>

						<div className="cal-card-val-unit">
							<span className="cal-val">
								{
									isLogModal
									? nutritionalFacts.calories
									: nutritionalFacts[0].value
								}
							</span>

							<span className="kcals">kcal</span>
						</div>
					</div>
				</div>

				<ProgressCircle 
					currentProgress={
						isLogModal
						? nutritionalFacts.calories
						: nutritionalFacts[0].value
					} 
					goal={quizData?.results["calories"]} 
					title={quizData?.results["calories"]} 
					subtitle={"Goal"}
				/>
			</div>

			{/* PROTEIN, CARBS, AND FAT  */}
			<div className="nutri-cards">
				{NUTRI.map((nutrient) => {
					const macroVal = !isLogModal ? nutritionalFacts.find(m => m.label === nutrient.label) : "";
					// const goal = Number(quizData?.results[nutrient.label.toLowerCase()].replace("g", "").trim())
					const goal = quizData?.results[nutrient.label.toLowerCase()]

					return(
						<div className="nutri-crd card-design" key={nutrient.label}>

							{/* TITLE  */}
							<span className="main-reg-subtitle nutri-ttl">{nutrient.label}</span>

							<div className="nutri-icon-val">
								<Icon icon={nutrient.icon} size="M" type="img"/>

								<div className="cal-card-val-unit">
									<span className="nutri-val">
										{
											isLogModal 
											? nutritionalFacts[nutrient.label.toLowerCase()] 
											: macroVal.value
											} {"g"}
										
									</span>

									<span className="nutri-goals">{quizData?.results[nutrient.label.toLowerCase()]} g</span>
								</div>
							</div>
							
							<ProgressBar 
									currentProgress={
									isLogModal 
									? nutritionalFacts[nutrient.label.toLowerCase()] 
									: macroVal.value
									} 
									goal={goal}
									size={isDesktop ? "big" : "small"}
								/>
						</div>
					)
				})}
			</div>

		</div>
	)
}

export default MacroCards;