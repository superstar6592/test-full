import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { projectReducer } from "@/store/projectSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const isBrowser = typeof window !== "undefined";

const projectPersistConfig = {
    key: "project",
    storage: isBrowser ? storage : undefined,
    whitelist: ["projectId"],
};

const persistedProjectReducer = isBrowser
    ? persistReducer(projectPersistConfig, projectReducer)
    : projectReducer;

const rootReducer = combineReducers({
    project: persistedProjectReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;