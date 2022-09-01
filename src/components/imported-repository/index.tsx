// 已重构
// 已导入仓库
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import ImportedRepository, { IDispatchProps, IOwnProps, IStateProps } from "./imported-repository";
import { fetchImportedRepositoryList } from "../../store/repository/action";
import { RepositoryActions } from "../../store/repository/types";
import { ThunkDispatch } from "redux-thunk";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {
    repositoryList: state.repositoryReducer.importedRepositoryList,
    loading: !!state.repositoryReducer.loading
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, RepositoryActions>
) => {
  return {
    fetchImportedRepositoryList: () => dispatch(fetchImportedRepositoryList())
  };
};

export const ConnectedImportedRepository = connect(mapStateToProps, mapDispatchToProps)(ImportedRepository);