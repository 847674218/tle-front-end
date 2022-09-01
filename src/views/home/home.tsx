// 已重构
// 主页面
import React, { FunctionComponent, memo, useMemo } from "react";
import { Button, Layout, Modal, Row, Col } from "antd";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";
import backgroundImg from "./asset/background.jpg";
import SectionLayout from "./section-layout";
import { ProductAndService } from "../../components/product-and-service";
import { UsingSteps } from "../../components/using-steps";
import { getGitHubLogInUrl } from "../../configs/get-url";
import { ConnectedAuth } from "../../components/auth";

export interface IStateProps {
  authModalVisible: boolean;
}

export interface IDispatchProps {
  toggle: () => void;
}

export interface IOwnProps extends RouteComponentProps { }

export interface INewHomeProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  banner: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center"
  },
  header: {
    width: "100%",
    padding: "50px"
  },
  title: {
    fontSize: "56px",
    color: "white"
  },
  subTitle: {
    fontSize: "20px",
    color: "white"
  },
  startButton: {
    marginTop: "10px"
  }
});

const Home: FunctionComponent<INewHomeProps> = memo((props: INewHomeProps) => {
  const { authModalVisible, toggle } = props;
  const styles = useStyles();

  // 登录成功跳转至GitHub登录界面
  const memorizedOnLogInDone = useMemo(() => {
    return (success: boolean, role: number) => {
      if (success) {
        toggle();
        if (role == 1) {
          // 普通用户重定向至工作台
          window.location.href = "http://localhost:3000/authed/user/workplace"
        } else {
          // 管理员用户需要对接GitHub以及显示管理员登录后界面
          // 当前页面打开
          window.location.href = getGitHubLogInUrl();
        }
      }
    };
  }, [toggle]);

  return (
    <>
      <Modal
        visible={authModalVisible}
        closable={false}
        footer={null}
        destroyOnClose
        onCancel={toggle}
      >
        <ConnectedAuth
          onLogInDone={memorizedOnLogInDone}
        />
      </Modal>
      <Layout>
        <Layout.Content className={styles.banner}>
          <Row className={styles.header}>
            <Col span={24}>
              <div className={styles.header}>
                <div className={styles.title}>Requirements Traceability Tool</div>
                <div className={styles.subTitle}>{"基于Hyperledger Fabric的半自动化需求可追踪性维护系统"}</div>
                <Button
                  className={styles.startButton}
                  type={"primary"}
                  onClick={toggle}
                >
                  {"马上登录"}
                </Button>
              </div>
            </Col>
          </Row>
        </Layout.Content>
        <SectionLayout title={"产品及服务"} content={<ProductAndService />} />
        <SectionLayout title={"使用流程"} content={<UsingSteps />} />
      </Layout>
    </>
  );
});

export default Home;