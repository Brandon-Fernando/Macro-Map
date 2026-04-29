import Icons from "../../../components/Icons/Icons";
import ProgressCircle from "../../../components/Progress/ProgressCircle"
import ProgressHalfCircle from "../../../components/Progress/ProgressHalfCircle";
import { useLogContext } from "../../../context/LogContext";

const DailyProgress = () => {
  const { macroTotals } = useLogContext();

  return(
    <div className="db-daily-prog-container card-design">
      {/* HEADER  */}
      <div className="db-daily-header">
        <Icons size={"S"} icon="fa-solid fa-chart-simple"/>

        <span className="main-bold-title">Daily Totals</span>
      </div>

      {/* PROGRESS HALF CIRCLE  */}
      <div className="db-daily-prog">
        <span className="light-subtitle"></span>

        <ProgressHalfCircle percentage={macroTotals.overallProgress.toFixed(0)} isPercent/>
      </div>
    </div>
  )
}

export default DailyProgress;