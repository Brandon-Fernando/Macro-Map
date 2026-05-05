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