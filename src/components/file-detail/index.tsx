// 已重构
// 文件抽屉的细节
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import FileDetail, { IDispatchProps, IOwnProps, IStateProps } from "./file-detail";
import { fetchFileRelatedTraceLinks } from "../../store/trace-link/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import { AppDispatch } from "../../store/store";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = state => {
  const { traceLinkReducer: { loading, fileRelatedTraceLinks } } = state;

  return {
    loading: loading,
    traceLinks: fileRelatedTraceLinks || []
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: AppDispatch<TraceLinkActions>
) => {
  return {
    fetchFileRelatedTraceLinks: (repoName: string, commitSha: string, fileName: string) => dispatch(fetchFileRelatedTraceLinks(repoName, commitSha, fileName))
  };
};

export const ConnectedFileDetail = connect(mapStateToProps, mapDispatchToProps)(FileDetail);