import "./Searchbar.css"
import { motion } from "framer-motion";
import { inputHoverClickVariant } from "../../animations/motionVariants";

const Searchbar = ({
	query, 
	setQuery, 
	handleSearch
}) => {

	const onSubmit = (e) => {
		e.preventDefault();
		handleSearch();
	}
	
	return(
		<form className="searchbar-container" onSubmit={onSubmit}>
			<i className="fa-solid fa-magnifying-glass mag-icon"></i>

			<motion.input 
				type="search"
				className="searchbar"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				enterKeyHint="search"
				variants={inputHoverClickVariant}
				whileFocus={"focus"}
				whileHover={"hover"}
			/>

			{/* <button type="submit">Search</button> */}

			
		</form>
	)
}

export default Searchbar;