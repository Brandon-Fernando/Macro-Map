import Button from "../../../../components/Buttons/Button";
import SideBar from "../../../../components/Modal/SideBar/SideBar";
import Recipe from "../../../../components/Recipe/Recipe";
import usePantryAction from "../../../Pantry/components/usePantryActions";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";

const MealPrepSidebar = ({setModalOpen, mealType, meal}) => {
	const { handleSaveRecipe, isSaving, loading } = usePantryAction(setModalOpen);

	const footer = 
		<Button type="tertiary" text="Save Recipe" handleClick={() => handleSaveRecipe(meal)}/>

	if(isSaving) {
		return(
			<SideBar 
				setModal={setModalOpen}
				title={mealType}
				footer={footer}
				isClose
			>
				<div className="load-success-container">
					<LoadSuccess 
						isLoading={loading}
						dark
					/>
				</div>
			</SideBar>
		)
	}

	return(
		<SideBar
			setModal={setModalOpen}
			title={mealType}
			footer={footer}
			isFooter={footer}
			isClose
		>
			{/* {!isRecipe && (
				<div className="sidebar-content">
					<span className="main-bold-title">Meal Prep Nutrition Summary</span>

					<MacroSidebar 
						nutriFacts={nutriFacts}
					/>
				</div>
				
			)}
			

			{isRecipe && (
				<div className="recipe-sidebar-container">
					<div className="back-title-sidebar">
						<div onClick={() => setIsRecipe(false)} className="back-orange-container">
							<div className="back-circle">
								<i className="fa-solid fa-angle-left"></i>
							</div>

							<span>Back</span>
						</div>

						<span className="rec-side-title">{mealType}</span>
					</div>
					<Recipe meal={meal} isButton={true}/>
				</div>
				
			)} */}
			<Recipe meal={meal}/>
		</SideBar>
	)
}

export default MealPrepSidebar;