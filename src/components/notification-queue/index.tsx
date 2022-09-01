// 已重构
// 消息队列
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import NotificationQueue, { IOwnProps, IStateProps, IDispatchProps } from "./notification-queue";
import { popNotification } from "../../store/notification/actions";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {
    queue: state.notificationReducer.queue
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> =
  dispatch => {
    return {
      // 消息组件负责消息的展示，push方法在其他组件中
      pop: () => dispatch(popNotification())
    };
  };

export const ConnectedNotificatioQueue = connect(mapStateToProps, mapDispatchToProps)(NotificationQueue);