import PageHeader from "../../components/PageHeader/PageHeader";
import MealButtons from "./components/MealButtons";
import MealCalendar from "./components/MealCalendar";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../animations/motionVariants";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GenerateMealsModal from "./GenerateMeals/GenerateMealsModal";
import useIsDesktop from "../../hooks/useIsDesktop";
import PageHeaderDesktop from "../../components/PageHeader/PageHeaderDesktop";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";

const Meals = () => {
	const location = useLocation();
	const isSubRoute = location.pathname !== "/meals";
	const [openModal, setModalOpen] = useState(false);
	const isDesktop = useIsDesktop();
	const isDesktopHorizontal = useIsDesktopHorizontal

	return(
		<div>
			{!isSubRoute && (
				<motion.div 
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="page-container"
				>

					{isDesktop ? (
						<PageHeaderDesktop title="Meals" />
					) : (
							<PageHeader title="Meals" />
					)}
					

					{/* CALENDAR  */}
					{/* <motion.div variants={itemVariants}>
						<MealCalendar />
					</motion.div> */}
					

					{/* MEAL BUTTONS  */}
					{/* <motion.span variants={itemVariants} className="main-bold-title">Categories</motion.span> */}

					<motion.div className="meal-page-body" variants={itemVariants}>
						
						<MealButtons 
							setModal={setModalOpen}
						/>
					</motion.div>
						
						
				</motion.div>
			)}
			
			<Outlet />

			<AnimatePresence mode="wait">
				{openModal &&(
					<GenerateMealsModal 
						setModal={setModalOpen}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Meals;