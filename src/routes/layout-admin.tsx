// 已重构
// 管理员路由分发
import React, { FunctionComponent, memo, ReactNode, ReactChild } from "react";
import { createUseStyles } from "react-jss";
import { Layout as AntdLayout } from "antd";
import { RouteConstants } from "./constants";
import { TopNavBarAdmin } from "../components/nav-bar-admin";
import { ConnectedRequireAuth } from "../components/require-auth";

export interface ILayoutProps {
    requireAuth: boolean;
    content: () => ReactNode;
}

const useStyles = createUseStyles(() => ({
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

const LayoutAdmin: FunctionComponent<ILayoutProps> = memo((props: ILayoutProps) => {
    const { requireAuth, content } = props;
    const styles = useStyles();

    // 获取GitHub配置：登录后跳转至仓库界面
    const withAuth = (content: ReactChild) => {
        return (
            <ConnectedRequireAuth redirectUrl={RouteConstants.HOME}>
                {content}
            </ConnectedRequireAuth>
        );
    };

    // 未登录状态下显示主页
    const layouted = (
        <AntdLayout className={styles.outerLayout}>
            <AntdLayout.Header className={styles.header}>
                <TopNavBarAdmin isLogin={requireAuth} />
            </AntdLayout.Header>
            <AntdLayout className={styles.innerLayout}>{content()}</AntdLayout>
            <AntdLayout.Footer className={styles.footer}>
                Created by Idun
            </AntdLayout.Footer>
        </AntdLayout>
    );

    return requireAuth ? withAuth(layouted) : layouted;
});

export default LayoutAdmin;