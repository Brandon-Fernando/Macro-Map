import MacroProgress from "./MacroProgress";
import { useQuiz } from "../../../context/QuizContext";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";

const MACROS = ["Calories", "Protein", "Carbs", "Fat"];

const RecipeMacros = ({macros}) => {
	const { quizData } = useQuiz();

	return(
		<motion.div 
			className="recipe-macros-container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"	
		>
			{MACROS.map((macro) => (
				<motion.div
					className="recipe-macro-prog"
					key={macro}
					variants={itemVariants}
				>
					<MacroProgress 
						currentProgress={macros[macro.toLowerCase()]}
						goal={quizData?.results[macro.toLowerCase()]}
						title={macro}
					/>
				</motion.div>
			))}
		</motion.div>
	)
}

export default RecipeMacros;