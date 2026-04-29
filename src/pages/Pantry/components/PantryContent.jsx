import FoodSearch from "./FoodSearch";
import MacroModal from "../../../components/Modal/MacroModal/MacroModal";
import Button from "../../../components/Buttons/Button";
import { useState } from "react";
import usePantryAction from "./usePantryActions";
import { motion } from "framer-motion";
import { buttonHoverClickVariant } from "../../../animations/motionVariants";

const PantryContent = ({
  setModal,
  type,
  setType,
  selectedFood,
  mealType,
  isSidebar = false,
  setIsHeader,
  setShowBack,
}) => {
  const [finalFood, setFinalFood] = useState();
  const [searchFooter, setSearchFooter] = useState(false);

  const {
    handleAddFood,
    handleDeleteFood,
    handleUpdateFood,
    isSaving,
    loading,
    showNutrients,
    setShowNutrients,
    handleSearch,
    getNutrition,
    query,
    setQuery,
    results,
    selectedFood: searchedFood,
  } = usePantryAction(setModal);

  const footer =
    type === "add" ? (
      searchFooter && (
        <Button
          type="tertiary"
          text="Add Food"
          handleClick={() => handleAddFood(finalFood)}
        />
      )
    ) : (
      <div className="modal-footer-update">
        <div className="modal-update">
          <Button
            type="tertiary"
            text="Update Food"
            handleClick={() => handleUpdateFood(finalFood)}
          />
        </div>

        <motion.div
          className="trash"
          onClick={() => handleDeleteFood(selectedFood)}
          variants={buttonHoverClickVariant}
          whileTap="tap"
          whileHover="hover"
        >
          <i className="fa-solid fa-trash"></i>
        </motion.div>
      </div>
    );

  const content = (
    <>
      {type === "add" && (
        <FoodSearch
          setType={setType}
          setModalOpen={setModal}
          setFinalFood={setFinalFood}
          setSearchFooter={setSearchFooter}
          showNutrients={showNutrients}
          setShowNutrients={setShowNutrients}
          handleSearch={handleSearch}
          getNutrition={getNutrition}
          query={query}
          setQuery={setQuery}
          results={results}
          selectedFood={searchedFood}
        />
      )}

      {type === "macro" && (
        <MacroModal
          setModalOpen={setModal}
          isUpdate
          food={selectedFood}
          setFinalFood={setFinalFood}
        />
      )}
    </>
  );

  return {
    content,
    footer,
    isSaving,
    loading,
    showNutrients,
    setShowNutrients,
  };
};

export default PantryContent;