import { useState } from "react";
import BaseModal from "../../../components/Modal/BaseModal/BaseModal"
import GenerateButtons from "./components/GenerateButtons";
import { useMealContext } from "../../../context/MealContext";
import LoadSuccess from "../../../components/LoadSuccess/LoadSuccess"
import MealPrepModal from "../MealPrep/components/MealPrepModal";
// import Recipe from "./components/Recipe";
import Recipe from "../../../components/Recipe/Recipe";
import useIsDesktop from "../../../hooks/useIsDesktop";
import GenerateModal from "../../../components/Modal/GenerateModal/GenerateModal";
import Button from "../../../components/Buttons/Button.jsx"
import usePantryAction from "../../Pantry/components/usePantryActions";
import DesktopGenModal from "../../../components/Modal/GenerateModal/DesktopGenModal";


const GenerateMealsModal = ({setModal}) => {
	const [isSelected, setIsSelected] = useState(null);
	const { handleSaveRecipe, loading, isSaving } = usePantryAction(setModal)

	const { isLoading, pantryRecipe, generatePantryRecipe, randomRecipe, generateRandomRecipe} = useMealContext();

	const [view, setView] = useState("generate");
	const [activeType, setActiveType] = useState("");

	const isDesktop = useIsDesktop();



	const handlePantryGen = async () => 	{
		setActiveType("pantry")
		await generatePantryRecipe();
		setView("recipe");
	}

	const handleRandomGen = async () => {
		setActiveType("random");
		await generateRandomRecipe();
		setView("recipe");
	}

	if(isLoading){
		return(
			<BaseModal
				handleClick={() => setModal(false)}
			>
				<LoadSuccess 
					isLoading={isLoading}
					dark
				/>
			</BaseModal>
		)
	}

	if(isSaving) {
		return(
			<BaseModal
				title={isSelected}
				handleClick={() => setModal(false)}
			>
				<div className="load-success-container">
					<LoadSuccess 
						isLoading={loading}
						dark
					/>
				</div>
			</BaseModal>
		)
	}

	if(!loading && view === "recipe") {
		const activeRecipe = 
			activeType === "pantry"
			? pantryRecipe
			: randomRecipe

		return(
			<BaseModal 
				handleClick={() => setModal(false)}
				title={isSelected}
				isBack
				backPath={() => setView("generate")}
				footer={
					<Button type="tertiary" text="Save Recipe" handleClick={() => handleSaveRecipe(activeRecipe)}/>
				}
			>
				<Recipe meal={activeRecipe}/>
			</BaseModal>
		)
	}

	if(isDesktop){

		return(
			<DesktopGenModal handleClick={() => setModal(false)}>
				<div className="generate-modal-body">
					<span className="gen-modal-ttl">Select Recipe Type</span>

					<GenerateButtons 
						setIsSelected={setIsSelected}
						isSelected={isSelected}
					/>
					
					<div className="generate-button-container">
						<Button 
							type={"tertiary"} 
							text="Generate"
							handleClick={() =>
								isSelected === "Pantry Recipe" 
								? handlePantryGen()
								: handleRandomGen()
							}
						/>
					</div>
				</div>
			</DesktopGenModal>
		)
	}



	return(
		<GenerateModal
			handleClick={() => setModal(false)}
		>
			<div className="generate-modal-body">
				<GenerateButtons 
					setIsSelected={setIsSelected}
					isSelected={isSelected}
				/>
				
				<div className="generate-button-container">
					<Button 
						type={"tertiary"} 
						text="Generate"
						handleClick={() =>
							isSelected === "Pantry Recipe" 
							? handlePantryGen()
							: handleRandomGen()
						}
					/>
				</div>
			</div>
		</GenerateModal>
	)
}

export default GenerateMealsModal;