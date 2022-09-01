// 已重构
import { Action, applyMiddleware, compose, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import rootReducer, { RootState } from "./reducers";

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppThunk<ReturnType = void, a = string> = ThunkAction<ReturnType, RootState, unknown, Action<a>>;

export type AppDispatch<A extends Action<any>> = ThunkDispatch<RootState, any, A>;

// 创建store仓库
// const store = createStore(reducer);
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;