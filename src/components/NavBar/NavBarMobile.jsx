import { useState } from "react";
import "./NavBar.css"
import { motion } from "framer-motion";
import { useLocation, NavLink } from "react-router-dom";

const options = [
  { label: "Home", path: "/dashboard", icon: "/NavIcons/Home.svg", iconFill: "/NavIcons/HomeFill.svg"},
  { label: "Pantry", path: "/pantry", icon: "/NavIcons/Pantry.svg", iconFill: "/NavIcons/PantryFill.svg" },
  { label: "Meals", path: "/meals", icon: "/NavIcons/Meal.svg", iconFill: "/NavIcons/MealFill.svg" },
  { label: "Profile", path: "/profile", icon: "/NavIcons/Profile.svg", iconFill: "/NavIcons/ProfileFill.svg" },
];

const NavBarMobile = () => {
	const location = useLocation();
  const optionWidth = 100 / options.length;
  const activeIndex = options.findIndex(
	(opt) => location.pathname.startsWith(opt.path)
  );

	return(
		<div className="navbar-container-mobile">
			<div className="navbar-content-mobile">
				<motion.div 
					className="options-slider"
					animate={{ left: `${activeIndex * optionWidth}%` }}
					transition={{ type: "spring", stiffness: 200, damping: 30 }}
					style={{ width: `${optionWidth}%` }}
				/>

				{options.map((opt, index) => (
					<NavLink 
						key={index}
    				to={opt.path}
						className={`nav-option ${activeIndex === index ? "active" : ""}`}
					>
						<img src={activeIndex === index ? opt.iconFill : opt.icon} alt={opt.label} className="nav-icon"/>

						<span className="opt-title">{opt.label}</span>
					</NavLink>
				))}
			</div>
		</div>
	)
}

export default NavBarMobile