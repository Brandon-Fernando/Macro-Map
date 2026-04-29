// import PageHeader from "../../../components/PageHeader/PageHeader";
// import QuizResultsMacros from "./components/QuizResultsMacros";
// import QuizDataList from "./components/QuizDataList";
// import "./QuizData.css";
// import Macros from "../../../components/Macros/Macros";
// import { useQuiz } from "../../../context/QuizContext";
// import { useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import QuizModalContent from "./components/QuizModalContent";
// import { OrbitProgress } from "react-loading-indicators";

import Button from "../../../components/Buttons/Button";
import Icons from "../../../components/Icons/Icons";
import { useQuiz } from "../../../context/QuizContext";

// const QuizData = () => {
// 	const { quizData, quizLoading } = useQuiz();
// 	const [modalOpen, setModalOpen] = useState(false);
// 	const [currentQuestion, setCurrentQuestion] = useState();

// 	const handleEditModal = (question) => {
// 		setModalOpen(true)
// 		setCurrentQuestion(question)
// 	}

// 	if (quizLoading) {
// 		return (
// 			<div className="page-container">
// 				<PageHeader 
// 					title="Quiz Data"
// 					isBack
// 					backPath={"/profile"}
// 					isButton
// 					buttonText={"Retake Quiz"}
// 				/>
// 				<div className="load-success-container">
// 					<OrbitProgress color="#FE9844" size="large" text="" textColor="" />
//         </div>
// 			</div>
// 		);
// 	}

// 	return (
// 		// <div className="page-container">
// 		// 	<PageHeader 
// 		// 		title="Quiz Data"
// 		// 		isBack
// 		// 		backPath={"/profile"}
// 		// 	/>
// 		<div className="quiz-data-container">
// 			{quizData?.results && (
// 				<Macros nutritionalFacts={quizData.results} />
// 			)}

// 			<QuizDataList 
// 				handleClick={handleEditModal}
// 			/>

// 			<AnimatePresence mode="wait">
// 				{modalOpen && (
// 					<QuizModalContent
// 						currentQuestion={currentQuestion}
// 						setModal={setModalOpen}
// 					/>
// 				)}
// 			</AnimatePresence>
			
	
// 		</div>
// 	);
// };

// export default QuizData;



const QuizData = ({setModalOpen}) => {
	const { quizData } = useQuiz();

	const USER_SUMMARY = [
		{ name: "Age", label: "Age", value: quizData?.Age, icon: "fa-solid fa-calendar-days", type: "number"},
		{ name: "Gender", label: "Gender", value: quizData?.Gender,  icon: "fa-solid fa-person-half-dress", type: "radio", options: ["Male", "Female"]},
		{ name: "Weight", label: "Weight", value: quizData?.Weight, icon: "fa-solid fa-weight-scale", type: "number"},
		{ name: "Height", label: "Height", value: `${quizData?.Feet}' ${quizData?.Inches}"`, icon: "fa-solid fa-ruler-vertical", type: "height"},
		{ name: "ActivityLevel", label: "Activity Level", value: quizData?.ActivityLevel, icon: "fa-solid fa-person-running", type: "radio", options: ["Sedentary", "Lightly", "Moderate", "Very", "Extra"]},
		{ name: "Goal", label: "Goal", value: quizData?.Goal, icon: "fa-solid fa-medal", type: "radio", options: ["Lose", "Maintain", "Gain"]},
	];

	return(
		<div className="quiz-data-card card-design">
			{/* HEADER  */}
			<div className="quiz-icon-title">
				<Icons size={"S"} icon="fa-solid fa-file-pen"/>

				<span className="main-bold-title">User Info</span>

				<div
					className="retake-btn-container"
					onClick={() => setModalOpen(true)}
				>
					<span className="main-reg-title">Edit</span>
					<i className="fa-solid fa-pen-to-square"></i>
				</div>
			</div>

			{/* USER INFO CARD  */}
			<div className="user-info-card-container">
				{USER_SUMMARY.map((ans) => (
					<div key={ans.name} className="user-info-card">
						<span className="main-light-title">{ans.label}</span>

						<span className="main-bold-title">{ans.value}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default QuizData;