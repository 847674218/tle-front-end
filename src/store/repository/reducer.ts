// 已重构
/**
 *  ----------仓库相关----------
 *  从GitHub请求所有仓库（GitHub监听服务器）
 *  请求已导入的仓库列表（后端）
 *  请求已导入仓库的细节（后端）
 *  删除已导入仓库（后端）
 */
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
  IRepositoryManagementState,
  RepositoryActions,
  IFetchRepositoryFromGitHubSuccessAction,
  IFetchImportedRepositorySuccessAction,
  IDeleteRepositorySuccessAction
} from "./types";

// 仓库管理state
const initialState: IRepositoryManagementState = {
  fetchGHRepoLoading: false,
  rawRepositories: [],  // 从GitHub请求的仓库的原始数据
  importedRepositoryList: [], // 已导入仓库的列表
};

export const repositoryReducer = (
  state = initialState,
  action: RepositoryActions
): IRepositoryManagementState => {
  switch (action.type) {
    // 从GitHub请求所有仓库（GitHub监听服务器）
    case FETCH_REPOSITORY_FROM_GITHUB:
      return {
        ...state,
        fetchGHRepoLoading: true,
        error: false
      };
    case FETCH_REPOSITORY_FROM_GITHUB_SUCCESS:
      return {
        ...state,
        fetchGHRepoLoading: false,
        rawRepositories: (action as IFetchRepositoryFromGitHubSuccessAction).payload,
      };
    case FETCH_REPOSITORY_FROM_GITHUB_FAILURE:
      return {
        ...state,
        fetchGHRepoLoading: false,
        error: true
      }
    // 请求已导入的仓库列表（后端）
    case FETCH_IMPORTED_REPOSITORY_LIST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        importedRepositoryList: (action as IFetchImportedRepositorySuccessAction).payload
      };
    case FETCH_IMPORTED_REPOSITORY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 请求已导入的仓库细节
    case FETCH_IMPORTED_REPOSITORY_DETAIL:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        importedRepositoryDetail: action.payload
      };
    case FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 删除已导入仓库
    case DELETE_REPOSITORY:
      return {
        ...state,
        deleteRepoLoading: true
      };
    case DELETE_REPOSITORY_SUCCESS: {
      const { payload } = action as IDeleteRepositorySuccessAction;
      return {
        ...state,
        deleteRepoLoading: false,
        importedRepositoryList: [
          ...state.importedRepositoryList.filter(repo => repo.name !== payload)
        ]
      };
    }
    case DELETE_REPOSITORY_FAILURE:
      return {
        ...state,
        deleteRepoLoading: false,
        error: true
      };
    default:
      return {
        ...state
      };
  }
};