// 已重构
// 仓库细节
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import RepositoryDetail, { IStateProps, IOwnProps, IDispatchProps } from "./repository-detail";
import { ThunkDispatch } from "redux-thunk";
import { fetchImportedRepositoryDetail } from "../../store/repository/action";
import { RepositoryActions } from "../../store/repository/types";
import { fetchRepoRequirement, toggleAddRequirementModal, deleteRequirement } from "../../store/requirement/actions";
import { RequirementActions } from "../../store/requirement/types";
import { IRequirementDescription } from "../../types";
import { TraceLinkActions } from "../../store/trace-link/types";
import { fetchNeedVoteTeaceLink } from "../../store/trace-link/actions";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = state => {
  const {
    repositoryReducer: { loading, importedRepositoryDetail },
    requirementReducer: { requirement, deleteRequirementLoading },
    traceLinkReducer: { needVoteTraceLinks, traceLinks },
  } = state;

  return {
    loading: !!loading,
    repo: importedRepositoryDetail,
    requirement: requirement,
    deleteRequirementLoading: deleteRequirementLoading,
    needVoteTraceLinks: needVoteTraceLinks,
    traceLinks: traceLinks
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, RepositoryActions | RequirementActions | TraceLinkActions>, { match: { params: { id } } }: IOwnProps
) => {
  return {
    fetchRepoDetail: () => dispatch(fetchImportedRepositoryDetail(id)),
    fetchRepoRequirement: (repoName: string, commitSha: string) => dispatch(fetchRepoRequirement(repoName, commitSha)),
    toggleAddRequirementModal: () => dispatch(toggleAddRequirementModal()),
    deleteRequirementDescription: (requirementId: string, description: IRequirementDescription) => dispatch(deleteRequirement(requirementId, description)),
    fetchNeedVoteTeaceLink: (repoName: string, commitSha: string, userName: string) => dispatch(fetchNeedVoteTeaceLink(repoName, commitSha, userName)),
    // fetchRepoTeaceLink: (repoName: string, commitSha: string) => dispatch(fetchRepoTeaceLink(repoName, commitSha))
  };
};

export const ConnectedRepositoryDetailView = connect(mapStateToProps, mapDispatchToProps)(RepositoryDetail);