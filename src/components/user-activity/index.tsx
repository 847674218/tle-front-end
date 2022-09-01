// 已重构
// 用户动态（静态数据）
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import UserActivity, { IStateProps, IDispatchProps, IOwnProps } from "./user-activity";
import { fetchUserActivity } from "../../store/user-activity/actions";
import { UserActivityActions } from "../../store/user-activity/types";
import { ThunkDispatch } from "redux-thunk";


const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {
    loading: state.userActivityReducer.loading,
    activities: state.userActivityReducer.activities
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, UserActivityActions>
) => {
  return {
    fetchUserActivities: () => dispatch(fetchUserActivity())
  };
};

export const ConnectedUserActivity = connect(mapStateToProps, mapDispatchToProps)(UserActivity);