// 已重构
// Github权限配置
export const gitHubAuthConfigs = {
  // client_id和client_secret是TLE应用的身份识别码
  client_id: "Iv1.9d0f692af12b15a5",
  client_secret: "f3f71fde90fff21c6f57bf7f90c8a596611ce371",
  authorize_url: "https://github.com/login/oauth/authorize",
  redirect_url: "http://localhost:3000/auth/redirect",
  access_token_url: "https://github.com/login/oauth/access_token",
  fetch_repository: "https://api.github.com/user/repos",
  search: "https://api.github.com/search/repositories"
};

// 跳转到GitHub仓库最近一次提交的界面
export const toGitHubCommitPage = (
  ownerId: string,
  repoName: string,
  commitSha: string
): string => {
  return `https:/github.com/${ownerId}/${repoName}/commits/${commitSha}`;
};