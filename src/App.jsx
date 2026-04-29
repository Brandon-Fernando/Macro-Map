import { Routes, Route, Outlet } from "react-router-dom";
import './App.css'
import React from 'react';

import Home from './pages/Home/Home';
import Login from  './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from "./pages/Dashboard/Dashboard";
import Pantry from "./pages/Pantry/Pantry";
import Meals from "./pages/Meals/Meals";
import LogMeals from "./pages/Meals/LogMeals/LogMeals";
import MealPrep from "./pages/Meals/MealPrep/MealPrep";
import SavedMeals from "./pages/Meals/SavedMeals/SavedMeals";
import ShowSavedMealPreps from "./pages/Meals/SavedMeals/components/ShowSavedMealPreps";
import Profile from "./pages/Profile/Profile";
import QuizData from "./pages/Profile/QuizData/QuizData";
import GenerateMeals from "./pages/Meals/GenerateMeals/GenerateMeals";

import PrivateRoute from "./components/AuthForm/PrivateRoute";
import Layout from "./layout/Layout";
import { QuizProvider } from "./context/QuizContext";
import { PantryProvider } from "./context/PantryContext";
import { LogProvider } from "./context/LogContext";
import { MealProvider } from "./context/MealContext";



import { AuthProvider } from "./context/AuthContext";
import QuizPage from "./pages/Quiz/QuizPage";
import Test from "./pages/Meals/SavedMeals/components/Test";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes  */}
        <Route path='/' element={<Home />}/>
        <Route path="/Login" element={
          <QuizProvider>
            <Login />
          </QuizProvider>} 
        />

        <Route path="/Signup" element={
          <QuizProvider>
            <Signup />
          </QuizProvider>} 
        />

        <Route path="/Quiz" element={
          <PrivateRoute>
            <QuizProvider>
              <QuizPage />
            </QuizProvider>
          </PrivateRoute>} 
        />

        <Route
          element={
            <PrivateRoute>
              <Layout>
                <QuizProvider>
                  <PantryProvider>
                    <LogProvider>
                      <MealProvider>
                        <Outlet />
                      </MealProvider>
                    </LogProvider>
                  </PantryProvider>
                </QuizProvider>
              </Layout>
              
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/meals" element={<Meals />}>
            <Route path="log" element={<LogMeals />}/>
            <Route path="prep" element={<MealPrep />}/>
            <Route path="generate" element={<GenerateMeals/>}/>
            <Route path="saved" element={<SavedMeals />}>
              <Route path="mealPrep" element={<ShowSavedMealPreps />} />
            </Route>
          </Route>
          <Route path="/profile" element={<Profile />}>
            <Route path="quiz_data" element={< QuizData/>}/>
          </Route>
        </Route>

      </Routes>
    </AuthProvider>
  )
}

export default App
