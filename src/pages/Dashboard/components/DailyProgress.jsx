import Button from "../../../components/Buttons/Button";
import Icons from "../../../components/Icons/Icons";
import ProgressBar from "../../../components/NutrientInfo/ProgressBar";
import ProgressCircle from "../../../components/Progress/ProgressCircle"
import ProgressHalfCircle from "../../../components/Progress/ProgressHalfCircle";
import { useLogContext } from "../../../context/LogContext";

const DailyProgress = () => {
  const { macroTotals, logFoodData } = useLogContext();

  const PROG_INFO = [
    {label: `${logFoodData.length} Logged Meals`, icon: "fa-solid fa-bowl-food"}, 
    {label: `${macroTotals.calories} kcal`, icon: "fa-solid fa-fire"}
  ]

  return(
    <div className="db-daily-prog-container card-design">
      {/* HEADER  */}
      <div className="db-daily-header">
        {/* HEADER-INFO  */}
        <div className="header-info">
          <span className="main-bold-title">Today's Progress</span>

          <div className="prog-info-wrapper">
            {PROG_INFO.map((info) => (
              <div className="prog-info">
                <i className={info.icon}></i>

                <span className="prog-info-label">{info.label}</span>
              </div>
            ))}
          </div>  
        </div>
      </div>

      {/* PROGRESS HALF CIRCLE  */}
      <div className="db-daily-prog">
        <span className="db-daily-prog-percentage">{macroTotals.overallProgress.toFixed(0)}%</span>
        <ProgressBar size={"large"} isPercentage percentage={macroTotals.overallProgress.toFixed(0)}/>
      </div>
    </div>
  )
}

export default DailyProgress;