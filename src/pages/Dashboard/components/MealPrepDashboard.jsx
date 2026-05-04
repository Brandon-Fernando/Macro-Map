import { useState } from "react";
import EmptyState from "../../../components/EmptyState/EmptyState";
import Icons from "../../../components/Icons/Icons";
import ProgressCircle from "../../../components/Progress/ProgressCircle";
import { useMealContext } from "../../../context/MealContext";
import { useQuiz } from "../../../context/QuizContext";
import { useNavigate } from "react-router-dom";

const MACROS = ["Calories", "Protein", "Carbs", "Fat"];

const MealPrepDashboard = () => {
  const { mealPrep } = useMealContext();
  const { quizData } = useQuiz();
  const navigate = useNavigate();

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
    <div className="meal-prep-dashboard-container card-design">
      {/* HEADER  */}
      <div className="mp-dash-header">
        <span className="main-bold-title">Meal Prep</span>

        <div
         className="db-ang"
         onClick={() => navigate("/meals/prep")}
        >
          <i className="fa-solid fa-angle-right"></i>
        </div>
      </div>

      {!hasMealPrep && (
        <div className="empty-body-container">
          <EmptyState 
            icon={"/EmptyState/MealPlan.svg"}
            title={"No Meal Prep"}
            subtitle={"Click to generate your meal plan."}
          />
        </div>
      )}
      
      {hasMealPrep && (
        <div className="mp-dash-body">
          {/* MEAL NAME  */}
          <div className="mp-dash-name">
            <span className="reg-subtitle">{mealType}</span>
            <span className="main-bold-title">{currentMeal.title}</span>
          </div>

          {/* MACROS  */}
          <div className="mp-dash-macros">
            {MACROS.map((macro) => {
              const currentProgress = currentMeal.macros[macro.toLowerCase()]
              const goal = quizData?.results[macro.toLowerCase()];

              return(
                <div
                  key={macro}
                  className="mp-dash-macro"
                >
                  <span className="main-reg-subtitle">{macro}</span>

                  <span className="main-bold-title">{currentProgress} {macro === "Calories" ? "" : "g"}</span>

                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MealPrepDashboard;