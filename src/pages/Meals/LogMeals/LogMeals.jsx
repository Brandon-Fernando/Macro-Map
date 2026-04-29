import PageHeader from "../../../components/PageHeader/PageHeader";
import LogCalendar from "./components/LogCalendar";
import LogButtons from "./components/LogButtons";
import NutrientInfo from "../../../components/NutrientInfo/NutrientInfo";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogModal from "./components/LogModal";
import { useLogContext } from "../../../context/LogContext";
import { useQuiz } from "../../../context/QuizContext";
import useIsDesktop from "../../../hooks/useIsDesktop";
import LogSidebar from "./components/LogSidebar";
import NutritionToggle from "../../../components/NutrientInfo/NutritionToggle/NutritionToggle";
import useIsDesktopHorizontal from "../../../hooks/useIsDesktopHorizontal";

const LogMeals = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [mealType, setMealType] = useState("");
	const isDesktop = useIsDesktop();
	const {macroTotals} = useLogContext();
	const {quizData} = useQuiz();
	const isDesktopHorizontal = useIsDesktopHorizontal();
	const [currentView, setCurrentView] = useState("unselected");

	useEffect(() => {
		if (!modalOpen) {
			setMealType("");
		}
	}, [modalOpen]);
  
	return(
		<motion.div
			className="page-container"
			animate={{
				marginRight: isDesktopHorizontal ? "386px" : "0px"
			}}
			transition={{duration: 0.5, ease: "easeInOut"}}
		>
			<PageHeader 
				title="Log Meals"
				isBack
				backPath={"/meals"}
			/>

			<LogCalendar />

			{/* LOG CATEGORIES  */}
			<span className="main-bold-title">Meal Types </span>
			<LogButtons 
				setModalOpen={setModalOpen}
				mealType={mealType}
				setMealType={setMealType}
				modalOpen={modalOpen}
				isDesktop={isDesktop}
				setCurrentView={setCurrentView}
			/>

			{/* LOG TOTALS  */}
			<span className="main-bold-title">Summary</span>
			{/* <NutrientInfo 
				macroTotals={macroTotals}
				quizData={quizData}
				size={modalOpen && isDesktop ? "small" : ""}
			/> */}
			<NutritionToggle macroTotals={macroTotals} quizData={quizData}/>



			<AnimatePresence mode="wait">
				{modalOpen && !isDesktopHorizontal && (
					<LogModal 
						setModalOpen={setModalOpen}
						mealType={mealType}
					/>
				)}

				{isDesktopHorizontal && (
					<LogSidebar 
						key={mealType}
						setModal={setModalOpen}
						mealType={mealType}
						currentView={currentView}
						setCurrentView={setCurrentView}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default LogMeals;