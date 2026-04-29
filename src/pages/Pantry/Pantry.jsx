import "./Pantry.css"
import PageHeader from "../../components/PageHeader/PageHeader";
import Searchbar from "../../components/Searchbar/Searchbar";
import EmptyState from "../../components/EmptyState/EmptyState";
import { usePantryContext } from "../../context/PantryContext";
import PantryList from "./components/PantryList";
import { useState } from "react";
import PantryModal from "./components/PantryModal";
import { AnimatePresence } from "framer-motion";
import usePantryAction from "./components/usePantryActions";
import SideBar from "../../components/Modal/SideBar/SideBar";
import useIsDesktop from "../../hooks/useIsDesktop";
import { motion } from "framer-motion";
import PageHeaderDesktop from "../../components/PageHeader/PageHeaderDesktop";
import PantrySidebar from "./components/PantrySidebar";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";

const Pantry = () => {
	const { pantryData } = usePantryContext();
	const [modalOpen, setModalOpen] = useState(false);
	const [modalType, setModalType] = useState("");
	const [selectedFood, setSelectedFood] = useState();
	const isDesktop = useIsDesktop();
	const isDesktopHorizontal = useIsDesktopHorizontal();

	const handleAddModal = (type) => {
		setModalType(type);
		setModalOpen(true)
	}

	const handleUpdateModal = (food) => {
		setModalType("macro")
		setSelectedFood(food)
		setModalOpen(true)
	}

	return(	
		<div className="page-layout-sidebar">
			<motion.div
				className="page-container"
				animate={{
					marginRight: modalOpen && isDesktopHorizontal ? "386px" : "0px"
				}}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			>
				{isDesktop ? (
					<PageHeaderDesktop 
						title="Pantry"
						isButton 
						handleClick={() => handleAddModal("add")}
						buttonText={"Add Food"}
					/>
				) : (
					<PageHeader 
						title="Pantry"
						isButton
						handleClick={() => handleAddModal("add")}
						buttonText={"Add Food"}
					/>
				)}
				

				{/* <Searchbar /> */}

				{pantryData.length === 0 && (
					<div className="empty-body-main-container">
						<EmptyState 
							icon={"/EmptyState/Pantry.svg"}
							title="Empty Pantry"
							subtitle="Add food to your pantry"
						/>
					</div>
				)}

				{pantryData.length > 0 && (
					<>
						{/* <span className="main-reg-subtitle">Your Pantry</span> */}

			
						<PantryList 
							pantry={pantryData}
							handleUpdateModal={handleUpdateModal}
						/>
					
						
					</>
				)}
				
				<AnimatePresence>
					{modalOpen && !isDesktopHorizontal && (
						<PantryModal 
							setModal={setModalOpen}
							type={modalType}
							selectedFoods={selectedFood}
						/>
					)}
				</AnimatePresence>
				

			</motion.div>
			
			<AnimatePresence mode="wait">
				{modalOpen && isDesktopHorizontal && (
					<PantrySidebar
						key={`${modalType}-${selectedFood?.id || "none"}`}
						setModal={setModalOpen}
						type={modalType}
						selectedFoods={selectedFood}
					/>
				)}
			</AnimatePresence>
			
			
			
		</div>
	)
}

export default Pantry;