import { useState } from "react";
import BaseModal from "../../../components/Modal/BaseModal/BaseModal";
import SideBar from "../../../components/Modal/SideBar/SideBar";
import { useQuiz } from "../../../context/QuizContext";
import { motion } from "framer-motion";
import { radioInputsVariants } from "../../../animations/motionVariants";
import Button from "../../../components/Buttons/Button";
import LoadSuccess from "../../../components/LoadSuccess/LoadSuccess";
import useIsDesktopHorizontal from "../../../hooks/useIsDesktopHorizontal";
import useIsDesktop from "../../../hooks/useIsDesktop";

const QuizModal = ({setModalOpen}) => {
  const { quizData, updateQuizAnswer } = useQuiz();
  const [loading, setLoading] = useState(false);
  const isDesktopHorizontal = useIsDesktopHorizontal();

	const USER_SUMMARY = [
		{ name: "Age", label: "Age", value: quizData?.Age, icon: "fa-solid fa-calendar-days", type: "number"},
		{ name: "Gender", label: "Gender", value: quizData?.Gender,  icon: "fa-solid fa-person-half-dress", type: "radio", options: ["Male", "Female"]},
		{ name: "Weight", label: "Weight", value: quizData?.Weight, icon: "fa-solid fa-weight-scale", type: "number"},
		{ name: "Height", label: "Height", value: `${quizData?.Feet}' ${quizData?.Inches}"`, icon: "fa-solid fa-ruler-vertical", type: "height"},
		{ name: "ActivityLevel", label: "Activity Level", value: quizData?.ActivityLevel, icon: "fa-solid fa-person-running", type: "radio", options: ["Sedentary", "Lightly", "Moderate", "Very", "Extra"]},
		{ name: "Goal", label: "Goal", value: quizData?.Goal, icon: "fa-solid fa-medal", type: "radio", options: ["Lose", "Maintain", "Gain"]},
	];

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

  const handleUpdate = async () => {
    setLoading(true);

    try{
      await updateQuizAnswer(quizFormState)
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setModalOpen(false)
      }, 900)

      setTimeout(() => {
        setLoading(false)
      }, 1100)
    }
  }

  const loadingContent = 
    <div className="load-success-container">
      <LoadSuccess 
        isLoading={loading}
        dark
      />
    </div>


  if(loading){
    
    return(
      isDesktopHorizontal ? (
        <SideBar
          title={"Edit User Info"}
          setModal={setModalOpen}
        >
          {loadingContent}
        </SideBar>
      ) : (
        <BaseModal
          handleClick={() => setModalOpen(false)}
          title={"Edit User Info"}  
        >
          {loadingContent}
        </BaseModal>
      )
    )
  }

  const footer = 
    <Button type="tertiary" text="Update" handleClick={() => handleUpdate()}/>

  
  const content = 
    <div className="user-info-modal-container">
      {USER_SUMMARY.map((info) => (
        <div className="user-info-modal-ans" key={info.name}>
          <span className="main-bold-title">{info.label}</span>

          {/* NUMBER INPUT  */}
          {info.type === "number" && (
            <div className="num-input">
              <input 
                className="text-input"
                type="number"
                name={info.name}
                value={quizFormState[info.name]}
                onChange={handleChange}
                placeholder={info.value}
              />

              <span className="input-unit">{info.name === "Weight" ? "lbs" : ""}</span>
            </div>
          )}

          {/* HEIGHT INPUT  */}
          {info.type === "height" && (
            <div className="height-input-container">
              <div className="height-input">
                <input 
                  type="number" 
                  className="text-input"
                  name="Feet"
                  placeholder={quizFormState.Feet}
                  value={quizFormState.Feet}
                  onChange={handleChange}
                />

                <span className="height-unit">ft</span>
              </div>
                
              <div className="height-input">
                <input 
                  type="number"
                  className="text-input"
                  name="Inches"
                  placeholder={quizFormState.Inches}
                  value={quizFormState.Inches}
                  onChange={handleChange}
                />

                <span className="height-unit">in</span>
              </div>
            </div>
          )}

          {/* RADIO INPUT  */}
          {info.type === "radio" &&(
            <div className="radio-modal">
              {info.options.map((opt) => (
                <motion.label
                  key={opt}
                  className={`radio-modal-ans ${quizFormState[info.name] === opt ? "checked" : ""}`}
                  variants={radioInputsVariants}
                  initial="inactive"
                  animate={quizFormState[info.name] === opt ? "active" : "inactive"}
                >
                  {opt}
                  <input 
                    type="radio"
                    name={info.name}
                    value={opt}
                    checked={quizFormState[info.name] === opt}
                    className="radio-inputs"
                    onChange={handleChange}
                  />

                  <motion.div 
                    className="radio"
                    key={opt}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      backgroundColor: quizFormState[info.name] === opt ? "#FE9844" : "transparent",
                      border: quizFormState[info.name] === opt ? "#FE9844" : "2px solid #CECECE",
                      color: quizFormState[info.name] === opt ? "#FFFFFF" : "#FE9844"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {
                    quizFormState[info.name] === opt
                      ? <i className="fa-solid fa-check"/>
                      : ""
                    }
                  </motion.div>
                </motion.label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

  
  if(isDesktopHorizontal){

    return(
      <SideBar
        setModal={setModalOpen}
        title="Edit User Info"
        isFooter={footer}
        footer={footer}
        isClose
      >
        {content}
      </SideBar>
    )
  }

  return(
    <BaseModal 
      handleClick={() => setModalOpen(false)}
      title={"Edit User Info"}  
      footer={footer}
    >
      {content}
    </BaseModal>
  )
}

export default QuizModal;