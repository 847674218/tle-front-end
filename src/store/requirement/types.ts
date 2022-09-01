// 已重构
/**
 *  ----------需求相关操作----------
 *  把需求存储在数据库中
 *  请求仓库对应的需求
 *  改变添加需求模态框的显示状态
 *  添加单条需求规约
 *  删除单条需求规约
 */
import { IRequirement } from "./../../types/index";

// 把需求存储在数据仓库中
export const POST_REQUIREMENT = "POST_REQUIREMENT";
export const POST_REQUIREMENT_SUCCESS = "POST_REQUIREMENT_SUCCESS";
export const POST_REQUIREMENT_FAILURE = "POST_REQUIREMENT_FAILURE";

// 请求仓库对应的需求
export const FETCH_REPO_REQUIREMENT = "FETCH_REPO_REQUIREMENT";
export const FETCH_REPO_REQUIREMENT_SUCCESS = "FETCH_REPO_REQUIREMENT_SUCCESS";
export const FETCH_REPO_REQUIREMENT_FAILURE = "FETCH_REPO_REQUIREMENT_FAILURE";

// 改变添加需求模态框的显示状态
export const TOGGLE_ADD_REQUIREMENT_MODAL = "TOGGLE_ADD_REQUIREMENT_MODAL";

// 添加单条需求规约
export const ADD_REQUIREMENT = "ADD_REQUIREMENT";
export const ADD_REQUIREMENT_SUCCESS = "ADD_REQUIREMENT_SUCCESS";
export const ADD_REQUIREMENT_FAILURE = "ADD_REQUIREMENT_FAILURE";

// 删除单条需求规约
export const DELETE_REQUIREMENT = "DELETE_REQUIREMENT";
export const DELETE_REQUIREMENT_SUCCESS = "DELETE_REQUIREMENT_SUCCESS";
export const DELETE_REQUIREMENT_FAILURE = "DELETE_REQUIREMENT_FAILURE";

// 需求state
export interface IRequirementState {
  loading: boolean;
  addRequirementLoading: boolean;
  deleteRequirementLoading: boolean;
  requirement?: IRequirement;
  addRequirementModalVisible: boolean;
  error?: boolean | any;
}

// 把需求存储在数据仓库中
export interface IPostRequirementAction {
  type: typeof POST_REQUIREMENT;
}

export interface IPostRequirementSuccessAction {
  type: typeof POST_REQUIREMENT_SUCCESS;
}

export interface IPostRequirementFailureAction {
  type: typeof POST_REQUIREMENT_FAILURE;
  meta?: string;
}

// 请求仓库对应的需求
export interface IFetchRepoRequirementAction {
  type: typeof FETCH_REPO_REQUIREMENT;
}

export interface IFetchRepoRequirementSuccessAction {
  type: typeof FETCH_REPO_REQUIREMENT_SUCCESS;
  payload: IRequirement;
}

export interface IFetchRepoRequirementFailureAction {
  type: typeof FETCH_REPO_REQUIREMENT_FAILURE;
}

// 改变添加需求模态框的显示状态
export interface IToggleAddRequirementModalAction {
  type: typeof TOGGLE_ADD_REQUIREMENT_MODAL;
}

// 添加单条需求规约
export interface IAddRequirementAction {
  type: typeof ADD_REQUIREMENT;
}

export interface IAddRequirementSuccessAction {
  type: typeof ADD_REQUIREMENT_SUCCESS;
  payload: IRequirement;
}

export interface IAddRequirementFailureAction {
  type: typeof ADD_REQUIREMENT_FAILURE;
}

// 删除单条需求规约
export interface IDeleteRequirementAction {
  type: typeof DELETE_REQUIREMENT;
}

export interface IDeleteRequirementSuccessAction {
  type: typeof DELETE_REQUIREMENT_SUCCESS;
  payload: IRequirement;
}

export interface IDeleteRequirementFailreAction {
  type: typeof DELETE_REQUIREMENT_FAILURE;
}

export type RequirementActions =
  | IFetchRepoRequirementAction
  | IFetchRepoRequirementSuccessAction
  | IFetchRepoRequirementFailureAction
  | IAddRequirementAction
  | IAddRequirementSuccessAction
  | IAddRequirementFailureAction
  | IToggleAddRequirementModalAction
  | IDeleteRequirementAction
  | IDeleteRequirementSuccessAction
  | IDeleteRequirementFailreAction
  | IPostRequirementAction
  | IPostRequirementSuccessAction
  | IPostRequirementFailureAction;

export type RequirementActionTypes =
  | typeof FETCH_REPO_REQUIREMENT
  | typeof FETCH_REPO_REQUIREMENT_SUCCESS
  | typeof FETCH_REPO_REQUIREMENT_FAILURE
  | typeof ADD_REQUIREMENT
  | typeof ADD_REQUIREMENT_SUCCESS
  | typeof ADD_REQUIREMENT_FAILURE
  | typeof TOGGLE_ADD_REQUIREMENT_MODAL
  | typeof DELETE_REQUIREMENT
  | typeof DELETE_REQUIREMENT_SUCCESS
  | typeof DELETE_REQUIREMENT_FAILURE
  | typeof POST_REQUIREMENT
  | typeof POST_REQUIREMENT_SUCCESS
  | typeof POST_REQUIREMENT_FAILURE;