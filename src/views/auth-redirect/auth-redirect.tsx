// 已重构
// 通过后端兑换携带码对应的access_token
import React, { FunctionComponent, useEffect, memo } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { message } from "antd";
import Cookies from "universal-cookie";

export interface IStateProps {
  loggedIn: boolean;
  error: boolean;
}

export interface IDispatchProps {
  sendGitHubLogIn: (code: string) => void;
}

export interface IOwnProps {
  successRedirect: string;
  failureRedirect: string;
}

export interface IAuthRedirectProps extends IDispatchProps, IStateProps, IOwnProps { }

const AuthRedirect: FunctionComponent<IAuthRedirectProps> = memo(
  (props: IAuthRedirectProps) => {
    const { sendGitHubLogIn, loggedIn, error, failureRedirect, successRedirect } = props;

    // 从URL中获取GitHub返回的携带码的值
    // http://localhost:3000/auth/redirect?code=26ab393585c21ff0c760
    const code = new URLSearchParams(useLocation().search).get("code");

    // 把登录成功后返回的token存储在本地，并在后续与后端通信需要进行身份验证时，由cookie携带传输
    // 这里使用cookie的原因是因为token有可能是空值，而空值没有办法在mapStateToProps里读取：有赋值类型不匹配的错误
    const tleAppToken = localStorage.getItem("tle_app_token");
    const cookies = new Cookies();
    cookies.set("tle_app_token", tleAppToken, { path: "/" });

    useEffect(() => {
      if (code) {
        sendGitHubLogIn(code);
      }
    }, [code, sendGitHubLogIn]);

    if (loggedIn && error) {
      message.error("登录失败");
      return <Redirect to={failureRedirect} />;
    } else if (loggedIn && !error) {
      message.success("登录成功");
      return <Redirect to={successRedirect} />;
    } else {
      return null;
    }
  }
);

export default AuthRedirect;