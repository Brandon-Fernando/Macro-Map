import { useState } from "react";
import "../LogMeals.css"
import { motion } from "framer-motion";
import { calendarVariants } from "../../../../animations/motionVariants";
import { useLogContext } from "../../../../context/LogContext";

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
		days.push(d);
	}

	return days;
}

const LogCalendar = () => {
	const [startOfWeek, setStartOfWeek] = useState(getSunday(new Date()));
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const [dateChosen, setDateChosen] = useState(today);
	const weekday = dateChosen.toLocaleDateString("en-GB", {weekday: "short"});
	const day = dateChosen.toLocaleTimeString("en-GB", {day: "numeric"});
	const month = dateChosen.toLocaleDateString("en-GB", {month: "short"});
	const {setSelectedDate} = useLogContext();

	const prevWeek = () => {
		const prev = new Date(startOfWeek);
		prev.setDate(startOfWeek.getDate() - 7);
		setStartOfWeek(prev);
	}

	const nextWeek = () => {
		const next = new Date(startOfWeek);
		next.setDate(startOfWeek.getDate() + 7);
		setStartOfWeek(next);
	}

	const isSameDay = (a, b) => 
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() && 
		a.getDate() === b.getDate();
	

	const week = getWeek(startOfWeek);

	const handleDayClick = (day) => {
		setDateChosen(day);
		setSelectedDate(day.toISOString().split("T")[0]);
	}

	return(
		<div className="log-calendar-container">
			{/* LEFT ARROW  */}
			<div onClick={prevWeek} className="left-right">
				<i className="fa-solid fa-angle-left"></i>
			</div>

			{/* CALENDAR  */}
			<div className="log-calendar-card card-design">
				{week.map((day) => (
					<div key={day} className="log-day">
						<span className="day-name">{DAY[day.getDay()]}</span>

						<motion.div 
							className="day-circle"
							onClick={() => handleDayClick(day)}
							variants={calendarVariants}
							animate={
								isSameDay(day, dateChosen)
								? "active"
								: isSameDay(day, today)
								? "today"
								: "inactive"
							}
						>
							<span>{day.getDate()}</span>
						</motion.div>
						
					</div>
				))}
			</div>

			{/* RIGHT ARROW  */}
			<div onClick={nextWeek} className="left-right">
				<i className="fa-solid fa-angle-right"></i>
			</div>
		</div>
	)
}

export default LogCalendar;

