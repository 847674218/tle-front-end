// 已重构
// 路由跳转（用户页面）
import React, { FunctionComponent, memo } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Layout } from "antd";
import { ConnectedRepositoryDetailView } from "../views/repository-detail";
import { ConnectedWorkPlaceView } from "../views/workplace";
import { RouteConstants } from "./constants";

const { Content: AntdContent } = Layout;

export interface IContentProps { }

const Content: FunctionComponent<IContentProps> = memo(
  (props: IContentProps) => {
    return (
      <>
        <AntdContent
          style={{
            padding: 0,
            margin: 0,
            minHeight: 280
          }}
        >
          <Switch>
            <Route
              exact
              path={RouteConstants.WORKPLACE}
              component={ConnectedWorkPlaceView}
            />
            <Route
              exact
              path={RouteConstants.REPOSITORY_DETAIL()}
              component={ConnectedRepositoryDetailView}
            />
            <Route
              exact
              path="/authed/user">
              <Redirect to={RouteConstants.WORKPLACE} />
            </Route>
          </Switch>
        </AntdContent>
      </>
    );
  }
);

export default Content;