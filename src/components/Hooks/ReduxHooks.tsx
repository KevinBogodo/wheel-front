import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Hook pour un dispatch typé
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook pour un state typé
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
