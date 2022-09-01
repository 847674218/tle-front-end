// 已重构
// 身份验证（登录注册模态框的外部逻辑）+提示信息生成
import React, { FunctionComponent, useMemo, memo, useState } from "react";
import { Tabs } from "antd";
import { createUseStyles } from "react-jss";
import { LogInForm } from "../log-in-form";
import { RegistryForm } from "../registry-form";
import { ILogInData, IRegistryData } from "../../store/auth/types";
import { INotificationQueueItem } from "../../store/notification/types";

export interface IStateProps {
  loading: boolean;
  error: boolean;
}

export interface IDispatchProps {
  registry: (data: IRegistryData) => Promise<boolean>;
  logIn: (data: ILogInData) => Promise<boolean>;
  pushNotification: (item: INotificationQueueItem) => void;
}

export interface IOwnProps {
  onLogInDone: (success: boolean, role: number) => void;
}

export interface IAuthProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  authViewContainer: {
    width: "100%"
  }
});

const Auth: FunctionComponent<IAuthProps> = memo((props: IAuthProps) => {
  const { loading, registry, logIn, pushNotification, onLogInDone } = props;
  const styles = useStyles();
  const { TabPane } = Tabs;

  const [activeTabKey, setActiveTabKey] = useState<"LOG_IN" | "REGISTRY">("LOG_IN");

  // 定义注册和登录成功和失败的展示信息
  const successRegistryNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: "注册成功",
      duration: 4.5,
      type: "success",
      messageOrNotification: "message"
    };
  }, []);

  const failureRegistryNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: "注册失败！请确保内容填写无误！",
      duration: 4.5,
      type: "error",
      messageOrNotification: "message"
    };
  }, []);

  const failureRegistryNotificationInBack: INotificationQueueItem = useMemo(() => {
    return {
      title: "该邮箱已被注册！",
      duration: 4.5,
      type: "error",
      messageOrNotification: "message"
    };
  }, []);

  const successLogInNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: "登录成功",
      duration: 4.5,
      type: "success",
      messageOrNotification: "message"
    };
  }, []);

  const failureLogInNotification: INotificationQueueItem = useMemo(() => {
    return {
      title: "登录失败！请输入正确的邮箱和密码！",
      duration: 4.5,
      type: "error",
      messageOrNotification: "message"
    };
  }, []);

  // 登录的前端验证成功
  const memorizedOnLogInFinish = useMemo(() => {
    return (data: ILogInData, role: number) => {
      logIn(data).then(success => {
        pushNotification(
          success ? successLogInNotification : failureLogInNotification
        );
        onLogInDone(success, role);
      });
    };
  }, [
    logIn,
    onLogInDone,
    pushNotification,
    failureLogInNotification,
    successLogInNotification
  ]);

  // 登录失败（前端验证失败）
  const memorizedOnLogInFailure = useMemo(() => {
    return () => {
      pushNotification(failureLogInNotification);
    };
  }, [
    pushNotification,
    failureLogInNotification
  ]);

  // 注册的前端验证成功
  const memorizedOnRegistryFinish = useMemo(() => {
    return (data: IRegistryData) => {
      // 这里的success指的是action里sendRegistry变量代表的函数返回的值，success只是返回值的代指
      registry(data).then(success => {
        pushNotification(success ? successRegistryNotification : failureRegistryNotificationInBack);
        if (success) {
          setActiveTabKey("LOG_IN");
        }
      });
    };
  }, [
    registry,
    successRegistryNotification,
    failureRegistryNotification,
    pushNotification
  ]);

  // 注册失败（前端验证失败）
  const memorizedOnRegistryFailure = useMemo(() => {
    return () => {
      pushNotification(failureRegistryNotification);
    };
  }, [
    pushNotification,
    failureRegistryNotification
  ]);

  // 变更标签页的标签是登录还是注册
  // useEffect用法：只有一个参数表示componentDidMount()和componentDidUpdate()
  // 只加[]表示componentDidMount()只在挂载的时候执行一次
  // []里面有内容表示在内容更新的时候重新渲染执行componentDidUpdate()
  // useMemo()用法：[]里面是依赖项，方法体是箭头函数，函数体是return一个函数
  const memorizedOnTabKeyChange = useMemo(() => {
    return (key: string) => setActiveTabKey(key as any);
  }, [setActiveTabKey]);

  return (
    <div className={styles.authViewContainer}>
      <Tabs
        activeKey={activeTabKey}
        onChange={memorizedOnTabKeyChange}
        destroyInactiveTabPane
      >
        <TabPane tab={"登录"} key={"LOG_IN"}>
          <LogInForm
            loading={loading}
            onFinish={memorizedOnLogInFinish}
            onFinishFailed={memorizedOnLogInFailure}
          />
        </TabPane>
        <TabPane tab={"项目负责人注册"} key={"REGISTRY"}>
          <RegistryForm
            loading={loading}
            onFinish={memorizedOnRegistryFinish}
            onFinishFailed={memorizedOnRegistryFailure}
          />
        </TabPane>
      </Tabs>
    </div>
  );
});

export default Auth;