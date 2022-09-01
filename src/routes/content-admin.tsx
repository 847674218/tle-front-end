// 已重构
// 路由跳转（管理员页面）
import React, { FunctionComponent, memo } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Layout } from "antd";
import { RepositoryView } from "../views/repository";
import { ConnectedImportRepositoryProcess } from "../views/import-repository-process";
import { ConnectedUserManagementView } from "../views/user-management";
import { RouteConstants } from "./constants";
import { Error } from "../views/error";

const { Content: AntdContent } = Layout;

export interface IContentProps { }

const ContentAdmin: FunctionComponent<IContentProps> = memo(
    (props: IContentProps) => {
        return (
            <>
                <AntdContent
                    style={{
                        padding: 0,
                        margin: 0,
                        minHeight: 280
                    }
                    }
                >
                    <Switch>
                        <Route
                            exact
                            path={RouteConstants.REPOSITORY}
                            component={RepositoryView}
                        />
                        <Route
                            exact
                            path={RouteConstants.USERMANAGEMENT}
                            component={ConnectedUserManagementView}
                        />

                        <Route
                            exact
                            path={RouteConstants.IMPORT_PROCESS()}
                            component={ConnectedImportRepositoryProcess}
                        />
                        <Route
                            exact
                            path={RouteConstants.ERROR()}
                            component={Error}
                        />
                        <Route
                            exact
                            path="/authed/admin" >
                            <Redirect to={RouteConstants.REPOSITORY} />
                        </Route>
                    </Switch>
                </AntdContent>
            </>
        );
    }
);

export default ContentAdmin;