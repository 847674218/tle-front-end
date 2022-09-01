// 已重构
/**
 *  ----------用户认证相关----------
 *  切换登录注册模态框
 *  发送注册请求给后端（后端请求）
 *  发送登录请求给后端（后端请求）
 *  请求登录GitHub（后端请求）
 *  获取GitHub配置（GitHub请求）
 *  已登录（更新成本地存储的最新token和accessToken）
 *  请求所有用户信息
 *  添加一个新的用户
 */
import {
  AuthActionTypes,
  AuthActions,
  ILogInData,
  IRegistryData,
  TOGGLE_AUTH_MODAL,
  SEND_REGISTRY,
  SEND_REGISTRY_SUCCESS,
  SEND_REGISTRY_FAILRE,
  SEND_LOG_IN,
  SEND_LOG_IN_SUCCESS,
  SEND_LOG_IN_FAILURE,
  SEND_GITHUB_LOG_IN,
  SEND_GITHUB_LOG_IN_SUCCESS,
  SEND_GITHUB_LOG_IN_FAILURE,
  FETCH_GH_PROFILE,
  FETCH_GH_PROFILE_SUCCESS,
  FETCH_GH_PROFILE_FAILURE,
  LOGGED_IN,
  FETCH_ALL_USER_INFO,
  FETCH_ALL_USER_INFO_SUCCESS,
  FETCH_ALL_USER_INFO_FAILURE,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "./types";
import { NotificationActionTypes } from "./../notification/types";
import { AppDispatch, AppThunk } from "./../store";
import _ from "lodash";
import { getServerUrl } from "./../../configs/get-url";
import { IGHUserProfile } from "./../../types/github-api/user-profile";
import { IUser } from "../../types";
import { RootState } from "../reducers";
import { userInfo } from "os";

// 切换登录注册模态框
export const toggleAuthModal = (): AuthActions => {
  return {
    type: TOGGLE_AUTH_MODAL
  };
};

// post 发送注册请求给后端 data（email、passward、role） -> 无返回
export const sendRegistry = (
  data: IRegistryData
): AppThunk<Promise<boolean>, AuthActionTypes> => async dispatch => {
  dispatch({ type: SEND_REGISTRY });
  try {
    const res = await fetch(`${getServerUrl()}/api/auth/registry`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        role: data.role
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: SEND_REGISTRY_SUCCESS });
      return true;
    } else {
      dispatch({ type: SEND_REGISTRY_FAILRE, meta: res.meta });
      return false;
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: SEND_REGISTRY_FAILRE });
    return false;
  }
};

// post 发送登录请求给后端 data（email、passward） -> token、githubId 还需要返回userName
export const sendLogIn = (
  data: ILogInData
): AppThunk<Promise<boolean>, AuthActionTypes | NotificationActionTypes> => async dispatch => {
  dispatch({ type: SEND_LOG_IN });
  try {
    const res = await fetch(`${getServerUrl()}/api/auth/login`, {
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        role: data.role
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      method: "POST"
    }).then(res => res.json());
    console.log(res);
    if (res && res.success) {
      const { token, githubId, userName } = res.payload;
      if (token) {
        // 将token的值存储在本地
        localStorage.setItem("tle_app_token", token);
        localStorage.setItem("userName", userName);
      }
      dispatch({ type: SEND_LOG_IN_SUCCESS, payload: { token, githubId } });
      return true;
    } else {
      dispatch({ type: SEND_LOG_IN_FAILURE, meta: res.meta });
      return false;
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: SEND_LOG_IN_FAILURE });
    return false;
  }
};

// get 兑换access_token：需要传递token，从而解析出是哪个用户兑换access_token
// code（兑换码） -> accessToken
export const sendGitHubLogIn = (
  code: string
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: SEND_GITHUB_LOG_IN });
  try {
    const res = await fetch(`${getServerUrl()}/api/auth/access_token?code=${code}`,
      // fetch里面请求携带cookie的信息
      { credentials: "include" }
    ).then(res => res.json());
    const { success, payload: accessToken } = res;
    if (success) {
      if (accessToken) {
        // 将access_token的值存储在本地
        localStorage.setItem("tle_app_gh_token", accessToken);
      }
      dispatch({ type: SEND_GITHUB_LOG_IN_SUCCESS, payload: accessToken });
    } else {
      dispatch({ type: SEND_GITHUB_LOG_IN_FAILURE, meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: SEND_GITHUB_LOG_IN_FAILURE });
  }
};

// get 获取GitHub配置（用户信息） githubAccessToken -> githubProfile
export const fetchGHProfile = (
  gitHubAccessToken: string
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: FETCH_GH_PROFILE });
  try {
    const res = await fetch(`https://api.github.com/user`, {
      headers: {
        accept: "application/json",
        Authorization: `token ${gitHubAccessToken}`
      }
    });
    // 当然它只是一个HTTP响应，而不是真的JSON。
    // 为了获取JSON的内容，我们需要使用json()方法（该方法返回一个将响应body解析成JSON的promise）。
    const data = await res.json();
    // 把GitHub下划线式命名改为驼峰命名
    const ghProfile: IGHUserProfile = Object.keys(data).reduce(
      (sum: any, curr) => {
        sum[_.camelCase(curr)] = data[curr];
        return sum;
      },
      {}
    ) as IGHUserProfile;
    dispatch({ type: FETCH_GH_PROFILE_SUCCESS, payload: ghProfile });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_GH_PROFILE_FAILURE });
  }
};

// 已登录（更新成本地存储的最新token和accessToken）
export const loggedIn = (token: string, ghToken: string) => {
  return {
    type: LOGGED_IN,
    payload: { token, ghToken }
  };
};

// 请求所有用户信息
export const fetchAllUserInfo = (): AppThunk<void, AuthActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_ALL_USER_INFO });
  try {
    const { authReducer: { token } } = getState();
    if (!token) throw new Error("no token");

    const res = await fetch(
      `${getServerUrl()}/api/auth/userInfo`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => res.json());
    console.log(res);
    if (res && res.success) {
      dispatch({
        type: FETCH_ALL_USER_INFO_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({ type: FETCH_ALL_USER_INFO_FAILURE });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_ALL_USER_INFO_FAILURE });
  }
};

// post 添加一个新的用户 newUser -> newUserWithId:IUser
export const addUser = (
  newUser: Omit<IUser, "_id">
): AppThunk<void, RootState> => async (
  dispatch: AppDispatch<AuthActions>,
  getState
) => {
    dispatch({ type: ADD_USER });
    try {
      const { authReducer: { token } } = getState();
      if (!token) throw new Error("no token");

      const url = `${getServerUrl()}/api/auth/addUser`;
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ ...newUser }),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const res = await fetch(url, options).then(res => res.json());
      if (res && res.success) {
        dispatch({ type: ADD_USER_SUCCESS, payload: res.payload });
      } else {
        dispatch({ type: ADD_USER_FAILURE, meta: res.meta });
      }
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.log(e);
      }
      dispatch({ type: ADD_USER_FAILURE });
    }
  };