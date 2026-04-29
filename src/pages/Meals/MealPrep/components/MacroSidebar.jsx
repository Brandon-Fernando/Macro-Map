import { useMealContext } from "../../../../context/MealContext";
import { useQuiz } from "../../../../context/QuizContext";
import ProgressBar from "../../../../components/NutrientInfo/ProgressBar";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../../animations/motionVariants";

const TEMP = [1, 2, 3];
const NUTRI = ["Protein", "Carbs", "Fat"];

const MacroSidebar = ({nutriFacts}) => {
	const { quizData } = useQuiz();
	const percentage = ((nutriFacts?.calories ?? 0 / quizData?.results.calories) * 100).toFixed(1);

  return(
		<motion.div 
			className="macro-sidebar-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* CALORIES PROGRESS CIRLCE */}
			<motion.div variants={itemVariants} className="cal-circ-prog" style={{"--percentage": percentage}}>
				<div className="circ-content">
					<span className="circ-title">Calories</span>
					<span className="circ-val">{nutriFacts?.calories ?? 0}</span>
					<span className="circ-goal">Goal: {quizData?.results.calories}</span>
				</div>
			</motion.div>


			{/* <div className="nutri-container">
				{NUTRI.map((nutri) => {

					return(
						<div 
							key={nutri}
							className="nutri-card card-design"
						>
							<span className="main-bold-title">{nutri}</span>

							<div className="nutri-vals-container">
								<div className="nutri-val-goal">
									<span className="nutri-vals">{nutriFacts?.[nutri.toLowerCase()] ?? 0} g</span>
									<span>Goal: {quizData?.results[nutri.toLowerCase()]}</span>
								</div>

								<ProgressBar 
									size={"large"}
									currentProgress={nutriFacts?.[nutri.toLowerCase()] ?? 0}
									goal={quizData?.results[nutri.toLowerCase()]}
								/>
							</div>
							
						</div>
					)
				})}
			</div> */}

			<div className="nutri-containers">
				{NUTRI.map((nutri) => (
					<motion.div 
						className="nutri-card-val card-design"
						variants={itemVariants}
					>
						<span className="main-reg-title">{nutri}</span>

						<span className="main-bold-title title-nutri">{nutriFacts?.[nutri.toLowerCase()]} g</span>

						<div>
							<span className="main-reg-title">Goal: {quizData?.results[nutri.toLowerCase()]} g</span>

							<ProgressBar 
								size="small"
								currentProgress={nutriFacts?.[nutri.toLowerCase()]}
								goal={quizData?.results[nutri.toLowerCase()]}
							/>
						</div>
					</motion.div>
				))}
			</div>
			
		</motion.div>
	)
}

export default MacroSidebar;