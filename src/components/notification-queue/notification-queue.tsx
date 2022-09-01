// 已重构
// 消息队列展示
import { message, notification } from "antd";
import { FunctionComponent, memo } from "react";
import { INotificationQueueItem } from "../../store/notification/types";

export interface IStateProps {
  queue: INotificationQueueItem[];
}

export interface IDispatchProps {
  pop: () => void;
}

// 组件自己的属性
export interface IOwnProps { }

export interface INotificationQueueProps extends IStateProps, IDispatchProps, IOwnProps { }

const NotificationQueue: FunctionComponent<INotificationQueueProps> = memo(
  (props: INotificationQueueProps) => {
    const { queue, pop } = props;
    // 消息队列在刚开始是没有消息的
    queue.forEach(async item => {
      if (item.messageOrNotification === "message") {
        message[item.type](item.title, item.duration);
      } else if (item.messageOrNotification === "notification") {
        notification[item.type]({
          message: item.title,
          description: item.description,
          duration: item.duration
        });
      }
      pop();
    });
    return null;
  });

export default NotificationQueue;