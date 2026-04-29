import React, { createContext, useState, useContext, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAuth } from "./AuthContext";

const PantryContext = createContext();
export const usePantryContext = () => useContext(PantryContext);

export const PantryProvider = ({children}) => {
    const { currentUser } = useAuth();
    const [pantryData, setPantryData] = useState([]);
    const [loading, setLoading] = useState(true);

    const savePantryData = (data) => setPantryData(data);

    const savePantryToFirestore = async (data) => {
    	if(!currentUser) return;

      try {
				const pantryRef = doc(db, "users", currentUser.uid, "pantry", "pantry-items");
				await setDoc(pantryRef, { items: data });
				console.log("Pantry saved to Firestore ✅");
			} catch (error) {
				console.error("Error saving pantry:", error);
			}
    }

		const savePantry = async (foodItem) => {

			const cleanItem = {
				id: crypto.randomUUID(), 
				serving: foodItem.serving || 1, 
				servingUnit: foodItem.servingUnit || null,
				brand: foodItem.brand || null,
				foodName: foodItem.foodName || foodItem.food_name || "unknown food", 
				calories: foodItem.calories ?? 0, 
				protein: foodItem.protein ?? 0, 
				carbs: foodItem.carbs ?? 0, 
				fat: foodItem.fat ?? 0

			}
			const updatedPantry = [...pantryData, cleanItem];
			setPantryData(updatedPantry);
			await savePantryToFirestore(updatedPantry);
		}

		const updatePantry = async (updatedItem) => {
			const cleanItem = {
				id: updatedItem.id, 
				serving: updatedItem.serving,
				servingUnit: updatedItem.servingUnit,
				brand: updatedItem.brand,
				foodName: updatedItem.foodName, 
				calories: updatedItem.calories, 
				protein: updatedItem.protein, 
				carbs: updatedItem.carbs, 
				fat: updatedItem.fat,
			}

			const updatedPantry = pantryData.map((item) => 
				item.id === cleanItem.id ? cleanItem : item
			)
			setPantryData(updatedPantry)
			await savePantryToFirestore(updatedPantry)

		}

		const deletePantryItem = async (itemId) => {
			const updatedPantry = pantryData.filter((item) => item.id !== itemId);
			setPantryData(updatedPantry);
			await savePantryToFirestore(updatedPantry);
		};


		useEffect(() => {
			const fetchPantry = async () => {
				if (!currentUser) return;
				setLoading(true);
				try {
					const pantryRef = doc(db, "users", currentUser.uid, "pantry", "pantry-items");
					const pantrySnap = await getDoc(pantryRef);
					if (pantrySnap.exists()) {
						setPantryData(pantrySnap.data().items || []);
					} else {
						setPantryData([]);
					}
				} catch (error) {
					console.error("Error fetching pantry:", error);
				} finally {
					setLoading(false);
				}
			};
	
			fetchPantry();
		}, [currentUser]);

		return (
			<PantryContext.Provider value={{ pantryData, savePantry, savePantryData, loading, updatePantry, deletePantryItem}}>
				{children}
			</PantryContext.Provider>
		)
}