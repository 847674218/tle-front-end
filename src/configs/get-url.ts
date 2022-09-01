// 已重构
// url配置
import { gitHubAuthConfigs } from "./github-auth.config";

// 登录GitHub对接TLE的链接
export const getGitHubLogInUrl = () =>
  // client_id参数让GitHub知道是谁在请求，redirect_uri参数是GitHub接受或拒绝请求后的跳转网址
  `${gitHubAuthConfigs.authorize_url}?client_id=${gitHubAuthConfigs.client_id}&redirect_url=${gitHubAuthConfigs.redirect_url}`;
// https://github.com/login/oauth/authorize?client_id=Iv1.9d0f692af12b15a5&redirect_url=http://localhost:3000/auth/redirect

// 监听GitHub的服务器的链接
export const getGitHubServiceUrl = () => {
  return "http://127.0.0.1:8081";
};

// 后端服务器的链接
export const getServerUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:7001";
  }
  return '';
};