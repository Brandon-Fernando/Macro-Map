import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { useContext, useState, createContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../../utils/firebase";
import { calculateCaloriesAndMacros } from "../pages/Quiz/utils/quizUtils";

const QuizContext = createContext();
export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
	const { currentUser } = useAuth();
	const [quizData, setQuizData] = useState(null);
	const [quizLoading, setQuizLoading] = useState(true);

	// ===== SAVE QUIZ IN CONTEXT =====
	const saveQuizData = (data) => setQuizData(data);

	// ===== SAVE QUIZ TO FIRESTORE =====
	const saveQuizToFirestore = async (data) => {
		if (!currentUser) return;

		try {
			await setDoc(
				doc(db, "users", currentUser.uid, "quizResults", "latest"),
				{ ...data, updatedAt: serverTimestamp() }
			);
			console.log("Quiz saved!");
		} catch (error) {
			console.error("Error saving quiz: ", error);
		}
	};

	// ===== COMBINED FUNCTION =====
	const saveQuiz = async (data) => {
		saveQuizData(data);
		await saveQuizToFirestore(data);
	};

	// ===== FETCH LATEST QUIZ/MACROS FROM FIRESTORE =====
	const fetchLatestQuiz = async () => {
		if (!currentUser) {
			setQuizData(null);
			setQuizLoading(false);
			return;
		}

		setQuizLoading(true);

		try {
			const quizRef = doc(db, "users", currentUser.uid, "quizResults", "latest");
			const snapshot = await getDoc(quizRef);

			if (snapshot.exists()) {
				const latestQuiz = snapshot.data();
				setQuizData(latestQuiz);
				return latestQuiz;
			} else {
				setQuizData(null);
			}
		} catch (error) {
			console.error("Error fetching quiz: ", error);
			setQuizData(null);
		} finally {
			setQuizLoading(false);
		}
	};

	useEffect(() => {
		if (!currentUser) {
			setQuizData(null);
			setQuizLoading(false);
			return;
		}
	
		setQuizLoading(true);
	
		const quizRef = doc(db, "users", currentUser.uid, "quizResults", "latest");
	
		const unsubscribe = onSnapshot(
			quizRef,
			(snapshot) => {
				if (snapshot.exists()) {
					setQuizData({
						...snapshot.data(),
						id: snapshot.id,
					});
				} else {
					setQuizData(null);
				}
				setQuizLoading(false);
			},
			(error) => {
				console.error("Error listening to quiz:", error);
				setQuizData(null);
				setQuizLoading(false);
			}
		);
	
		return () => unsubscribe();
	}, [currentUser]);

	// ===== UPDATE QUIZ ANSWERS ===== 
	const updateQuizAnswer = async (updatedAnswer) => {
		if(!currentUser) return;

		try{
			const quizRef = doc(db, "users", currentUser.uid, "quizResults", "latest");
			const snapshot = await getDoc(quizRef);

			if(!snapshot.exists()){
				console.error("No quiz");
				return;
			}

			const currentQuiz = snapshot.data();

			const updatedQuiz = {
				...currentQuiz, 
				...updatedAnswer
			}

			const updatedResults = calculateCaloriesAndMacros(updatedQuiz);

			const finalQuizData = {
				...updatedQuiz, 
				results: updatedResults,
			};

			await saveQuizToFirestore(finalQuizData);
			console.log("Updated")
		} catch (error){
			console.error(error)
		}
		


	}

	// ===== AUTO FETCH WHEN USER LOGS IN =====
	useEffect(() => {
		fetchLatestQuiz();
	}, [currentUser]);
	

	return (
		<QuizContext.Provider
			value={{
				quizData,
				quizLoading,
				saveQuiz,
				saveQuizData,
				fetchLatestQuiz,
				updateQuizAnswer
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};