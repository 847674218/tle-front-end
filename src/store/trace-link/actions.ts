// 已重构
/**
 *  ----------跟踪链接相关操作----------
 *  将跟踪链接存储在数据库中
 *  请求文件对应的跟踪链接（仓库名称、提交SHA、文件名）
 *  请求需求对应的跟踪链接
 *  添加一条新的跟踪链接
 *  请求需要投票的跟踪链接
 *  请求仓库对应的跟踪链接
 *  更新投票结果
 */
import {
  SEND_INIT_TRACE_LINK,
  SEND_INIT_TRACE_LINK_SUCCESS,
  SEND_INIT_TRACE_LINK_FAILURE,
  FETCH_FILE_RELATED_TRACE_LINK,
  FETCH_FILE_RELATED_TRACE_LINK_SUCCESS,
  FETCH_FILE_RELATED_TRACE_LINK_FAILURE,
  FETCH_DESCRIPTION_RELATED_TRACE_LINK,
  FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS,
  FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE,
  ADD_TRACE_LINK,
  ADD_TRACE_LINK_SUCCESS,
  ADD_TRACE_LINK_FAILURE,
  FETCH_NEED_VOTE_TRACE_LINK,
  FETCH_NEED_VOTE_TRACE_LINK_SUCCESS,
  FETCH_NEED_VOTE_TRACE_LINK_FAILURE,
  FETCH_REPO_TRACE_LINK,
  FETCH_REPO_TRACE_LINK_SUCCESS,
  FETCH_REPO_TRACE_LINK_FAILURE,
  UPDATE_VOTE_RESULT,
  UPDATE_VOTE_RESULT_SUCCESS,
  UPDATE_VOTE_RESULT_FAILURE,
  TraceLinkActionTypes,
  TraceLinkActions,
} from "./types";
import { ITraceLink, ITraceLinkMatrix } from "./../../types/index";
import { AppDispatch, AppThunk } from "./../store";
import { getServerUrl } from "../../configs/get-url";
// import { traceLinkMatrix } from "../../stubs/trace-link-matrix";

// post 将跟踪链接存储在数据库中 matrix -> 无返回
export const sendInitTraceLink = (
  matrix: Omit<ITraceLinkMatrix, "_id">
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: SEND_INIT_TRACE_LINK });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const res = await fetch(`${getServerUrl()}/api/tracelink`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(matrix)
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: SEND_INIT_TRACE_LINK_SUCCESS });
    } else {
      dispatch({ type: SEND_INIT_TRACE_LINK_FAILURE, meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: SEND_INIT_TRACE_LINK_FAILURE });
  }
};

// get 请求文件对应的跟踪链接（repoName、commitSha、fileName） -> 返回fileRelatedTraceLinks: ITraceLink[]
export const fetchFileRelatedTraceLinks = (
  repoName: string,
  commitSha: string,
  fileName: string
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_FILE_RELATED_TRACE_LINK });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const res = await fetch(
      `${getServerUrl()}/api/tracelink?file=${fileName}&repoName=${repoName}&commitSha=${commitSha}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: FETCH_FILE_RELATED_TRACE_LINK_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({ type: FETCH_FILE_RELATED_TRACE_LINK_FAILURE });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_FILE_RELATED_TRACE_LINK_FAILURE });
  }
};

// get 请求需求对应的跟踪链接 （repoName、commitSha、descriptionName） -> requirementRelatedTraceLinks：ITraceLink[]
export const fetchDescriptionRelatedTraceLinks = (
  repoName: string,
  commitSha: string,
  descriptionName: string
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_DESCRIPTION_RELATED_TRACE_LINK });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const res = await fetch(`${getServerUrl()}/api/tracelink?descriptionName=${descriptionName}&repoName=${repoName}&commitSha=${commitSha}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({
        type: FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE,
        meta: res.meta
      });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE });
  }
};

