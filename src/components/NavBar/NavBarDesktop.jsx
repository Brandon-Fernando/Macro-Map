import { useLocation } from "react-router-dom";
import "./NavBar.css"
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { navSideBarVariants } from "../../animations/motionVariants";

const options = [
  { label: "Home", path: "/dashboard", icon: "/NavIcons/Home.svg", iconFill: "/NavIcons/HomeFill.svg"},
  { label: "Pantry", path: "/pantry", icon: "/NavIcons/Pantry.svg", iconFill: "/NavIcons/PantryFill.svg" },
  { label: "Meals", path: "/meals", icon: "/NavIcons/Meal.svg", iconFill: "/NavIcons/MealFill.svg" },
  { label: "Profile", path: "/profile", icon: "/NavIcons/Profile.svg", iconFill: "/NavIcons/ProfileFill.svg" },
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
							className={`navbar-content-bg ${activeIndex === index ? "active" : ""}`}
							variants={navSideBarVariants}
							animate={activeIndex === index ? "active" : "inactive"}
							key={opt.label}
						>
							<NavLink
								key={index}
								to={opt.path}
								className={`nav-option-desktop ${activeIndex === index ? "active" : ""}`}
							>
								<img src={activeIndex === index ? opt.iconFill : opt.icon} alt={opt.label} />

								<span>{opt.label}</span>
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