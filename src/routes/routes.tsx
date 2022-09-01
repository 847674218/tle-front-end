// 已重构
// 是否认证的路由分发
import React, { FunctionComponent, memo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { RouteConstants } from "./constants";
import LayoutAdmin from "./layout-admin";
import LayoutUser from "./layout-user";
import ContentUser from "./content-user";
import ContentAdmin from "./content-admin";
import { ConnectedHomeView } from "../views/home";
import { AuthRedirectView } from "../views/auth-redirect";

export interface IRoutesProps { }

const Routes: FunctionComponent<IRoutesProps> = memo(
  (props: IRoutesProps) => {
    return (
      <Switch>
        <Route
          exact
          path={"/"}>
          <Redirect to={RouteConstants.HOME} />
        </Route>
        {/* 未登录状态下的主页面 */}
        <Route
          exact
          path={RouteConstants.HOME}
          component={(props: any) => (
            <LayoutAdmin
              requireAuth={false}
              content={() => <ConnectedHomeView {...props} />}
            />
          )}
        />
        {/* 登录成功后对接GitHub 绑定成功后进行重定向并携带授权码 */}
        <Route
          exact
          path="/auth/redirect"
          component={(props: any) => (
            // 兑换access_token
            <AuthRedirectView
              {...props}
              successRedirect={"/authed/admin/"}
              // 这个路由压根不存在 登录失败直接弹提示信息 不跳转
              failureRedirect={"/unauthed"}
            />
          )}
        />
        {/* 管理员路由 */}
        <Route
          path="/authed/admin/*"
          component={(props: any) => {
            return (
              <LayoutAdmin
                requireAuth={true}
                content={() => <ContentAdmin {...props} />} />
            );
          }}
        />
        {/* 用户路由 */}
        <Route
          path="/authed/user/*"
          component={(props: any) => {
            return (
              <LayoutUser
                content={() => <ContentUser {...props} />} />
            );
          }}
        />
      </Switch>
    );
  });

export default Routes;