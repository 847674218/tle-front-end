// 已重构
// 顶部导航栏展示（管理员）：未登录只显示首页，登录显示管理员正常功能。
import React, { FunctionComponent, memo } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { Menu } from "antd";
import { sideMenuConfigsForAdmin, sideMenuConfigsForLoginIn } from "../../configs/side-menu.config";

export interface ITopNavBarProps {
  isLogin: Boolean;
}

const useStyles = createUseStyles(() => ({
  topNavBar: {
    display: "flex",
    flexDirection: "row-reverse",
    background: "#001529",
    color: "white",
  },
  menu: {
    background: "#001529",
  }
}));

const TopNavBarAdmin: FunctionComponent<ITopNavBarProps> = memo((props: ITopNavBarProps) => {
  const { isLogin } = props;
  const styles = useStyles();

  const sideMenuConfigs = isLogin ? sideMenuConfigsForAdmin : sideMenuConfigsForLoginIn;

  return (
    <>
      <div className={styles.topNavBar}>
        <Menu theme="dark" mode="horizontal" className={styles.menu}>
          {sideMenuConfigs.map(config => {
            return (
              <Menu.Item key={config.label}>
                {config.icon}
                <Link to={config.route}>{config.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </>
  );
});

export default TopNavBarAdmin;