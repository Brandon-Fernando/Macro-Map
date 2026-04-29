import { useState } from "react";
import { useMealContext } from "../../../context/MealContext";
import { useQuiz } from "../../../context/QuizContext";
import ProgressCircle from "../../../components/Progress/ProgressCircle";
import EmptyState from "../../../components/EmptyState/EmptyState";

const MACROS = ["Calories", "Protein", "Carbs", "Fat"];

const SidebarMealPrep = () => {
  // const { mealPrep } = useMealContext();
  const { mealPrep } = useMealContext();
  const { quizData } = useQuiz();

  const hasMealPrep = Object.keys(mealPrep).length > 0;

  const getMealType = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 11) return "Breakfast";
    if (hour >= 11 && hour < 16) return "Lunch";
    if (hour >= 16 && hour < 22) return "Dinner";
    return "Snack";
  }

  const defaultMealType = getMealType();
  const [mealType, setMealType] = useState(defaultMealType)
  const currentMeal = mealPrep[mealType.toLowerCase()];


  return(
    <>
      {hasMealPrep && (
        <div className="mp-sb-body">
        
          <div className="mp-sb-name">
            <span className="reg-subtitle">{mealType}</span>
            <span className="main-bold-title">{currentMeal.title}</span>
          </div>

          <div className="mp-sb-macros">
            {MACROS.map((macro) => {
              const currentProgress = currentMeal.macros[macro.toLowerCase()]
              const goal = quizData?.results[macro.toLowerCase()];

              return(
                <div
                  key={macro}
                  className="mp-sb-macro card-design"
                >
                  <div className="mp-sb-macro-label">
                    <span className="main-reg-subtitle">{macro}</span>
                    <span className="main-light-subtitle">{currentProgress} / {goal} {macro === "Calories" ? "kcal" : "g"}</span>
                  </div>

                  <ProgressCircle 
                    size={"S"} 
                    currentProgress={currentProgress} 
                    goal={goal}
                  />
                </div>
              )
            })}
          </div>
        
        </div>
      )}

      {!hasMealPrep && (
        <div className="empty-body-main-container">
          <EmptyState 
            icon={"/EmptyState/MealPlan.svg"}
            title="No Meal Prep"
            subtitle="Generate your meal prep!"
          />
        </div>
      )}
    </>
  )
}

export default SidebarMealPrep;