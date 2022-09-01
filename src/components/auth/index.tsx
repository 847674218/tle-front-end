// 已重构
// 身份验证（登录注册模态框的外部逻辑）+提示信息生成
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import Auth, { IDispatchProps, IOwnProps, IStateProps } from "./auth";
import { sendLogIn, sendRegistry } from "../../store/auth/actions";
import { AuthActions, ILogInData, IRegistryData } from "../../store/auth/types";
import { ThunkDispatch } from "redux-thunk";
import { pushNotification } from "../../store/notification/actions";
import { NotificationActions, INotificationQueueItem } from "../../store/notification/types";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {
    loading: !!state.authReducer.loading,
    error: !!state.authReducer.error
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, AuthActions | NotificationActions>
) => {
  return {
    registry: (data: IRegistryData): Promise<boolean> => dispatch(sendRegistry(data)),
    logIn: (data: ILogInData): Promise<boolean> => dispatch(sendLogIn(data)),
    pushNotification: (item: INotificationQueueItem) => dispatch(pushNotification(item))
  };
};

export const ConnectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);