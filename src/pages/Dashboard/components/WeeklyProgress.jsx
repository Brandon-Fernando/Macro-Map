import { useEffect } from "react";
import { useState } from "react";
import Icons from "../../../components/Icons/Icons";
import { useLogContext } from "../../../context/LogContext";
import WeeklyCalendar from "./WeeklyCalendar";

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getSunday(date) {
  const d = new Date(date);
  d.setDate(date.getDate() - date.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeek(start){
  const days = [];
  for(let i = 0; i < 7; i++){
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d)
  }

  return days;
}

function formatLocalDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

const WeeklyProgress = () => {
  const [startOfWeek, setStartOfWeek] = useState(getSunday(new Date()));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { weeklyOverallProgress, getWeekOverallProgress} = useLogContext();

  const prevWeek = () => {
    const prev = new Date(startOfWeek);
    prev.setDate(startOfWeek.getDate() - 7);
    setStartOfWeek(prev);
  }

  const nextWeek = () => {
    const next = new Date(startOfWeek);
    next.setDate(startOfWeek.getDate() + 7);
    setStartOfWeek(next)
  }

  useEffect(() => {
    const unsubscribe = getWeekOverallProgress(startOfWeek);
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [startOfWeek, getWeekOverallProgress]);

  const getDayProgress = (day) => {
    const formattedDay = formatLocalDate(day);

    const foundDay = weeklyOverallProgress.find(
      (item) => item.date === formattedDay
    );

    return foundDay?.overallProgress || 0;
  };

  const week = getWeek(startOfWeek);


  return(
    <div className="weekly-progress-container card-design">
      {/* HEADER  */}
      <div className="wkly-prog-header">
        <Icons size={"S"} icon="fa-solid fa-calendar-days"/>

        <div className="wkly-title-subtitle">
          <span className="main-bold-title">Weekly Progress</span>
          <span className="light-subtitle">Apr 2026</span>
        </div>

        <div className="back-forward-btn">
          <div className="wkly-btn" onClick={() => prevWeek()}>
            <i className="fa-solid fa-angle-left"></i>
          </div>

          <div className="wkly-btn" onClick={() => nextWeek()}>
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>


      <WeeklyCalendar week={week} getDayProgress={getDayProgress}/>
    </div>
  )
}

export default WeeklyProgress;