// 已重构
// 工作台仓库列表：根文件
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import RecentRepoList, { IDispatchProps, IStateProps, IOwnProps } from "./recent-repos-list";
import { RepositoryActions } from "../../store/repository/types";
import { fetchImportedRepositoryList } from "../../store/repository/action";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = state => {
  return {
    loading: !!state.repositoryReducer.loading,
    repositoryList: state.repositoryReducer.importedRepositoryList || []
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: AppDispatch<RepositoryActions>
) => {
  return {
    fetchImportedRepositoryList: () => dispatch(fetchImportedRepositoryList())
  };
};

export const ConnectedRecentRepoList = connect(mapStateToProps, mapDispatchToProps)(RecentRepoList);