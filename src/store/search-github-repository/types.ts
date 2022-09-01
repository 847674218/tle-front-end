// 已重构
/**
 *  ----------仓库搜索相关----------
 *  从GitHub中搜索仓库（GitHub服务器请求）
 */
import { IGHRepositoryRes } from "../../types/github-api/repository";

// 导出常量
export const SEARCH_GITHUB_REPOSITORY = "SEARCH_GITHUB_REPOSITORY";
export const SAERCH_GITHUB_REPOSITORY_SUCCESS = "SEARCH_GITHUB_REPOSITORY_SUCCESS";
export const SEARCH_GITHUB_REPOSITORY_FAILURE = "SEARCH_GITHUB_REPOSITORY_FAILURE";

// 搜索GitHub仓库
export interface ISearchRepositoryState {
  loading?: boolean;  // 加载中
  error?: boolean | string; // 错误
  searchResult: IGHRepositoryRes[]; // 搜索结果
}

export interface ISearchGitHubRepositoryAction {
  type: typeof SEARCH_GITHUB_REPOSITORY;
}

export interface ISearchGitHubRepositorySuccessAction {
  type: typeof SAERCH_GITHUB_REPOSITORY_SUCCESS;
  payload: {
    res: IGHRepositoryRes[]
  };
}

export interface ISearchGitHubRepositoryFailureAction {
  type: typeof SEARCH_GITHUB_REPOSITORY_FAILURE;
}

export type SearchRepositoryActions =
  | ISearchGitHubRepositoryAction
  | ISearchGitHubRepositorySuccessAction
  | ISearchGitHubRepositoryFailureAction;

export type SearchRepositoryActionTypes =
  | typeof SEARCH_GITHUB_REPOSITORY
  | typeof SAERCH_GITHUB_REPOSITORY_SUCCESS
  | typeof SEARCH_GITHUB_REPOSITORY_FAILURE;