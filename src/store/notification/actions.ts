// 已重构
/**
 *  ----------消息相关----------
 *  压入消息
 *  弹出消息
 */
import {
  INotificationQueueItem,
  PUSH_NOTIFICATION_QUEUE,
  POP_NOTIFICATION_QUEUE,
  IPushNotificationQueueAction,
  IPopNotificationQueueAction
} from "./types";

export const pushNotification = (item: INotificationQueueItem): IPushNotificationQueueAction => {
  return {
    type: PUSH_NOTIFICATION_QUEUE,
    payload: item
  };
};

export const popNotification = (): IPopNotificationQueueAction => ({
  type: POP_NOTIFICATION_QUEUE
});