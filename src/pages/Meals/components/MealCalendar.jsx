import "../Meals.css";

const CALENDAR = [
	"Sun", 
	"Mon", 
	"Tue", 
	"Wed", 
	"Thu", 
	"Fri", 
	"Sat"
];

const MealCalendar = () => {

  return(
    <div className="meal-calendar-container card-design">
			{CALENDAR.map((day) => (
				<div className="day-container">
					<span className="day-title">{day}</span>

					<div className="circ-temp"></div>
				</div>
			))}
    </div>
  )
}

export default MealCalendar;