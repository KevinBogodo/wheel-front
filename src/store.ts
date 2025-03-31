import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice"; // Votre fichier index des reducers

// Configuration du store avec Redux Toolkit
export const store = configureStore({
    reducer: rootReducer, // Combine tous vos reducers
});

// Typage global pour le dispatch et le state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
