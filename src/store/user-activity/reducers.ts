// 已重构
/**
 *  ----------动态相关（静态数据）----------
 *  请求所有用户动态数据
 */
import {
  FETCH_USER_ACTIVITY,
  FETCH_USER_ACTIVITY_SUCCESS,
  FETCH_USER_ACTIVITY_FAILURE,
  IFetchUserActivitySuccessAction
} from "./../user-activity/types";
import { IUserActivityState, UserActivityActions } from "./types";

const initialState: IUserActivityState = {
  loading: false,
  activities: [],
  error: false
};

export const userActivityReducer = (
  state = initialState,
  action: UserActivityActions
): IUserActivityState => {
  switch (action.type) {
    case FETCH_USER_ACTIVITY:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_USER_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: (action as IFetchUserActivitySuccessAction).payload
      };
    case FETCH_USER_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return {
        ...state
      };
  }
};