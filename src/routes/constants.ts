// 已重构
// 路由里的常量
export const RouteConstants = {
  // 通用路由
  HOME: "/home",
  // 管理员路由
  REPOSITORY: "/authed/admin/repository",
  USERMANAGEMENT: "/authed/admin/userManagement",
  IMPORT_PROCESS: (id?: string) => `/authed/admin/import_process/${id ? id : ":id"}`,
  ERROR: (title?: string, subTitle?: string) => `/authed/admin/error/${title ? title : ":title"}/${subTitle ? subTitle : ":subTitle"}`,
  // 用户路由
  WORKPLACE: "/authed/user/workplace",
  REPOSITORY_DETAIL: (id?: string) => `/authed/user/repository/${id ? id : ":id"}`,
};