import { AnimatePresence, motion } from "framer-motion";
import PageHeader from "../../../components/PageHeader/PageHeader";
import "./GenerateMeals.css";
import useIsDesktopHorizontal from "../../../hooks/useIsDesktopHorizontal";
import { useEffect, useState } from "react";
import GenerateButtonDesktop from "./components/GenerateButtonsDesktop";
import Button from "../../../components/Buttons/Button";
import { useMealContext } from "../../../context/MealContext";
import GenerateSidebar from "./components/GenerateSidebar";
import { async } from "@firebase/util";
import { containerVariants, itemVariants } from "../../../animations/motionVariants";
import GenerateModal from "./components/GenerateModal";
import { usePantryContext } from "../../../context/PantryContext";
import NoPantryModal from "./components/NoPantryModal";

const GenerateMeals = () => {
	const isDesktopHorizontal = useIsDesktopHorizontal();
	const [modalOpen, setModalOpen] = useState(false);
	const [isSelected, setIsSelected] = useState("");
	const [activeType, setActiveType] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [noPantryModal, setNoPantryModal] = useState(false)

	const {pantryRecipe, generatePantryRecipe, randomRecipe, generateRandomRecipe} = useMealContext();

	const { pantryData } = usePantryContext();

	useEffect(() => {
		if (!showError) return;

		const timer = setTimeout(() => {
			setShowError(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, [showError]);
	
	const handlePantryGen = async () => {
		if(pantryData.length === 0){
			setNoPantryModal(true);
		} else{
			setIsLoading(true)
			setActiveType("pantry")
			setModalOpen(true)
			
			try{
				await generatePantryRecipe()
			} catch (error) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}
	}

	const handleRandomGen = async () => {
		setIsLoading(true)
		setActiveType("random")
		setModalOpen(true)

		try{
			await generateRandomRecipe()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleGenerate = () => {
		if (!isSelected) {
			setShowError(true);
			return;
		}

		if (isSelected === "Pantry Recipe") {
			handlePantryGen();
		} else if (isSelected === "Random Recipe") {
			handleRandomGen();
		}
	};

	

	return(
		<motion.div 
			className="page-container"
			animate={{
				marginRight: modalOpen && isDesktopHorizontal ? "368px" : "0px"
			}}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			<PageHeader 
				title="Generate Meals"
				isBack
				backPath={"/meals"}
			/>

			<motion.div 
				className="gen-meal-body"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.span variants={itemVariants} className="main-bold-title">Select Recipe Type</motion.span>

				{/* GEN MEAL BUTTON  */}
				<motion.div variants={itemVariants}>
					<GenerateButtonDesktop isSelected={isSelected} setIsSelected={setIsSelected} showError={showError} setModal={setModalOpen}/>
				</motion.div>
				

				<motion.div variants={itemVariants} className="gen-btn-container">
					<div className="gen-btn">
						<Button type="tertiary" text="Generate" handleClick={() => handleGenerate()}/>
					</div>
				</motion.div>
			</motion.div>
			
			<AnimatePresence mode="wait">
				{modalOpen && isDesktopHorizontal && (
					<GenerateSidebar 
						key={activeType}
						isSelected={isSelected}
						isLoading={isLoading}
						pantryRecipe={pantryRecipe}
						randomRecipe={randomRecipe}
						activeType={activeType}
						setModal={setModalOpen}
						setIsSelected={setIsSelected}
					/>
				)}

				{modalOpen && !isDesktopHorizontal && (
					<GenerateModal 
						isSelected={isSelected}
						isLoading={isLoading}
						pantryRecipe={pantryRecipe}
						randomRecipe={randomRecipe}
						activeType={activeType}
						setModal={setModalOpen}
						setIsSelected={setIsSelected}
					/>
				)}

				{noPantryModal && (
					<NoPantryModal 
						setModal={setNoPantryModal}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default GenerateMeals;