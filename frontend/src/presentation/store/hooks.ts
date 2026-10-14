import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from ".";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootStore>();