// post 添加一条新的跟踪链接（repoName、commitSha、traceLink） -> 无返回
export const addTraceLink = (
  repoName: string,
  commitSha: string,
  traceLink: Omit<ITraceLink, "_id">,
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: ADD_TRACE_LINK });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const url = `${getServerUrl()}/api/tracelink/new`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        repoName,
        commitSha,
        newTraceLink: traceLink
      }),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    const res = await fetch(url, options).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: ADD_TRACE_LINK_SUCCESS });
    } else {
      dispatch({ type: ADD_TRACE_LINK_FAILURE, meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: ADD_TRACE_LINK_FAILURE });
  }
};

// get 请求需要投票的跟踪链接 repoName、commitSha、userName -> needVoteTraceLinks: ITraceLink[]
export const fetchNeedVoteTeaceLink = (
  repoName: string,
  commitSha: string,
  userName: string,
): AppThunk<void, TraceLinkActionTypes> => async (
  dispatch: AppDispatch<TraceLinkActions>,
  getState
) => {
    dispatch({ type: FETCH_NEED_VOTE_TRACE_LINK });
    try {
      const { authReducer: { token } } = getState();
      if (!token) throw new Error("no token");

      const url = `${getServerUrl()}/api/tracelink/needvote?repoName=${repoName}&commitSha=${commitSha}&userName=${userName}`;
      const res = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json());
      console.log(res)
      if (res && res.success) {
        dispatch({ type: FETCH_NEED_VOTE_TRACE_LINK_SUCCESS, payload: res.payload });
      } else {
        dispatch({ type: FETCH_NEED_VOTE_TRACE_LINK_FAILURE, meta: res.meta });
      }
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.log(e);
      }
      dispatch({ type: FETCH_NEED_VOTE_TRACE_LINK_FAILURE });
    }
  };

// // get 请求仓库对应的跟踪链接 repoName、commitSha -> traceLinks:ITraceLink[]
// export const fetchRepoTeaceLink = (
//   repoName: string,
//   commitSha: string,
// ): AppThunk<void, TraceLinkActionTypes> => async (
//   dispatch: AppDispatch<TraceLinkActions>,
//   getState
// ) => {
//     dispatch({ type: FETCH_REPO_TRACE_LINK });
//     try {
//       const { authReducer: { token } } = getState();
//       if (!token) throw new Error("no token");

//       const url = `${getServerUrl()}/api/tracelink/repo?repoName=${repoName}&commitSha=${commitSha}`;
//       const res = await fetch(url, {
//         credentials: "include",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }).then(res => res.json());
//       console.log(res)
//       if (res && res.success) {
//         dispatch({ type: FETCH_REPO_TRACE_LINK_SUCCESS, payload: res.payload });
//       } else {
//         dispatch({ type: FETCH_REPO_TRACE_LINK_FAILURE, meta: res.meta });
//       }
//     } catch (e) {
//       if (process.env.NODE_ENV !== "production") {
//         console.log(e);
//       }
//       dispatch({ type: FETCH_REPO_TRACE_LINK_FAILURE });
//     }
//   };

// post 更新投票结果 repoName、commitSha、traceLinkId、userName、vote -> newTraceLink:ITraceLink
export const updateVoteResult = (
  repoName: string,
  commitSha: string,
  traceLinkId: string,
  userName: string,
  vote: "pass" | "reject"
): AppThunk<void, TraceLinkActionTypes> => async (
  dispatch: AppDispatch<TraceLinkActions>,
  getState
) => {
    dispatch({ type: UPDATE_VOTE_RESULT });
    try {
      const { authReducer: { token } } = getState();
      if (!token) throw new Error("no token");

      const url = `${getServerUrl()}/api/tracelink/vote?repoName=${repoName}&commitSha=${commitSha}&traceLinkId=${traceLinkId}&userName=${userName}&vote=${vote}`;
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json());
      if (res && res.success) {
        dispatch({
          type: UPDATE_VOTE_RESULT_SUCCESS,
          payload: { traceLinkId: traceLinkId, newTraceLink: res.payload }
        });
      } else {
        dispatch({ type: UPDATE_VOTE_RESULT_FAILURE, meta: res.meta });
      }
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.log(e);
      }
      dispatch({ type: UPDATE_VOTE_RESULT_FAILURE });
    }
  };