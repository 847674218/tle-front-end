// 已重构
// 仓库管理页面
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import Repository, { IDispatchProps, IOwnProps, IStateProps } from "./repository";
import { ThunkDispatch } from "redux-thunk";
import { fetchAllRepositoryFromGitHub } from "../../store/repository/action";
import { RepositoryActions } from "../../store/repository/types";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {
    gitHubAccessToken: state.authReducer.gitHubAccessToken,
    rawRepositories: state.repositoryReducer.rawRepositories,
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, RepositoryActions | ImportRepositoryAcitons>
) => {
  return {
    fetchAllRepositories: () => dispatch(fetchAllRepositoryFromGitHub()),
  };
};

export const RepositoryView = connect(mapStateToProps, mapDispatchToProps)(Repository);