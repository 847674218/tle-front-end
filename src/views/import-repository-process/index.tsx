// 已重构
// 仓库导入过程
import { batch, connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import ImportRepositoryProcess, { IDispatchProps, IOwnProps, IStateProps } from "./import-repository-process";
import { ThunkDispatch } from "redux-thunk";
import { sendImportedRepository, startImportRepository, stopImport } from "../../store/import-repository/action";
import { IImportedRepository, IRequirement, ITraceLinkMatrix } from "../../types";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { pushNotification } from "../../store/notification/actions";
import { NotificationActions } from "../../store/notification/types";
import { RouteConstants } from "../../routes/constants";
import { RequirementActions } from "../../store/requirement/types";
import { postRequirement } from "../../store/requirement/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import { sendInitTraceLink } from "../../store/trace-link/actions";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState, ownProps: IOwnProps) => {
  const {
    repositoryReducer: { rawRepositories },
    searchReducer: { searchResult },
    importRepositoryReducer: { loading: sendImportedRepositoryLoading, importProccess, importDone, importedRepository },
    requirementReducer: { loading: postRequirementLoading },
  } = state;
  const { match: { params: { id } } } = ownProps;

  // 得到当前要导入仓库的仓库信息
  // 根据仓库id，使用过滤器过滤出来要导入的结果：是使用原始结果还是使用搜索结果
  // 猜想：因为原生仓库只有最近的十个，但是搜索是从全部仓库得到的，所以rawRepositories并不完全包含searchResult，合理。
  let repositoryRes: IGHRepositoryRes = rawRepositories.filter(repo => repo.id.toString() === id)[0];
  if (!repositoryRes) {
    repositoryRes = searchResult.filter(res => res.id.toString() === id)[0];
  }

  return {
    repositoryRes: repositoryRes,
    confirmImportLoading: sendImportedRepositoryLoading && postRequirementLoading,
    importProccess: importProccess,
    importDone: !!importDone,
    importedRepostiroy: importedRepository,
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, ImportRepositoryAcitons | RequirementActions | TraceLinkActions | NotificationActions>, ownProps: IOwnProps
) => {
  return {
    startImport: repoRes => dispatch(startImportRepository(repoRes)),
    stopImport: () => dispatch(stopImport()),
    confirmImport: (
      repo: Omit<IImportedRepository, "_id">,
      requirement: Omit<IRequirement, "_id">,
      traceLinkMatrix: Omit<ITraceLinkMatrix, "_id">
    ) =>
      batch(async () => {
        dispatch(sendImportedRepository(repo));
        dispatch(postRequirement(requirement));
        dispatch(sendInitTraceLink(traceLinkMatrix));
        dispatch(
          pushNotification({
            title: "导入成功",
            duration: 4.5,
            messageOrNotification: "message",
            type: "success"
          })
        );
        ownProps.history.push(RouteConstants.REPOSITORY);
      })
  };
};

export const ConnectedImportRepositoryProcess = connect(mapStateToProps, mapDispatchToProps)(ImportRepositoryProcess);