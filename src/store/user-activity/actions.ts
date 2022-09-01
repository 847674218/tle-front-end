// 已重构
/**
 *  ----------动态相关（静态数据）----------
 *  请求所有用户动态数据
 */
import { AppThunk } from "./../store";
import { activity } from "./../../stubs/activity";
import {
  FETCH_USER_ACTIVITY,
  FETCH_USER_ACTIVITY_SUCCESS,
  FETCH_USER_ACTIVITY_FAILURE,
  UserActivityActionTypes
} from "./types";

export const fetchUserActivity = (): AppThunk<
  void,
  UserActivityActionTypes
> => async dispatch => {
  dispatch({ type: FETCH_USER_ACTIVITY });
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    dispatch({ type: FETCH_USER_ACTIVITY_SUCCESS, payload: activity });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_USER_ACTIVITY_FAILURE });
  }
};