import { useState } from "react";
import ToggleOptions from "../../../../components/ToggleOptions/ToggleOptions";
import Details from "../../components/Details";
import Ingredients from "../../components/Ingredients";
import Instructions from "../../components/Instructions";
import "../../Meals.css";
import usePantryAction from "../../../Pantry/components/usePantryActions";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";


const OPTIONS = ["Details", "Ingredients", "Instructions"];

const Recipe = ({meal, setModal, isButton}) => {
  const [option, setOption] = useState("Details")

  const { handleSaveRecipe, isSaving, loading, successText, loadingText } = usePantryAction(setModal);

  if(isSaving) {
    return(
      <div className="load-success-container">
        <LoadSuccess 
          isLoading={loading}
          loadText={loadingText}
          successText={successText}
          dark
        />
      </div>
    )
  }

  return(
    <div className="recipe-container">
      <ToggleOptions 
        option={option}
        options={OPTIONS}
        setOption={setOption}
      />

      {option === "Details" && (
        <Details meal={meal} save={handleSaveRecipe} isButton={isButton}/>
      )}

      {option === "Ingredients" && (
        <Ingredients ingredients={meal.ingredients_needed}/>
      )}

      {option === "Instructions" && (
        <Instructions instructions={meal.instructions}/>
      )}
    </div>
  )
}

export default Recipe;