import Button from "../../../../components/Buttons/Button";
import SideBar from "../../../../components/Modal/SideBar/SideBar";
import Recipe from "../../../../components/Recipe/Recipe";
import usePantryAction from "../../../Pantry/components/usePantryActions";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";
import { OrbitProgress } from "react-loading-indicators";

const GenerateSidebar = ({isSelected, isLoading, pantryRecipe, randomRecipe, activeType, setModal, setIsSelected}) => {
  const {handleSaveRecipe, loading, isSaving} = usePantryAction(setModal);

  const activeRecipe = 
    activeType === "pantry"
    ? pantryRecipe 
    : randomRecipe

  const footer = 
    <Button text={"Save Recipe"} type="tertiary" handleClick={() => {
      handleSaveRecipe(activeRecipe)
      setIsSelected("")
    }}/>


  if(isLoading){
    return(
      <SideBar
        title={isSelected}
      >
        <div className="load-success-container">
          <OrbitProgress color="#FE9844" size="large" text="" textColor="" />
				</div>
      </SideBar>
    )
  }    

  if(isSaving){
    return(
      <SideBar
        title={isSelected}
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
      setModal={setModal}
      title={activeRecipe === pantryRecipe ? "Pantry Recipe" : "Random Recipe"}
      footer={footer}
      isFooter={footer}
    >
      <Recipe meal={activeRecipe}/>
    </SideBar>
  )
}

export default GenerateSidebar;