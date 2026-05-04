import { useState } from "react";
import "./NavBar.css"
import { motion } from "framer-motion";
import { useLocation, NavLink } from "react-router-dom";
import { navBar } from "../../animations/motionVariants";

const options = [
  { label: "Dashboard", path: "/dashboard", icon: "/NavBar/DashDark.svg", iconFill: "/NavBar/DashLight.svg"},
  { label: "Pantry", path: "/pantry", icon: "/NavBar/PantryDark.svg", iconFill: "/NavBar/PantryLight.svg" },
  { label: "Meals", path: "/meals", icon: "/NavBar/MealDark.svg", iconFill: "/NavBar/MealLight.svg" },
  { label: "Profile", path: "/profile", icon: "/NavBar/UserDark.svg", iconFill: "/NavBar/UserLight.svg" },
];

const NavBarMobile = () => {
	const location = useLocation();

	return(
		<div className="navbar-mobile-container">
			{options.map(( opt, index ) => {
				const activeNav = location.pathname.startsWith(opt.path);

				return(
					<motion.div
						key={index}
						variants={navBar}
						whileHover="hover"
						whileTap="tap"
					>
						<NavLink
							to={opt.path}
							className={`nav-opt ${activeNav ? "active" : ""}`}
						>
							<img
								src={activeNav ? opt.iconFill : opt.icon}
								alt={opt.label}
							/>
						</NavLink>
					</motion.div>
				)
			})}
		</div>
	)
}

export default NavBarMobile;