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
  IAuthState,
  AuthActions,
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
  FETCH_ALL_USER_INFO,
  FETCH_ALL_USER_INFO_SUCCESS,
  FETCH_ALL_USER_INFO_FAILURE,
  LOGGED_IN,
  ISendRegistryFailureAction,
  ISendLogInSuccessAction,
  ISendLogInFailureAction,
  ISendGitHubLogInSuccessAction,
  IFetchGHProfileSuccessAction,

  ILoggedInAction,
  IFetchAllUserInfoAction,
  IFetchAllUserInfoSuccessAction,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  IAddUserSuccessAction
} from "./types";

// 初始状态只有：未登录、登录注册模态框不可视
export const initalAuthState: IAuthState = {
  loggedIn: false,
  authModalVisible: false,
  user: []
};

export const authReducer = (
  state = initalAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    // 变更登录注册模态对话框的可视状态：本地状态
    case TOGGLE_AUTH_MODAL:
      return {
        ...state,
        authModalVisible: !state.authModalVisible
      };
    // 注册及成功失败状态
    case SEND_REGISTRY:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SEND_REGISTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case SEND_REGISTRY_FAILRE:
      return {
        ...state,
        loading: false,
        error: (action as ISendRegistryFailureAction).meta || "注册失败"
      };
    // 登录及成功失败状态：payload有token和GitHubID
    case SEND_LOG_IN:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SEND_LOG_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loggedIn: true,
        token: (action as ISendLogInSuccessAction).payload.token,
        githubId: (action as ISendLogInSuccessAction).payload.githubId,
      };
    case SEND_LOG_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as ISendLogInFailureAction).meta || "登录失败",
      };
    // 兑换access_token 及成功失败状态：payload有access_token
    case SEND_GITHUB_LOG_IN:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SEND_GITHUB_LOG_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loggedIn: true,
        gitHubAccessToken: (action as ISendGitHubLogInSuccessAction).payload
      };
    case SEND_GITHUB_LOG_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 请求GitHub配置及成功失败状态
    case FETCH_GH_PROFILE:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_GH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        ghProfile: (action as IFetchGHProfileSuccessAction).payload
      };
    case FETCH_GH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 已登录（更新成本地存储的最新的token和access_token）
    case LOGGED_IN:
      return {
        ...state,
        token: (action as ILoggedInAction).payload.token,
        gitHubAccessToken: (action as ILoggedInAction).payload.ghToken
      };
    // 请求所有用户信息
    case FETCH_ALL_USER_INFO:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_ALL_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: [
          ...(action as IFetchAllUserInfoSuccessAction).payload
        ]
      };
    case FETCH_ALL_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 添加一个新的用户
    case ADD_USER:
      return {
        ...state,
        loading: true,
        error: false
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: [
          (action as IAddUserSuccessAction).payload,
          ...state.user
        ]
      }
    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};