export const calculateCaloriesAndMacros = ({
    Age,
    Gender,
    Weight,
    Feet,
    Inches,
    ActivityLevel,
    Goal,
  }) => {
    const height = (Feet * 30.48) + (Inches * 2.54);
    const weight_kgs = Weight / 2.205;
  
    const bmr =
      Gender === "male"
        ? 10 * weight_kgs + 6.25 * height - 5 * Age + 5
        : 10 * weight_kgs + 6.25 * height - 5 * Age - 161;
  
    const activityMultipliers = {
      sedentary: 1.2,
      lightly: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9,
    };
  
    const tdee = bmr * (activityMultipliers[ActivityLevel] || 1.2);
  
    let calorieAdjustment = 0;
    if (Goal === "lose") calorieAdjustment = -0.2;
    else if (Goal === "gain") calorieAdjustment = 0.15;
  
    const calories = Math.round(tdee * (1 + calorieAdjustment));
    const protein = Math.round(Weight * 1.0); // ~1g per lb
    const fat = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - (protein * 4 + fat * 9)) / 4);
  
    return { 
      calories,
      protein, 
      carbs, 
      fat
    };
  };