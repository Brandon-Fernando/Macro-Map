
import { 
	createContext, 
	useContext, 
	useEffect, 
	useState, 
	useCallback
} from "react";

import { 
	collection, 
	doc, 
	addDoc, 
	setDoc, 
	increment, 
	onSnapshot, 
	deleteDoc, 
	updateDoc, 
	query, 
	where
} from "firebase/firestore";

import { db } from "../../utils/firebase";
import { useAuth } from "./AuthContext";

import { useQuiz } from "./QuizContext";

const LogContext = createContext();
export const useLogContext = () => useContext(LogContext);

const round1 = (num) => 
	Math.round((Number(num) + Number.EPSILON) * 10) / 10;

const getLocalDateString = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const formatLocalDate = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export const LogProvider = ({ children }) => {
	const { currentUser } = useAuth();
	const { quizData }  = useQuiz();

	const [selectedDate, setSelectedDate] = useState(getLocalDateString());
	const [logFoodData, setLogFoodData] = useState([]);
	const [macroTotals, setMacroTotals] = useState({
		calories: 0, 
		protein: 0, 
		carbs: 0, 
		fat: 0, 
		overallProgress: 0
	});
	const [weeklyOverallProgress, setWeeklyOverallProgress] = useState([])

	// ==== WEEKLY PROGRESS ====
	const getWeekOverallProgress = useCallback((startOfWeek) => {
		if (!currentUser || !startOfWeek) return () => {};
	
		const weekDates = Array.from({ length: 7 }, (_, i) => {
			const d = new Date(startOfWeek);
			d.setDate(startOfWeek.getDate() + i);
			return formatLocalDate(d);
		});
	
		const startDate = weekDates[0];
		const endDate = weekDates[6];
	
		const logsRef = collection(db, "users", currentUser.uid, "foodLogs");
	
		const q = query(
			logsRef,
			where("date", ">=", startDate),
			where("date", "<=", endDate)
		);
	
		return onSnapshot(q, (snapshot) => {
			const progressMap = {};
	
			snapshot.docs.forEach((docSnap) => {
				const data = docSnap.data();
				progressMap[data.date] = data.overallProgress || 0;
			});
	
			const filledWeek = weekDates.map((date) => ({
				date,
				overallProgress: round1(progressMap[date] || 0)
			}));
	
			setWeeklyOverallProgress(filledWeek);
		});
	}, [currentUser]);

	// ==== DAILY PROGRESS PERCENTAGE =====
	useEffect(() => {
		if(!currentUser || !quizData?.results) return;

		const saveOverallProgress = async () => {

			const totalsRef = doc(
				db, 
				"users", 
				currentUser.uid, 
				"foodLogs", 
				selectedDate
			)

			const getSafePercentage = (current, goal) => {
				if(!goal || goal <= 0) return 0;
				return (current / goal) * 100
			};

			const overallProgress = round1(
				(
					getSafePercentage(macroTotals.calories, quizData.results.calories) + 
					getSafePercentage(macroTotals.protein, quizData.results.protein) + 
					getSafePercentage(macroTotals.carbs, quizData.results.cabrs) + 
					getSafePercentage(macroTotals.fat, quizData.results.fat) 
				) / 4
			);

			await setDoc(
				totalsRef, 
				{ overallProgress }, 
				{merge: true}
			);
		}

		saveOverallProgress()
	}, [currentUser, quizData, macroTotals, selectedDate])

	// ==== GET REAL TIME FOOD ITEMS (PER DAY) ===== 
	useEffect(() => {
		if (!currentUser) return;

		const itemsRef = collection(
			db, 
			"users", 
			currentUser.uid, 
			"foodLogs", 
			selectedDate, 
			"items"
		);

		const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
			setLogFoodData(
				snapshot.docs.map(doc => ({
					...doc.data(),
					id: doc.id
				}))
			);
		});

		return () => unsubscribe();
	}, [currentUser, selectedDate])

	// ==== GET REAL TIME MACRO TOTALS (PER DAY) ===== 
	useEffect(() => {
		if(!currentUser) return;

		const totalsRef = doc(
			db, 
			"users", 
			currentUser.uid, 
			"foodLogs", 
			selectedDate
		);

		const unsubscribe = onSnapshot(totalsRef, (docSnap) => {
			if(!docSnap.exists()) {
				setMacroTotals({
					calories: 0, 
					protein: 0, 
					carbs: 0, 
					fat: 0, 
					overallProgress: 0
				});

				return;
			}

			const data = docSnap.data();

			setMacroTotals({
				calories: round1(data.calories || 0), 
				protein: round1(data.protein || 0), 
				carbs: round1(data.carbs || 0), 
				fat: round1(data.fat || 0), 
				overallProgress: data.overallProgress || 0
			});
		});

		return () => unsubscribe();
	}, [currentUser, selectedDate])

	// ===== GET MACROS ===== 
	const getMacros = (foodItem) => {
		const raw = foodItem?.items?.macros 
		? foodItem?.items?.macros
		: foodItem;

		return{
			calories: round1(raw.calories || 0), 
			protein: round1(raw.protein || 0), 
			carbs: round1(raw.carbs || 0), 
			fat: round1(raw.fat || 0)
		};
	};

	// ===== LOG FOOOD =====
	const logFood = async (foodItem) => {
		if (!currentUser) return;

		const macros = getMacros(foodItem);

		const itemsRef = collection(
			db, 
			"users", 
			currentUser.uid, 
			"foodLogs", 
			selectedDate, 
			"items"
		);

		await addDoc(itemsRef, foodItem);

		// INCREMENT TOTALS 
		const totalsRef = doc(
			db, 
			"users", 
			currentUser.uid, 
			"foodLogs", 
			selectedDate
		);

		await setDoc(
			totalsRef, 
			{
				date: selectedDate, 
				calories: increment(macros.calories || 0), 
				protein: increment(macros.protein || 0), 
				carbs: increment(macros.carbs || 0), 
				fat: increment(macros.fat || 0)
			}, 
			{merge: true}
		);
	};

	// ===== UPDATE FOOD ===== 
	const updateLogFood = async (foodItemID, orignialFood, newFood) => {
		if(!currentUser || !foodItemID) return;

		const originalMacros = getMacros(orignialFood);
		const newMacros = getMacros(newFood);

		const delta = {
			calories: round1(newMacros.calories - originalMacros.calories),
			protein: round1(newMacros.protein - originalMacros.protein), 
			carbs: round1(newMacros.carbs - originalMacros.carbs), 
			fat: round1(newMacros.fat - originalMacros.fat) 
		};

		const itemsRef = doc(
			db, 
			"users", 
			currentUser.uid, 
			"foodLogs", 
			selectedDate, 
			"items", 
			foodItemID
		);

		const totalsRef = doc(
			db, 
			"users", 
			currentUser.uid, 
			"foodLogs", 
			selectedDate
		);

		await updateDoc(itemsRef, {
			...newFood
		});

		await setDoc(
			totalsRef, 
			{
				calories: increment(delta.calories), 
				protein: increment(delta.protein), 
				carbs: increment(delta.carbs), 
				fat: increment(delta.fat)
			}, 
			{merge: true}
		)
	}

	// ===== DELETE FOOD ===== 
	const deleteLogFood = async (foodItem) => {
		if(!currentUser || !foodItem.id) return;

		const macros = getMacros(foodItem);

		const itemsRef = doc(
			db, 
			"users", 
			currentUser.uid, 
			"foodLogs",
			selectedDate, 
			"items", 
			foodItem.id
		);

		const totalsRef = doc(
			db, 
			"users", 
			currentUser.uid, 
			"foodLogs", 
			selectedDate
		);

		await deleteDoc(itemsRef);

		await setDoc(
			totalsRef, 
			{
				calories: increment(-macros.calories), 
				protein: increment(-macros.protein), 
				carbs: increment(-macros.carbs), 
				fat: increment(-macros.fat)
			}, 
			{merge: true}
		)
	}

	// ===== GET MEAL TYPE MACROS ===== 
	const getMealTypeTotals = (mealType) => {
		const totals = logFoodData
		.filter(item => item.mealType === mealType)
		.reduce(
			(totals, item) => {
				const macros = getMacros(item);

				totals.calories += macros.calories;
				totals.protein += macros.protein;
				totals.carbs += macros.carbs;
				totals.fat += macros.fat;

				return totals;
			}, 
			{calories: 0, protein: 0, carbs: 0, fat: 0}
		);

		return {
			calories: round1(totals.calories), 
			protein: round1(totals.protein), 
			carbs: round1(totals.carbs), 
			fat: round1(totals.fat)
		};
	}

	return(
		<LogContext.Provider
			value={{
				logFood, 
				logFoodData, 
				macroTotals,
				selectedDate,
				setSelectedDate, 
				updateLogFood, 
				deleteLogFood, 
				getMealTypeTotals, 
				getWeekOverallProgress, 
				weeklyOverallProgress
			}}
		>
			{children}
		</LogContext.Provider>
	)
}