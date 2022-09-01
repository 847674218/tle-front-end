// 已重构
// 搜索GitHub仓库的搜索框
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import SearchGitHubrepository, { IDispatchProps, IOwnProps, IStateProps } from "./search-github-repository";
import { searchGitHubRepository } from "../../store/search-github-repository/actions";
import { SearchRepositoryActions } from "../../store/search-github-repository/types";
import { ThunkDispatch } from "redux-thunk";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, SearchRepositoryActions>
) => {
  return {
    doSearch: (str: string) => dispatch(searchGitHubRepository(str))
  };
};

export const ConnectedSearchGitHubRepository = connect(mapStateToProps, mapDispatchToProps)(SearchGitHubrepository);