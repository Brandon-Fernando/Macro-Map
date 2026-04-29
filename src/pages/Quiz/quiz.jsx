import { useState } from "react";
import "./QuizContent.css";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";
import { radioVariants } from "../../animations/motionVarients";
import { Riple, ThreeDot  }from "react-loading-indicators";
import { calculateCaloriesAndMacros } from "../../utils/quizUtils";
import { useQuiz } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";


const questions = [
  { name: "Title", label: "A few quick questions before we start", type: "none"},
  { name: "Age", label: "What is your age?", type: "number" },
  { name: "Gender", label: "Select your gender", type: "radio", options: ["male", "female"] },
  { name: "Weight", label: "What is your weight (lbs)?", type: "number" },
  { name: "Height", label: "What is your height?", type: "height" },
  {
    name: "ActivityLevel",
    label: "How active are you?",
    type: "radio",
    options: ["sedentary", "lightly", "moderate", "very", "extra"],
  },
  {
    name: "Goal",
    label: "What’s your goal?",
    type: "radio",
    options: ["lose", "maintain", "gain"],
  },
];

const initialQuizFormState = {
  age: "",
  gender: "male",
  weight: "",
  feet: "",
  inches: "",
  activityLevel: "sedentary",
  goal: "maintain"
}

const QuizContent = () => {
  const [quizFormState, setQuizFormState] = useState(initialQuizFormState)
  const [step, setStep] = useState(0);
	const { saveQuiz } = useQuiz();
	const [direction, setDirection] = useState(1);
	// const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null)
	const [isSubmit, setIsSubmit] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setIsSubmit(true)
		setSaving(true)
		setError(null);

		try{
			e.preventDefault();
			const results = calculateCaloriesAndMacros(quizFormState);
			await saveQuiz({ ...quizFormState, results});
		} catch(err) {
			setError("Failed to save quiz. Try again!")
		} finally {
			setSaving(false)
		}
	}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizFormState((prev) => ({
      ...prev, 
      [name]: value,
    }));
  };

  const handleNext = () => {
		setDirection(1);

		const currentQuestion = questions[step];

		// Skip validation for the title screen
		if (currentQuestion.type !== "none") {

			// Validate based on field name
			const fieldName = currentQuestion.name;

			// Special validation for the height question (feet + inches)
			if (fieldName === "height") {
				if (!quizFormState.feet || !quizFormState.inches) {
					alert("Please enter your full height.");
					return;
				}
			} 
			// Normal validation for other fields
			else if (!quizFormState[fieldName]) {
				alert("Please answer the question before continuing.");
				return;
			}
		}

    if (step < questions.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
		setDirection(-1);
    if (step > 0) setStep(step - 1);
  };

  const currentQ = questions[step];

	if(isSubmit) {
		return(
			<div className="submit-container">
				<AnimatePresence mode="wait">
					{saving ? (
						<motion.div
							key="saving"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
						>
							<Riple color="#ffffff" size="large" text="" textColor="" />
							<motion.div
								className="submit-title"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
							>
								<h3>Saving your quiz</h3>
								<ThreeDot color="#ffffff" size="small" text="" textColor="" />
							</motion.div>
						</motion.div>
					) : (
						<motion.div
							key="saved"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
						>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ type: "spring", stiffness: 200, damping: 10 }}
								className="check-circle"
							>
								<i className="fa-solid fa-check"></i>
							</motion.div>
							<motion.div
								className="submit-title"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
							>
								<h3>Quiz saved!</h3>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
				

				{!saving && (
					<div className="submit-continue">
						<Button 
							type="secondary"
							label="continue"
							onClick={() => navigate("/Dashboard")}
						/>
					</div>
					
				)}
			</div>
		)
	}

  return (
    <div className="form-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 * direction }}
          transition={{ duration: 0.35 }}
        >
          <form>
            {currentQ.type === "none" && (
              <h3 className="form-title">{currentQ.label}</h3>
            )}

            {currentQ.type === "number" && (
              <div className="question-container">
                <h3 className="form-subtitle">{currentQ.label}</h3>

                <input
                  type="number"
                  placeholder={currentQ.name}
                  name={currentQ.name}
                  value={quizFormState[currentQ.name]}
                  onChange={handleChange}
                  required
                  className="inputs"
                />
              </div>
            )}

						{currentQ.type === "radio" && (
							<div className="question-container">
								<h3 className="form-subtitle">{currentQ.label}</h3>

								{currentQ.options.map((opt) => (
									<motion.label 
										key={opt} 
										className={`radio-answers ${quizFormState[currentQ.name] === opt ? "checked" : ""}`}
										variants={radioVariants}
										animate={quizFormState[currentQ.name] === opt ? "active" : "inactive"}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{opt}
										<input
											type="radio"
											name={currentQ.name}
											value={opt}
											checked={quizFormState[currentQ.name] === opt}
											onChange={handleChange}
											className="radio-inputs"
										/>
										<span className="custom-radio">
											<i className="fas fa-check"></i>
										</span>
										
									</motion.label>
								))}
							</div>
						)}

						{currentQ.type === "height" && (
							<div className="question-container">
								<h3 className="form-subtitle">{currentQ.label}</h3>
								
									<input
										type="number"
										name="feet"
										placeholder="Feet"
										value={quizFormState.feet}
										onChange={handleChange}
										required
										className="inputs"
									/>

									<input
										type="number"
										name="inches"
										placeholder="Inches"
										value={quizFormState.inches}
										onChange={handleChange}
										required
										className="inputs"
									/>
								
							</div>
						)}
          </form>
        </motion.div>
      </AnimatePresence>
			

			<div className="return-continue">
				{currentQ.name !== "title"  && (
					<div className="q-return">
						<Button 
							type="select"
							label="fa-solid fa-arrow-left"
							onClick={handleBack}
						/>
					</div>
				)}
				
				
				<div className="q-continue">
					{currentQ.name === "goal" ? (
						<Button 
							type="secondary"
							label="submit"
							onClick={handleSubmit}
						/>
					) : (
						<Button 
							type="secondary"
							label="continue"
							onClick={handleNext}
						/>
					)}
					
				</div>
				
			</div>
    </div>
  );
};

