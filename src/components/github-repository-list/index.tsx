// 已重构
// GitHub仓库列表展示（略缩图）：有搜索结果展示搜索结果，没有结果展示原始仓库列表
import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import RepositoryList, { IOwnProps, IStateProps } from "./github-repository-list";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = state => {
  const { searchReducer: { searchResult, loading: searchLoading } } = state;
  const { repositoryReducer: { rawRepositories, fetchGHRepoLoading } } = state;
  return {
    loading: searchLoading || fetchGHRepoLoading,
    repositoryList:
      searchResult && searchResult.length !== 0 ? searchResult : rawRepositories
  };
};

export const ConnectedGitHubRepositoryList = connect(mapStateToProps)(RepositoryList);