import QuizContent from "./QuizContent";
import "./Quiz.css"
import { useNavigate } from "react-router-dom";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import QuizPageDesktop from "./QuizPageDesktop";

const QuizPage = () => {
	const navigate = useNavigate();
	const isDesktopHorizontal = useIsDesktopHorizontal();

  return(
		<>
			{!isDesktopHorizontal && (
				<div className="quiz-container">
					{/* BG GRADIENT  */}
					<div className="bg-gradient-container">
						<div className="circ circ1"></div>
						<div className="circ circ2"></div>
					</div>

					<QuizContent />

				</div>
			)}

			{isDesktopHorizontal && (
				<QuizPageDesktop />
			)}
		</>
	)
}

export default QuizPage;