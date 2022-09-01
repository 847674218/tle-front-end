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
import { IUser } from "../../types";
import { IGHUserProfile } from "./../../types/github-api/user-profile";

// 导出常量
export const TOGGLE_AUTH_MODAL = "TOGGLE_AUTH_MODAL";

export const SEND_REGISTRY = "SEND_REGISTRY";
export const SEND_REGISTRY_SUCCESS = "SEND_REGISTRY_SUCCESS";
export const SEND_REGISTRY_FAILRE = "SEND_REGISTRY_FAILRE";

export const SEND_LOG_IN = "SEND_LOG_IN";
export const SEND_LOG_IN_SUCCESS = "SEND_LOG_IN_SUCCESS";
export const SEND_LOG_IN_FAILURE = "SEND_LOG_IN_FAILURE";

export const SEND_GITHUB_LOG_IN = "SEND_GITHUB_LOG_IN";
export const SEND_GITHUB_LOG_IN_SUCCESS = "SEND_GITHUB_LOG_IN_SUCCESS";
export const SEND_GITHUB_LOG_IN_FAILURE = "SEND_GITHUB_LOG_IN_FAILURE";

export const FETCH_GH_PROFILE = "FETCH_GH_PROFILE";
export const FETCH_GH_PROFILE_SUCCESS = "FETCH_GH_PROFILE_SUCCESS";
export const FETCH_GH_PROFILE_FAILURE = "FETCH_GH_PROFILE_FAILURE";

export const LOGGED_IN = "LOGGED_IN";

export const FETCH_ALL_USER_INFO = "FETCH_ALL_USER_INFO";
export const FETCH_ALL_USER_INFO_SUCCESS = "FETCH_ALL_USER_INFO_SUCCESS";
export const FETCH_ALL_USER_INFO_FAILURE = "FETCH_ALL_USER_INFO_FAILURE";

export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

// 权限验证
export interface IAuthState {
  loading?: boolean;  // 加载中
  authModalVisible: boolean;  // 模态框可视
  loggedIn: boolean;  // 已登录
  token?: string; // 与后端通信的令牌
  error?: string | boolean; // 错误
  // 管理员用到的变量
  githubId?: string;  // GitHubID
  gitHubAccessToken?: string; // 与GitHub通信的令牌
  ghProfile?: IGHUserProfile; // GitHub设置
  user: IUser[];
}

// 切换登录注册模态对话框的可视状态
export interface IToggleAuthModalAction {
  type: typeof TOGGLE_AUTH_MODAL;
}

// 注册数据：邮箱、密码、角色（admin）
export interface IRegistryData {
  email: string;
  password: string;
  role: string;
}

// 发送注册请求及成功失败状态
export interface ISendRegistryAction {
  type: typeof SEND_REGISTRY;
  payload: IRegistryData;
}

export interface ISendRegistrySuccessAction {
  type: typeof SEND_REGISTRY_SUCCESS;
}

export interface ISendRegistryFailureAction {
  type: typeof SEND_REGISTRY_FAILRE;
  meta?: string;
}

// 登录数据：邮箱、密码
export interface ILogInData {
  email: string;
  password: string;
  role: number;
}

// 发送登录请求 及成功失败状态
export interface ISendLogInAction {
  type: typeof SEND_LOG_IN;
  payload: ILogInData;
}

export interface ISendLogInSuccessAction {
  type: typeof SEND_LOG_IN_SUCCESS;
  payload: {
    token: string;
    githubId?: string; // 第一次登录且未绑定的时候没有GitHubID，如果是普通用户也不需要GitHubID。
  };
}

export interface ISendLogInFailureAction {
  type: typeof SEND_LOG_IN_FAILURE;
  meta?: string;
}

// 兑换access_token及成功失败状态
export interface ISendGitHubLogInAction {
  type: typeof SEND_GITHUB_LOG_IN;
}

export interface ISendGitHubLogInSuccessAction {
  type: typeof SEND_GITHUB_LOG_IN_SUCCESS;
  payload: string
}

export interface ISendGitHubLogInFailureAction {
  type: typeof SEND_GITHUB_LOG_IN_FAILURE;
  meta?: string;
}

// 已登录（更新成本地存储的最新token和access_token）
export interface ILoggedInAction {
  type: typeof LOGGED_IN;
  payload: {
    token: string;
    ghToken: string;
  };
}

// 发送获取GitHub配置请求 及成功失败状态
export interface IFetchGhProfileAction {
  type: typeof FETCH_GH_PROFILE;
}

export interface IFetchGHProfileSuccessAction {
  type: typeof FETCH_GH_PROFILE_SUCCESS;
  payload: IGHUserProfile;
}

export interface IFetchGHProfileFailureAction {
  type: typeof FETCH_GH_PROFILE_FAILURE;
}

// 请求所有用户信息
export interface IFetchAllUserInfoAction {
  type: typeof FETCH_ALL_USER_INFO;
}

export interface IFetchAllUserInfoSuccessAction {
  type: typeof FETCH_ALL_USER_INFO_SUCCESS;
  payload: IUser[];
}

export interface IFetchAllUserInfoFailureAction {
  type: typeof FETCH_ALL_USER_INFO_FAILURE;
}

// 添加一个新的用户
export interface IAddUserAction {
  type: typeof ADD_USER;
}

export interface IAddUserSuccessAction {
  type: typeof ADD_USER_SUCCESS;
  payload: IUser
}

export interface IAddUserFailureAction {
  type: typeof ADD_USER_FAILURE;
}

export type AuthActions =
  | IToggleAuthModalAction
  | ISendLogInAction
  | ISendLogInSuccessAction
  | ISendLogInFailureAction
  | ISendRegistryAction
  | ISendRegistrySuccessAction
  | ISendRegistryFailureAction
  | ISendGitHubLogInAction
  | ISendGitHubLogInSuccessAction
  | ISendGitHubLogInFailureAction
  | IFetchGhProfileAction
  | IFetchGHProfileSuccessAction
  | IFetchGHProfileFailureAction
  | ILoggedInAction
  | IFetchAllUserInfoAction
  | IFetchAllUserInfoSuccessAction
  | IFetchAllUserInfoFailureAction
  | IAddUserAction
  | IAddUserSuccessAction
  | IAddUserFailureAction;

export type AuthActionTypes =
  | typeof TOGGLE_AUTH_MODAL
  | typeof SEND_LOG_IN
  | typeof SEND_LOG_IN_SUCCESS
  | typeof SEND_LOG_IN_FAILURE
  | typeof SEND_REGISTRY
  | typeof SEND_REGISTRY_SUCCESS
  | typeof SEND_REGISTRY_FAILRE
  | typeof SEND_GITHUB_LOG_IN
  | typeof SEND_GITHUB_LOG_IN_SUCCESS
  | typeof SEND_GITHUB_LOG_IN_FAILURE
  | typeof FETCH_GH_PROFILE
  | typeof FETCH_GH_PROFILE_SUCCESS
  | typeof FETCH_GH_PROFILE_FAILURE
  | typeof LOGGED_IN
  | typeof FETCH_ALL_USER_INFO
  | typeof FETCH_ALL_USER_INFO_SUCCESS
  | typeof FETCH_ALL_USER_INFO_FAILURE
  | typeof ADD_USER
  | typeof ADD_USER_SUCCESS
  | typeof ADD_USER_FAILURE;