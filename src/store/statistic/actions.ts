// 已重构
/**
 *  ----------统计数据相关操作----------
 *  需求的统计：每个需求对应的类的个数
 *  类的统计：每个类对应的需求的个数
 *  请求统计图中需求的数量
 *  请求统计图中跟踪链接的数量
 */
import { AppThunk } from "./../store";
import {
  FETCH_REQUIREMENT_STATISTIC,
  FETCH_REQUIREMENT_STATISTIC_SUCCESS,
  FETCH_REQUIREMENT_STATISTIC_FAILURE,
  FETCH_FILE_STATISTIC,
  FETCH_FILE_STATISTIC_SUCCESS,
  FETCH_FILE_STATISTIC_FAILURE,
  FETCH_REQUIREMENT_NUMBER_STATISTIC,
  FETCH_REQUIREMENT_NUMBER_STATISTIC_SUCCESS,
  FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE,
  StatisticActionTypes,
  FETCH_TRACELINK_NUMBER_STATISTIC,
  FETCH_TRACELINK_NUMBER_STATISTIC_SUCCESS,
  FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE
} from "./types";
import { getServerUrl } from "../../configs/get-url";

// 需求的统计：每个需求对应的类的个数
export const fetchRequirementStatistic = (
  repoName: string,
  commitSha: string,
): AppThunk<void, StatisticActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_REQUIREMENT_STATISTIC });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no tokne");

    const res = await fetch(`${getServerUrl()}/api/statistic/requirement?repoName=${repoName}&commitSha=${commitSha}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => res.json());
    if (res && res.success) {
      console.log(res.payload);
      dispatch({
        type: FETCH_REQUIREMENT_STATISTIC_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({ type: FETCH_REQUIREMENT_STATISTIC_FAILURE, meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_REQUIREMENT_STATISTIC_FAILURE });
  }
};

// 类的统计：每个类对应的需求的个数
export const fetchFileStatistic = (
  repoName: string,
  commitSha: string,
): AppThunk<void, StatisticActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_FILE_STATISTIC });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no tokne");

    const res = await fetch(`${getServerUrl()}/api/statistic/file?repoName=${repoName}&commitSha=${commitSha}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => res.json());
    if (res && res.success) {
      console.log(res.payload)
      dispatch({ type: FETCH_FILE_STATISTIC_SUCCESS, payload: res.payload });
    } else {
      dispatch({ type: FETCH_FILE_STATISTIC_FAILURE });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_FILE_STATISTIC_FAILURE });
  }
};

// 请求统计图中需求的数量
export const fetchRequirementNumberStatistic = (
  repoName: string,
  commitSha: string,
): AppThunk<void, StatisticActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_REQUIREMENT_NUMBER_STATISTIC });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no tokne");

    const res = await fetch(`${getServerUrl()}/api/statistic/requirementnumber?repoName=${repoName}&commitSha=${commitSha}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => res.json());
    if (res && res.success) {
      console.log(res.payload);
      dispatch({
        type: FETCH_REQUIREMENT_NUMBER_STATISTIC_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({ type: FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE });
  }
};

// 请求统计图中需求的数量
export const fetchTraceLinkNumberStatistic = (
  repoName: string,
  commitSha: string,
): AppThunk<void, StatisticActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_TRACELINK_NUMBER_STATISTIC });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no tokne");

    const res = await fetch(`${getServerUrl()}/api/statistic/tracelinknumber?repoName=${repoName}&commitSha=${commitSha}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => res.json());
    if (res && res.success) {
      console.log(res.payload);
      dispatch({
        type: FETCH_TRACELINK_NUMBER_STATISTIC_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({ type: FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE });
  }
};