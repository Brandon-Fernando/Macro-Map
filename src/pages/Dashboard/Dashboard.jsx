import { useQuiz } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashboardHeader from "./components/DashboardHeader";
import { useAuth } from "../../context/AuthContext";
import LogButton from "./components/LogButton";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../animations/motionVariants";
import CaloriesDashboard from "../../components/NutrientInfo/Dashboard/CaloriesDashboard";
import { useLogContext } from "../../context/LogContext";
import NutrientDashboard from "../../components/NutrientInfo/Dashboard/NutientDashboard";
import DailyProgress from "./components/DailyProgress";
import NutrientInfo from "../../components/NutrientInfo/NutrientInfo";
import MealPrepDashboard from "./components/MealPrepDashboard";
import useIsDesktop from "../../hooks/useIsDesktop";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import SideBar from "../../components/Modal/SideBar/SideBar";
import SidebarMealPrep from "./components/SidebarMealPrep";
import Button from "../../components/Buttons/Button";
import WeeklyProgress from "./components/WeeklyProgress";
import QuickActions from "./components/QuickActions";

const Dashboard = () => {
	const {fetchLatestQuiz, quizData} = useQuiz();
	const navigate = useNavigate();
	const { currentUser } = useAuth();
	const {macroTotals, logFoodData} = useLogContext();
	const isDesktop = useIsDesktop();
	const isDesktopHorizontal = useIsDesktopHorizontal();

	useEffect(() => {
		const checkQuizData = async () => {
			try {
				// Fetch the latest quiz data
				const latestData = await fetchLatestQuiz();
				
				// Check if data exists
				if (!latestData) {
					console.log("No quiz data found, redirecting...");
					navigate("/Quiz");
				} 
			} catch (error) {
				console.error("Error fetching quiz:", error);
				navigate("/Quiz");
			}
		};

		checkQuizData();
	}, []); 

  return(
		<>
			<motion.div 
				className="page-container"
				animate={{
					marginRight: isDesktopHorizontal ? "386px" : "0px"
					// marginLeft: isDesktop ? "128px" : "0px"
				}}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			>
				{/* ===== DASHBOARD HEADER ===== */}
				<DashboardHeader 
					name={currentUser?.displayName}
					isDesktop={isDesktop}
				/>

				{/* ===== DASHBOARD BODY ===== */}
				<motion.div 
					className="dashboard-body"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* WEEKLY PROGRESS  */}
					{/* <motion.div variants={itemVariants}>
						<WeeklyProgress />
					</motion.div> */}

					{/* DAILY PROGRESS  */}
					<motion.div variants={itemVariants}>
						<DailyProgress />
					</motion.div>

					{/* QUICK ACTIONS  */}
					<motion.span variants={itemVariants} className="main-bold-subtitle">Quick Actions</motion.span>

					<motion.div variants={itemVariants} className="quick-actions-fade-wrap">
						<div className="quick-actions-bleed">
							<QuickActions />
						</div>
					</motion.div>

					{/* LOG FOOD  */}
					<motion.span variants={itemVariants} className="main-bold-subtitle">Macronutrient Totals</motion.span>

					<motion.div variants={itemVariants}>
						<LogButton />
					</motion.div>
					
					{/* MEAL PREP  */}
					{!isDesktopHorizontal && (
						<motion.span className="main-bold-subtitle">Curent Meal Plan</motion.span>
					)}
					
					<motion.div variants={itemVariants}>
						<AnimatePresence mode="wait">
							{!isDesktopHorizontal && (
								<motion.div
									key="meal-prep-dashboard"
									// variants={itemVariants}
									// initial="hidden"
									// animate="visible"
									// exit="hidden"
								>
									<MealPrepDashboard />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
					
					
				</motion.div>

				<AnimatePresence>
					{isDesktopHorizontal && (
						<SideBar 
							title={"Meal Prep"} 
							isFooter 
							footer={
								<Button type="tertiary" text="View Meal Prep" handleClick={() => navigate("/meals/prep")}/>
							}
						>
							<SidebarMealPrep />
						</SideBar>
					)}
					
				</AnimatePresence>
			</motion.div>

{/* 
			<div className="dashboard-container-desktop">
				<motion.div 
					className="dashboard-body-desktop"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>	
					<DashboardHeader 
						name={currentUser?.displayName}
						isDesktop
					/>

					<div className="dashboard-content">
						<div className="log-cal-dashboard">
							<motion.div variants={itemVariants}>
								<LogButton />
							</motion.div>
							
							<motion.div variants={itemVariants} className="dash-motion">
								<CaloriesDashboard 
									macros={macroTotals}
									quiz={quizData}
								/>
							</motion.div>
							
						</div>
						
						<motion.div variants={itemVariants} className="dash-motion">
							<NutrientDashboard 
								macros={macroTotals}
								quiz={quizData}
							/>
						</motion.div>
						
					</div>
				</motion.div>
			</div> */}
		</>
	)
}

export default Dashboard;