// 已重构
/**
 *  ----------仓库搜索相关----------
 *  从GitHub中搜索仓库（GitHub服务器请求）
 */
import {
  ISearchRepositoryState,
  SEARCH_GITHUB_REPOSITORY,
  SAERCH_GITHUB_REPOSITORY_SUCCESS,
  SEARCH_GITHUB_REPOSITORY_FAILURE,
  SearchRepositoryActions,
  ISearchGitHubRepositorySuccessAction,
} from "./types";

const initialState: ISearchRepositoryState = {
  loading: false,
  searchResult: []
};

export const searchReducer = (state = initialState, action: SearchRepositoryActions): ISearchRepositoryState => {
  switch (action.type) {
    case SEARCH_GITHUB_REPOSITORY:
      return {
        ...state,
        loading: true
      };
    case SAERCH_GITHUB_REPOSITORY_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: (action as ISearchGitHubRepositorySuccessAction).payload.res,
      };
    case SEARCH_GITHUB_REPOSITORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return {
        ...state
      };
  }
};