export default QuizContent;

// import React, { createContext, useState, useContext, useEffect } from "react";
// import { doc, setDoc, serverTimestamp, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
// import { db } from "../../utils/firebase";
// import { useAuth } from "./AuthContext"; // get currentUser

// const QuizContext = createContext();
// export const useQuiz = () => useContext(QuizContext);

// export const QuizProvider = ({ children }) => {
//   const { currentUser } = useAuth();
//   const [quizData, setQuizData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Save quiz in context
//   const saveQuizData = (data) => setQuizData(data);

//   // Save quiz to Firestore
//   const saveQuizToFirestore = async (data) => {
//     if (!currentUser) return;
//     try {
//       await setDoc(
//         doc(db, "users", currentUser.uid, "quizResults", "latest"), 
//         { ...data, updatedAt: serverTimestamp() } 
//       );
//       console.log("Quiz saved (replaced previous one)!");
//     } catch (error) {
//       console.error("Error saving quiz:", error);
//     }
//   };

//   // Combined function: save in context + Firestore
//   const saveQuiz = async (data) => {
//     saveQuizData(data);
//     await saveQuizToFirestore(data);
//   };

//   // Fetch latest quiz/macros from Firestore
  
// const fetchLatestQuiz = async () => {
//   if (!currentUser) return;
//   try {
//     const quizRef = doc(db, "users", currentUser.uid, "quizResults", "latest");
//     const snapshot = await getDoc(quizRef);
//     if (snapshot.exists()) {
//       const latestQuiz = snapshot.data();
//       setQuizData(latestQuiz);
//       return latestQuiz;
//     }
//   } catch (error) {
//     console.error("Error fetching quiz:", error);
//   }
// };

//   // Auto-fetch when user logs in
//   useEffect(() => {
//     if (currentUser) {
//       fetchLatestQuiz().finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [currentUser]);


//   return (
//     <QuizContext.Provider value={{ quizData, saveQuiz, saveQuizData, fetchLatestQuiz, loading  }}>
//       {children}
//     </QuizContext.Provider>
//   );
// };
