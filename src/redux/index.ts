import { applyMiddleware, combineReducers, createStore } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// middlewares
import thunk, { ThunkMiddleware } from "redux-thunk";

// reducers
import QuizReducer from "./reducers/QuizReducer";

// extentions
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  quiz: QuizReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// inits
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware))
);
// types
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default { store, useAppDispatch, useAppSelector };
