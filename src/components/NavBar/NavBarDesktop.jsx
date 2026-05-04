import { useLocation } from "react-router-dom";
import "./NavBar.css"
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { navBar } from "../../animations/motionVariants";

const options = [
  { label: "Dashboard", path: "/dashboard", icon: "/NavBar/DashDark.svg", iconFill: "/NavBar/DashLight.svg"},
  { label: "Pantry", path: "/pantry", icon: "/NavBar/PantryDark.svg", iconFill: "/NavBar/PantryLight.svg" },
  { label: "Meals", path: "/meals", icon: "/NavBar/MealDark.svg", iconFill: "/NavBar/MealLight.svg" },
  { label: "Profile", path: "/profile", icon: "/NavBar/UserDark.svg", iconFill: "/NavBar/UserLight.svg" },
];

const NavBarDesktop = () => {
	const location = useLocation();
	const activeIndex = options.findIndex(
		(opt) => location.pathname.startsWith(opt.path)
	);

	return(
		<div className="navbar-container-desktop">
			<div className="navbar-border">
				<img src="/Logo/Logo.svg" alt="Logo" />

				<div className="navbar-content-desktop">
					{options.map((opt, index) => (
						<motion.div
							key={index}
							variants={navBar}
							whileHover="hover"
							whileTap="tap"
						>
							<NavLink
								to={opt.path}
								className={`nav-opt ${activeIndex === index ? "active" : ""}`}
							>
								<img
									src={activeIndex === index ? opt.iconFill : opt.icon}
									alt={opt.label}
								/>
							</NavLink>
						</motion.div>
					))}
				</div>

				<div className="logout-nav">
					<i className="fa-solid fa-right-from-bracket"></i>

					<span>Logout</span>
				</div>
			</div>
			
		</div>
	)
}

export default NavBarDesktop;