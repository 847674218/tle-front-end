// 已重构
/**
 *  ----------需求相关操作----------
 *  把需求存储在数据库中
 *  请求仓库对应的需求
 *  改变添加需求模态框的显示状态
 *  添加单条需求规约
 *  删除单条需求规约
 */
import {
  POST_REQUIREMENT,
  POST_REQUIREMENT_SUCCESS,
  POST_REQUIREMENT_FAILURE,
  FETCH_REPO_REQUIREMENT,
  FETCH_REPO_REQUIREMENT_SUCCESS,
  FETCH_REPO_REQUIREMENT_FAILURE,
  TOGGLE_ADD_REQUIREMENT_MODAL,
  ADD_REQUIREMENT,
  ADD_REQUIREMENT_SUCCESS,
  ADD_REQUIREMENT_FAILURE,
  DELETE_REQUIREMENT,
  DELETE_REQUIREMENT_SUCCESS,
  DELETE_REQUIREMENT_FAILURE,
  RequirementActions,
  RequirementActionTypes,
} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./../reducers";
import { AppThunk, AppDispatch } from "./../store";
import { IRequirement, IRequirementDescription } from "./../../types/index";
import { getServerUrl } from "../../configs/get-url";

// post 把需求存储在数据库中 requirement -> 无返回
export const postRequirement = (
  requirement: Omit<IRequirement, "_id">
): AppThunk<void, RequirementActionTypes> => async (dispatch, getState) => {
  dispatch({ type: POST_REQUIREMENT });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const res = await fetch(`${getServerUrl()}/api/requirement`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify(requirement)
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: POST_REQUIREMENT_SUCCESS });
    } else {
      dispatch({ type: POST_REQUIREMENT_FAILURE, meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: ADD_REQUIREMENT_FAILURE });
  }
};

// get 请求仓库对应的需求 repoName、commitSha -> IRequirement
export const fetchRepoRequirement = (
  repoName: string,
  commitSha: string,
): AppThunk<void, RequirementActions> => async (
  dispatch: ThunkDispatch<RootState, any, RequirementActions>,
  getState
) => {
    dispatch({ type: FETCH_REPO_REQUIREMENT });
    try {
      const { authReducer: { token } } = getState();
      if (!token) throw new Error("no token");

      const res = await fetch(`${getServerUrl()}/api/requirement?repoName=${repoName}&commitSha=${commitSha}`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then(res => res.json());
      if (res && res.success) {
        dispatch({ type: FETCH_REPO_REQUIREMENT_SUCCESS, payload: res.payload });
      } else {
        dispatch({ type: FETCH_REPO_REQUIREMENT_FAILURE, meta: res.meta });
      }
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.log(e);
      }
      dispatch({ type: FETCH_REPO_REQUIREMENT_FAILURE });
    }
  };

// 改变添加需求模态框的显示状态
export const toggleAddRequirementModal = (): RequirementActions => {
  return {
    type: TOGGLE_ADD_REQUIREMENT_MODAL
  };
};

// post 添加单条需求规约 requirementId、requirementDescription -> IRequirement（新的需求列表）
export const addRequirement = (
  requirementId: string,
  requirementDescription: Omit<IRequirementDescription, "_id">
): AppThunk<void, RootState> => async (
  dispatch: AppDispatch<RequirementActions>,
  getState
) => {
    dispatch({ type: ADD_REQUIREMENT });
    try {
      const { authReducer: { token } } = getState();
      if (!token) throw new Error("no token");

      const url = `${getServerUrl()}/api/requirement/description/${requirementId}`;
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ ...requirementDescription }),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const res = await fetch(url, options).then(res => res.json());
      if (res && res.success) {
        dispatch({ type: ADD_REQUIREMENT_SUCCESS, payload: res.payload });
        dispatch(toggleAddRequirementModal());
      } else {
        dispatch({ type: ADD_REQUIREMENT_FAILURE, meta: res.meta });
      }
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.log(e);
      }
      dispatch({ type: ADD_REQUIREMENT_FAILURE });
    }
  };

// delete 删除单条需求规约 requirementId、description -> IRequirement（新的需求列表）
export const deleteRequirement = (
  requirementId: string,
  description: IRequirementDescription
): AppThunk<void, RequirementActionTypes> => async (dispatch, getState) => {
  dispatch({ type: DELETE_REQUIREMENT });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const url = `${getServerUrl()}/api/requirement/description`;
    const options: RequestInit = {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        requirementId,
        description
      })
    };
    const res = await fetch(url, options).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: DELETE_REQUIREMENT_SUCCESS,
        payload: res.payload
      })
    } else {
      dispatch({ type: DELETE_REQUIREMENT_FAILURE });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: DELETE_REQUIREMENT_FAILURE });
  }
};