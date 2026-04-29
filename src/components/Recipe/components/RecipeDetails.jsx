import Icon from "../../Icon/Icon.jsx"

const MEAL_DETAILS = [
	{label: "Prep Time", key: "prep_time", icon: "fa-solid fa-clock"}, 
	{label: "Cook Time", key: "cook_time", icon: "fa-solid fa-kitchen-set"}, 
	{label: "Servings", key: "servings", icon: "fa-solid fa-users"}
]

const RecipeDetails = ({meal}) => {

	return(
		<div className="recipe-details-container card-design">
			{MEAL_DETAILS.map((detail) => (
				<div
					className="meal-detail"
					key={detail.key}
				>
					<Icon size={"M"} icon={detail.icon}/>

					<span className="main-light-subtitle">{detail.label}</span>

					<span className="main-bold-title">{meal[detail.key]}</span>
				</div>
			))}
		</div>
	)
}

export default RecipeDetails;