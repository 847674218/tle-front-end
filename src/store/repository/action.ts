// 已重构
/**
 *  ----------仓库相关----------
 *  从GitHub请求所有仓库（GitHub监听服务器）
 *  请求已导入的仓库列表（后端）
 *  请求已导入仓库的细节（后端）
 *  删除已导入仓库（后端）
 */
import { getServerUrl, getGitHubServiceUrl } from "../../configs/get-url";
import { AppThunk } from "../store";
import {
  FETCH_REPOSITORY_FROM_GITHUB,
  FETCH_REPOSITORY_FROM_GITHUB_SUCCESS,
  FETCH_REPOSITORY_FROM_GITHUB_FAILURE,
  FETCH_IMPORTED_REPOSITORY_LIST,
  FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS,
  FETCH_IMPORTED_REPOSITORY_LIST_FAILURE,
  DELETE_REPOSITORY,
  DELETE_REPOSITORY_SUCCESS,
  DELETE_REPOSITORY_FAILURE,
  FETCH_IMPORTED_REPOSITORY_DETAIL,
  FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE,
  FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS,
  RepositoryActionTypes,
} from "./types";

// get 从GitHub请求所有仓库（GitHub监听服务器） githubAccessToken -> IGHRepositoryRes[] (github原生仓库数组)
export const fetchAllRepositoryFromGitHub = (): AppThunk<
  void,
  RepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: FETCH_REPOSITORY_FROM_GITHUB });
  try {
    const { authReducer: { gitHubAccessToken } } = getState();
    const res = await fetch(`${getGitHubServiceUrl()}/repos?token=${gitHubAccessToken}`, {
      headers: {
        accept: "application/json"
      }
    }).then(res => res.json());
    dispatch({ type: FETCH_REPOSITORY_FROM_GITHUB_SUCCESS, payload: res });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: FETCH_REPOSITORY_FROM_GITHUB_FAILURE });
  }
};

// get 请求已导入的仓库列表（存储在数据库中的数据）：仓库数组（包含所有信息） token -> IImportedRepository[]
export const fetchImportedRepositoryList = (): AppThunk<
  void,
  RepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: FETCH_IMPORTED_REPOSITORY_LIST });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("token");

    console.log(token);
    const res = await fetch(`${getServerUrl()}/api/repository`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
    console.log(res)
    if (res && res.success) {
      dispatch({
        type: FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS,
        payload: res.payload || []
      });
    } else {
      dispatch({
        type: FETCH_IMPORTED_REPOSITORY_LIST_FAILURE,
        meta: res.meta
      });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_IMPORTED_REPOSITORY_LIST_FAILURE });
  }
};

// get 请求已导入仓库的细节：单个仓库的所有信息 id -> IImportedRepository
export const fetchImportedRepositoryDetail = (
  repoId: string
): AppThunk<void, RepositoryActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_IMPORTED_REPOSITORY_DETAIL });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const res = await fetch(`${getServerUrl()}/api/repository/id/${repoId}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({
        type: FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE,
      });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE });
  }
};

// delete 删除已导入仓库 repoName -> 无返回
export const deleteRepository = (
  repoName: string
): AppThunk<void, RepositoryActionTypes> => async (dispatch, getState) => {
  dispatch({ type: DELETE_REPOSITORY });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const res = await fetch(`${getServerUrl()}/api/repository/${repoName}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: DELETE_REPOSITORY_SUCCESS, payload: repoName });
    } else {
      dispatch({ type: DELETE_REPOSITORY_FAILURE, meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: DELETE_REPOSITORY_FAILURE });
  }
};

// 更新仓库：设定仓库责任人