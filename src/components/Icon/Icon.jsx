import "./Icon.css";

const Icon = ({ size, icon, type, bg }) => {

	return(
		<div className={`icon-container ${size} ${bg}`}>
			{type === "img" ? (
				<img src={icon} alt="icon" className="icon-img"/>
			) : (
				<i className={icon}></i>
			)}
		</div>
	)
}

export default Icon;