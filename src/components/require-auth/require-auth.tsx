// 已重构
// 登录成功后请求GitHub配置信息并重定向至工作台
import React, { isValidElement, ReactChild, Component } from "react";
import { Redirect } from "react-router-dom";
import { INotificationQueueItem } from "../../store/notification/types";

export interface IStateProps {
  loggedIn: boolean;
}

export interface IDispatchProps {
  logInFromLocalStorage: (token: string, ghToken: string) => void;
  pushNotification: (message: INotificationQueueItem) => void;
}

export interface IOwnProps {
  children: ReactChild;
  redirectUrl: string;
}

export interface IRequireAuthProps extends IStateProps, IDispatchProps, IOwnProps { }

class RequireAuth extends Component<IRequireAuthProps, any> {
  public constructor(props: IRequireAuthProps) {
    super(props);
  }

  // 需要在挂载前执行，因此不能使用Hook
  public componentWillMount() {
    const { pushNotification, logInFromLocalStorage, loggedIn } = this.props;
    const tokenFromLocalStorage = localStorage.getItem("tle_app_token");
    const ghTokenFromLocalStorage = localStorage.getItem("tle_app_gh_token");

    if (tokenFromLocalStorage && ghTokenFromLocalStorage) {
      logInFromLocalStorage(tokenFromLocalStorage, ghTokenFromLocalStorage);
    } else if (
      !tokenFromLocalStorage ||
      !ghTokenFromLocalStorage ||
      !loggedIn
    ) {
      pushNotification({
        title: "请先登录",
        messageOrNotification: "message",
        type: "warning",
        duration: 4.5
      });
    }
  }

  public render() {
    const { children, loggedIn, redirectUrl } = this.props;
    const tokenFromLocalStorage = localStorage.getItem("tle_app_token");
    const ghTokenFromLocalStorage = localStorage.getItem("tle_app_gh_token");

    // 登录成功重定向到工作台
    if (loggedIn) {
      return <>{isValidElement(children) ? children : null}</>;
    } else if (tokenFromLocalStorage && ghTokenFromLocalStorage) {
      return <>{isValidElement(children) ? children : null}</>;
    } else {
      return <Redirect to={redirectUrl} />;
    }
  }
}

export default RequireAuth;