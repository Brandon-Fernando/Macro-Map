import "./Macros.css";
import Icons from "../Icons/Icons";

const MACROS = ["Calories", "Protein", "Carbs", "Fat"];

const Macros = ({nutritionalFacts, isProfile}) => {

  return(
    <div className="macros-container card-design">
      <div className="macros-icon-title">
        <Icons size={"S"} icon="fa-solid fa-chart-simple"/>
        <span className="main-bold-title">{isProfile ? "Nutrition Goals" : "Nutrition Facts"}</span>
      </div>

      <div className="macros-nutri-vals-container">
        {MACROS.map((macro) => (
          <div 
            className="macro-nutri-val"
            key={macro}
          >
            <span className="main-light-subtitle">{macro}</span>
            <span className="main-bold-title">{nutritionalFacts[macro.toLowerCase()]} {macro !== "Calories" ? "g" : ""}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Macros;