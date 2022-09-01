// 已重构
/**
 *  ----------消息相关----------
 *  压入消息
 *  弹出消息
 */
export const PUSH_NOTIFICATION_QUEUE = "PUSH_NOTIFICATION_QUEUE";
export const POP_NOTIFICATION_QUEUE = "POP_NOTIFICATION_QUEUE";

export interface INotificationQueueItem {
  title: string;
  description?: string;
  duration: number;
  messageOrNotification: "message" | "notification";
  type: "success" | "error" | "warning" | "warn";
}

export interface INotificationState {
  queue: INotificationQueueItem[];
  consumingItem?: INotificationQueueItem;
}

export interface IPushNotificationQueueAction {
  type: typeof PUSH_NOTIFICATION_QUEUE;
  payload: INotificationQueueItem;
}

export interface IPopNotificationQueueAction {
  type: typeof POP_NOTIFICATION_QUEUE;
}

export type NotificationActions =
  | IPushNotificationQueueAction
  | IPopNotificationQueueAction;

export type NotificationActionTypes =
  | typeof PUSH_NOTIFICATION_QUEUE
  | typeof POP_NOTIFICATION_QUEUE;