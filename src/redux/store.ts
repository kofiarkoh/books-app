import {
	PreloadedState,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import snackbarSlice from "./snackbarSlice";
import loginSlice from "./loginSlice";

export const rootReducer = combineReducers({
	snackbarState: snackbarSlice,
	loginState: loginSlice,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}
export const reduxStore = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
