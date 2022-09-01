// 已重构
// 跟踪链接统计图
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/reducers";
import { fetchFileStatistic, fetchRequirementNumberStatistic, fetchRequirementStatistic, fetchTraceLinkNumberStatistic } from "../../store/statistic/actions";
import { StatisticActions } from "../../store/statistic/types";
import RepositoryOutline, { IDispatchProps, IOwnProps, IStateProps } from "./repository-outline";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = state => {
  return {
    loading: state.traceLinkReducer.loading || state.requirementReducer.loading,
    repo: state.repositoryReducer.importedRepositoryDetail,
    descriptions: state.requirementReducer.requirement?.descriptions,
    traceLinks: state.traceLinkReducer.traceLinks,
    requirementStatistic: state.statisticReducer.requirementStatistic,
    fileStatistics: state.statisticReducer.fileStatistics,
    requirementNumber: state.statisticReducer.requirementNumber,
    traceLinkNumber: state.statisticReducer.traceLinkNumber
  }
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, StatisticActions>
) => {
  return {
    fetchRequirementStatistic: (repoName: string, commitSha: string) => dispatch(fetchRequirementStatistic(repoName, commitSha)),
    fetchFileStatistic: (repoName: string, commitSha: string) => dispatch(fetchFileStatistic(repoName, commitSha)),
    fetchRequirementNumber: (repoName: string, commitSha: string) => dispatch(fetchRequirementNumberStatistic(repoName, commitSha)),
    fetchTraceLinkNumber: (repoName: string, commitSha: string) => dispatch(fetchTraceLinkNumberStatistic(repoName, commitSha)),
  }
};

export const ConnectedRepositoryOutline = connect(mapStateToProps, mapDispatchToProps)(RepositoryOutline);