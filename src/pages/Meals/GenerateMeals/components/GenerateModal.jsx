import BaseModal from "../../../../components/Modal/BaseModal/BaseModal"
import Button from "../../../../components/Buttons/Button"
import usePantryAction from "../../../Pantry/components/usePantryActions"
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess"
import { OrbitProgress } from "react-loading-indicators"
import Recipe from "../../../../components/Recipe/Recipe"

const GenerateModal = ({isSelected, isLoading, pantryRecipe, randomRecipe, activeType, setModal, setIsSelected}) => {
  const { handleSaveRecipe, loading, isSaving} = usePantryAction(setModal);
  
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
      <BaseModal
        title={activeRecipe === pantryRecipe ? "Pantry Recipe" : "Random Recipe"}
        handleClick={() => setModal(false)}
      >
        <div className="load-success-container">
          <OrbitProgress color="#FE9844" size="large" text="" textColor="" />
				</div>
      </BaseModal>
    )
  }

  if(isSaving){
    return(
      <BaseModal
        title={activeRecipe === pantryRecipe ? "Pantry Recipe" : "Random Recipe"}
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

  return(
    <BaseModal
      title={activeRecipe === pantryRecipe ? "Pantry Recipe" : "Random Recipe"}
      footer={footer}
      handleClick={() => setModal(false)}
    >
      <Recipe meal={activeRecipe}/>
    </BaseModal>
  )
}

export default GenerateModal;