// 已重构
/**
 *  ----------仓库相关----------
 *  从GitHub请求所有仓库（GitHub监听服务器）
 *  请求已导入的仓库列表（后端）
 *  请求已导入仓库的细节（后端）
 *  删除已导入仓库（后端）
 */
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { IImportedRepository } from "../../types/index";

// 从GitHub请求所有仓库（GitHub监听服务器）
export const FETCH_REPOSITORY_FROM_GITHUB = "FETCH_REPOSITORY_FROM_GITHUB";
export const FETCH_REPOSITORY_FROM_GITHUB_SUCCESS = "FETCH_REPOSITORY_FROM_GITHUB_SUCCESS";
export const FETCH_REPOSITORY_FROM_GITHUB_FAILURE = "FETCH_REPOSITORY_FROM_GITHUB_FAILURE";

// 请求已导入的仓库列表（后端）
export const FETCH_IMPORTED_REPOSITORY_LIST = "FETCH_IMPORTED_REPOSITORY_LIST";
export const FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS = "FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS";
export const FETCH_IMPORTED_REPOSITORY_LIST_FAILURE = "FETCH_IMPORTED_REPOSITORY_LIST_FAILURE";

// 请求已导入的仓库细节
export const FETCH_IMPORTED_REPOSITORY_DETAIL = "FETCH_IMPORTED_REPOSITORY_DETAIL";
export const FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS = "FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS";
export const FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE = "FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE";

// 删除已导入仓库
export const DELETE_REPOSITORY = "DELETE_REPOSITORY";
export const DELETE_REPOSITORY_SUCCESS = "DELETE_REPOSITORY_SUCCESS";
export const DELETE_REPOSITORY_FAILURE = "DELETE_REPOSITORY_FAILURE";

// 仓库管理state
export interface IRepositoryManagementState {
  loading?: boolean;  // 后端请求的加载状态
  fetchGHRepoLoading: boolean;  // 请求GitHub仓库的加载状态
  deleteRepoLoading?: boolean;  // 删除仓库的加载状态
  error?: boolean | string; // 错误
  rawRepositories: IGHRepositoryRes[];  // 所有刚请求到的原始仓库（类型：GitHub仓库信息）
  importedRepositoryList: IImportedRepository[]; // 已导入的仓库列表
  importedRepositoryDetail?: IImportedRepository; //已导入仓库的细节
}

// 从GitHub请求所有仓库（GitHub监听服务器）
export interface IFetchRepositoryFromGitHubAction {
  type: typeof FETCH_REPOSITORY_FROM_GITHUB;
}

export interface IFetchRepositoryFromGitHubSuccessAction {
  type: typeof FETCH_REPOSITORY_FROM_GITHUB_SUCCESS;
  payload: IGHRepositoryRes[];
}

export interface IFetchRepositoryFromGitHubFailureAction {
  type: typeof FETCH_REPOSITORY_FROM_GITHUB_FAILURE;
  meta: string;
}

// 请求已导入的仓库列表（后端）
export interface IFetchImportedRepositoryAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_LIST;
}

export interface IFetchImportedRepositorySuccessAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS;
  payload: IImportedRepository[];
}

export interface IFetchImportedRepositoryFailureAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_LIST_FAILURE;
}

// 请求已导入的仓库细节
export interface IFetchImportedRepositoryDetailAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_DETAIL;
}

export interface IFetchImportedRepositoryDetailSuccessAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS;
  payload: IImportedRepository;
}

export interface IFetchImportedRepositoryDetailFailureAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE;
}

// 删除已导入仓库
export interface IDeleteRepositoryAction {
  type: typeof DELETE_REPOSITORY;
}

export interface IDeleteRepositorySuccessAction {
  type: typeof DELETE_REPOSITORY_SUCCESS;
  payload: string;
}

export interface IDeleteRepositoryFailureAction {
  type: typeof DELETE_REPOSITORY_FAILURE;
}

export type RepositoryActions =
  | IFetchRepositoryFromGitHubAction
  | IFetchRepositoryFromGitHubSuccessAction
  | IFetchRepositoryFromGitHubFailureAction
  | IFetchImportedRepositoryAction
  | IFetchImportedRepositorySuccessAction
  | IFetchImportedRepositoryFailureAction
  | IFetchImportedRepositoryDetailAction
  | IFetchImportedRepositoryDetailSuccessAction
  | IFetchImportedRepositoryDetailFailureAction
  | IDeleteRepositoryAction
  | IDeleteRepositorySuccessAction
  | IDeleteRepositoryFailureAction;

export type RepositoryActionTypes =
  | typeof FETCH_REPOSITORY_FROM_GITHUB
  | typeof FETCH_REPOSITORY_FROM_GITHUB_SUCCESS
  | typeof FETCH_REPOSITORY_FROM_GITHUB_FAILURE
  | typeof FETCH_IMPORTED_REPOSITORY_LIST
  | typeof FETCH_IMPORTED_REPOSITORY_LIST_FAILURE
  | typeof FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS
  | typeof FETCH_IMPORTED_REPOSITORY_DETAIL
  | typeof FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS
  | typeof FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE
  | typeof DELETE_REPOSITORY
  | typeof DELETE_REPOSITORY_SUCCESS
  | typeof DELETE_REPOSITORY_FAILURE;