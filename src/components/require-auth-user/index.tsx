// 已重构
// 登录成功后存储token并重定向至工作台
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import RequireAuthUser, { IDispatchProps, IOwnProps, IStateProps } from "./require-auth-user";
import { loggedIn } from "../../store/auth/actions";
import { pushNotification } from "../../store/notification/actions";
import { INotificationQueueItem } from "../../store/notification/types";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {
    loggedIn: !!state.authReducer.loggedIn
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: any
) => {
  return {
    logInFromLocalStorage: (token: string, ghToken: string) => dispatch(loggedIn(token, ghToken)),
    pushNotification: (item: INotificationQueueItem) => dispatch(pushNotification(item))
  };
};

export const ConnectedRequireAuthUser = connect(mapStateToProps, mapDispatchToProps)(RequireAuthUser);