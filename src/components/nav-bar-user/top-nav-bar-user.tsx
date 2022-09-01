// 已重构
// 顶部导航栏展示（用户）
import React, { FunctionComponent, memo } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { Menu } from "antd";
import { sideMenuConfigsForUser } from "../../configs/side-menu.config";

export interface ITopNavBarProps { }

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

const TopNavBarUser: FunctionComponent<ITopNavBarProps> = memo((props: ITopNavBarProps) => {
  const styles = useStyles();

  return (
    <>
      {
        <div className={styles.topNavBar}>
          <Menu theme="dark" mode="horizontal" className={styles.menu}>
            {sideMenuConfigsForUser.map(config => {
              return (
                <Menu.Item key={config.label}>
                  {config.icon}
                  <Link to={config.route}>{config.label}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      }
    </>
  );
});

export default TopNavBarUser;