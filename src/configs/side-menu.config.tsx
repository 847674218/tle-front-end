// 已重构
// 顶部导航栏定义
import React from "react";
import {
  HomeOutlined,
  DashboardOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { RouteConstants } from "./../routes/constants";

// 管理员侧边栏
export const sideMenuConfigsForAdmin = [
  {
    label: "仓库管理",
    route: RouteConstants.REPOSITORY,
    icon: <DashboardOutlined />
  },
  {
    label: "人员组织",
    route: RouteConstants.USERMANAGEMENT,
    icon: <AppstoreOutlined />
  },
  {
    label: "退出登录",
    route: RouteConstants.HOME,
    icon: <HomeOutlined />
  }
];

// 用户用侧边栏
export const sideMenuConfigsForUser = [
  {
    label: "工作台",
    route: RouteConstants.WORKPLACE,
    icon: <DashboardOutlined />
  },
  {
    label: "退出登录",
    route: RouteConstants.HOME,
    icon: <HomeOutlined />
  }
]

// 登录用侧边栏
export const sideMenuConfigsForLoginIn = [
  {
    label: "首页",
    route: RouteConstants.HOME,
    icon: <HomeOutlined />
  }
]