import QuizModal from "../../../../components/Modal/QuizModal/QuizModal";
import Button from "../../../../components/Buttons/Button"
import { useQuiz } from "../../../../context/QuizContext";
import { useState } from "react";
import { radioInputsVariants } from "../../../../animations/motionVariants";
import { motion } from "framer-motion";
import LoadSuccess from "../../../../components/LoadSuccess/LoadSuccess";

const QuizModalContent = ({setModal, currentQuestion}) => {
  const { updateQuizAnswer, quizData } = useQuiz();
  const [loading, setLoading] = useState(false);

  const initialQuizFormState = {
    Age: quizData?.Age, 
    Gender: quizData?.Gender, 
    Weight: quizData?.Weight, 
    Feet: quizData?.Feet,
    Inches: quizData?.Inches, 
    ActivityLevel: quizData?.ActivityLevel, 
    Goal: quizData?.Goal
  };

  const [quizFormState, setQuizFormState] = useState(initialQuizFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizFormState((prev) => ({
      ...prev, 
      [name]: value
    }))
  }

  const handleQuiz = async () => {
    setLoading(true);

    try{
      const fieldName = currentQuestion.name;
      const fieldValue = quizFormState[fieldName];

      if(currentQuestion.name === "Height"){
        await updateQuizAnswer({
          Feet: quizFormState.Feet, 
          Inches: quizFormState.Inches
        })
      } else{
        await updateQuizAnswer({
          [fieldName]: fieldValue
        })
      }
      
    } catch(error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setModal(false)
      }, 900)

      setTimeout(() => [
        setLoading(false)
      ], 1000)
    }
  }

  const type = currentQuestion.type


  const footer = 
    <Button type="tertiary" text="Update" handleClick={() => handleQuiz()}/>

  if(loading){
    return(
      <QuizModal 
        handleClick={() => setModal(false)}
        footer={footer}
        title={currentQuestion.label}
      >
        <div className="load-success-container">
          <LoadSuccess 
            isLoading={loading}
            dark
          />
        </div>
      </QuizModal>
    )
  }

  return(
    <QuizModal 
      handleClick={() => setModal(false)}
      footer={footer}
      title={currentQuestion.label}
    >
      {type === "number" && (
        <div className="update-quiz-ans">
          <input 
						type="number" 
						className="quiz-text-input"
						name={currentQuestion.name}
						value={quizFormState[currentQuestion.name]}
						onChange={handleChange}
						placeholder={currentQuestion.value}
					/>
        </div>
      )}

      {type === "radio" && (
        <div className="update-quiz-ans">
          {currentQuestion.options.map((opt) => (
            <motion.label
              key={opt}
              className={`radio-answers ${quizFormState[currentQuestion.name] === opt ? "checked" : ""}`}
              variants={radioInputsVariants}
              initial="inactive"
              animate={quizFormState[currentQuestion.name] === opt ? "active" : "inactive"}
            >
              {opt}
              <input 
                type="radio"
                name={currentQuestion.name}
                value={opt}
                checked={quizFormState[currentQuestion.name] === opt}
                className="radio-inputs"
                onChange={handleChange}
              />

              <motion.div 
                className="radio"
                key={opt}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  backgroundColor: quizFormState[currentQuestion.name] === opt ? "#FE9844" : "transparent",
                  border: quizFormState[currentQuestion.name] === opt ? "#FE9844" : "2px solid #CECECE",
                  color: quizFormState[currentQuestion.name] === opt ? "#FFFFFF" : "#FE9844"
                }}
                transition={{ duration: 0.2 }}
              >
                {
                quizFormState[currentQuestion.name] === opt
                  ? <i className="fa-solid fa-check"/>
                  : ""
                }
              </motion.div>
            </motion.label>
          ))}
        </div>
      )}

      {type === "height" && (
        <div className="update-quiz-ans">
          <input 
					type="number" 
					name="Feet"
					placeholder="Feet"
					value={quizFormState.Feet}
					onChange={handleChange}
					className="quiz-text-input"
				/>

				<input 
					type="number" 
					name="Inches"
					placeholder="Inches"
					value={quizFormState.Inches}
					onChange={handleChange}
					className="quiz-text-input"
				/>
        </div>
      )}
    </QuizModal>
  )
}

export default QuizModalContent;