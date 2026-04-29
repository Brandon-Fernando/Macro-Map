import PageHeader from "../../components/PageHeader/PageHeader";
import UserInfo from "./components/UserInfo";
import "./Profile.css"
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/QuizContext";
import Macros from "../../components/Macros/Macros";
import QuizData from "./QuizData/QuizData";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../animations/motionVariants";
import { useState } from "react";
import QuizModal from "./components/QuizModal";
import useIsDesktopHorizontal from "../../hooks/useIsDesktopHorizontal";
import useIsDesktop from "../../hooks/useIsDesktop";
import PageHeaderDesktop from "../../components/PageHeader/PageHeaderDesktop";
import LogoutModal from "./components/LogoutModal";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { quizData } = useQuiz();
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const isDesktopHorizontal = useIsDesktopHorizontal();
  const isDesktop = useIsDesktop();

  return(
    <motion.div 
      className="page-container"
      animate={{
        marginRight: modalOpen && isDesktopHorizontal ? "386px" : "0px"
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {isDesktop ? (
        <PageHeaderDesktop 
          title="Profile"
        />
      ) : (
        <PageHeader 
          title="Profile"
        />
      )}

      <motion.div 
        className="profile-body"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ===== USER INFO =====  */}
        <motion.div variants={itemVariants}>
          <UserInfo 
            name={currentUser?.displayName}
            email={currentUser?.email}
            setLogoutModal={setLogoutModal}
          />
        </motion.div>

        {/* ====== NUTRITION GOALS ====== */}
        <motion.div variants={itemVariants}>
          {quizData?.results && (
            <Macros nutritionalFacts={quizData.results} isProfile/>
          )}
        </motion.div>
        
        {/* QUIZ ANSWERS  */}
        <motion.div variants={itemVariants}>
          <QuizData setModalOpen={setModalOpen}/>
        </motion.div>

        <AnimatePresence>
          {modalOpen && (
            <QuizModal setModalOpen={setModalOpen}/>
          )}

          {logoutModal && (
            <LogoutModal setModal={setLogoutModal} logout={logout}/>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Profile;