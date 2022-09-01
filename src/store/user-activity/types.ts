// 已重构
/**
 *  ----------动态相关（静态数据）----------
 *  请求所有用户动态数据
 */
import { IUserActivity } from "../../types/index";

export const FETCH_USER_ACTIVITY = "FETCH_USER_ACTIVITY";
export const FETCH_USER_ACTIVITY_SUCCESS = "FETCH_USER_ACTIVITY_SUCCESS";
export const FETCH_USER_ACTIVITY_FAILURE = "FETCH_USER_ACTIVITY_FAILURE";

export interface IUserActivityState {
  loading: boolean;
  error: boolean;
  activities: IUserActivity[];
}

export interface IFetchUserActivityAction {
  type: typeof FETCH_USER_ACTIVITY;
}

export interface IFetchUserActivitySuccessAction {
  type: typeof FETCH_USER_ACTIVITY_SUCCESS;
  payload: IUserActivity[];
}

export interface IFetchuserActivityFailureAction {
  type: typeof FETCH_USER_ACTIVITY_FAILURE;
}

export type UserActivityActions =
  | IFetchUserActivityAction
  | IFetchUserActivitySuccessAction
  | IFetchuserActivityFailureAction;

export type UserActivityActionTypes =
  | typeof FETCH_USER_ACTIVITY
  | typeof FETCH_USER_ACTIVITY_SUCCESS
  | typeof FETCH_USER_ACTIVITY_FAILURE;