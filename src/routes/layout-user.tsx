// 已重构
// 是否认证的页面布局
import React, { FunctionComponent, memo, ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { Layout as AntdLayout } from "antd";
import TopNavBarUser from "../components/nav-bar-user/top-nav-bar-user";
import { ConnectedRequireAuthUser } from "../components/require-auth-user";
import { RouteConstants } from "./constants";
import Cookies from "universal-cookie";

export interface ILayoutProps {
  content: () => ReactNode;
}

const useStyles = createUseStyles(theme => ({
  outerLayout: {
    minHeight: "100vmin",
    width: "100%",
    overflowX: "hidden",
    padding: 0,
    margin: 0
  },
  innerLayout: {
    padding: "0px",
    margin: { top: "64px" }
  },
  header: {
    position: "fixed",
    zIndex: 10,
    width: "100%",
    background: "#001529"
  },
  footer: {
    background: "#001529",
    textAlign: "center",
    color: "#999"
  }
}));

const LayoutUser: FunctionComponent<ILayoutProps> = memo((props: ILayoutProps) => {
  const { content } = props;
  const styles = useStyles();

  const tleAppToken = localStorage.getItem("tle_app_token");
  const cookies = new Cookies();
  cookies.set("tle_app_token", tleAppToken, { path: "/" });

  // 未登录状态下显示主页
  const layouted = (
    <ConnectedRequireAuthUser redirectUrl={RouteConstants.HOME}>
      <AntdLayout className={styles.outerLayout}>
        <AntdLayout.Header className={styles.header}>
          <TopNavBarUser />
        </AntdLayout.Header>
        <AntdLayout className={styles.innerLayout}>{content()}</AntdLayout>
        <AntdLayout.Footer className={styles.footer}>
          Created by Idun
        </AntdLayout.Footer>
      </AntdLayout>
    </ConnectedRequireAuthUser>
  );

  return layouted;
});

export default LayoutUser;