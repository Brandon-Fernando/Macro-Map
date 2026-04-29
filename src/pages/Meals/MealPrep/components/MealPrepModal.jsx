import BaseModal from "../../../../components/Modal/BaseModal/BaseModal";
// import Recipe from "../../GenerateMeals.jsx/components/Recipe";
import Recipe from "../../../../components/Recipe/Recipe";
import "../MealPrep.css"
import Button from "../../../../components/Buttons/Button.jsx"
import usePantryAction from "../../../Pantry/components/usePantryActions";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";

const MealPrepModal = ({setModal, meal, mealType, isSaved}) => {
	const { handleSaveRecipe, isSaving, loading, successText, loadingText} = usePantryAction(setModal);

	if(isSaving) {
		return(
			<BaseModal
				title={mealType}
				handleClick={() => setModal(false)}
			>
				<div className="load-success-container">
					<LoadSuccess 
						isLoading={loading}
						loadText={loadingText}
						successText={successText}
						dark
					/>
				</div>
			</BaseModal>
		)
	}

	return(
		<BaseModal
			handleClick={() => setModal(false)}
			title={isSaved ? "Saved Meals" : mealType}
			footer={
				isSaved ? 
				null : 
				<Button type="tertiary" text="Save Recipe" handleClick={() => handleSaveRecipe(meal)}/>
			}
			isFade
		>
			{/* <Recipe meal={meal} setModal={setModal} isButton={isSave}/> */}
			
			<Recipe meal={meal}/>
		</BaseModal>
	)
}

export default MealPrepModal;