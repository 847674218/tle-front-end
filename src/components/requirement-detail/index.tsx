// 已重构
// 需求抽屉的细节
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import RequirementDetail, { IDispatchProps, IOwnProps, IStateProps } from "./requirement-detail";
import { fetchDescriptionRelatedTraceLinks } from "../../store/trace-link/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import { AppDispatch } from "../../store/store";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = state => {
    const { traceLinkReducer: { loading, requirementRelatedTraceLinks } } = state;

    return {
        loading: loading,
        traceLinks: requirementRelatedTraceLinks || []
    };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
    dispatch: AppDispatch<TraceLinkActions>
) => {
    return {
        fetchDescriptionRelatedTraceLinks: (repoName: string, commitSha: string, descriptionName: string) => dispatch(fetchDescriptionRelatedTraceLinks(repoName, commitSha, descriptionName))
    };
};

export const ConnectedRequirementDetail = connect(mapStateToProps, mapDispatchToProps)(RequirementDetail);