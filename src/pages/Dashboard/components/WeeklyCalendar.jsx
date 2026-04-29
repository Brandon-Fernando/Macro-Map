import { useState, useEffect } from "react";
import ProgressCalendar from "../../../components/Progress/ProgressCalendar";
import { useLogContext } from "../../../context/LogContext";

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyCalendar = ({week, getDayProgress}) => {

  return(
    <div className="weekly-calendar-container">
      {week.map((day) => {
        const progress = getDayProgress(day)

        return(
          <div key={day} className="day-calendar">
            <span className="main-reg-title">{DAY[day.getDay()]}</span>
            <ProgressCalendar percentage={progress} date={day.getDate()}/>
          </div>
        )
      })}
    </div>
  )
}

export default WeeklyCalendar;