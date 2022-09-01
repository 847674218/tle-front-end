// 已重构
// 工作台
import React, { FunctionComponent, memo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { Col, PageHeader, Row } from "antd";
import { RouteConstants } from "../../routes/constants";
import { ConnectedRecentRepoList } from "../../components/recent-repo-list";
import { ConnectedUserActivity } from "../../components/user-activity";

export interface IStateProps { }

export interface IDispatchProps { }

export interface IOwnProps extends RouteComponentProps { }

export interface IWorkplaceProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  pageHeaderContent: {
    display: "flex",
    flexDirection: "row"
  },
  homeContent: {
    padding: "16px"
  },
  result: {
    background: "#fff",
    height: "100vh",
    width: "100%"
  }
});

const Workplace: FunctionComponent<IWorkplaceProps> = memo((props: IWorkplaceProps) => {
  const styles = useStyles();

  const routes = [
    {
      path: RouteConstants.HOME,
      breadcrumbName: "首页"
    },
    {
      path: RouteConstants.WORKPLACE,
      breadcrumbName: "工作台"
    }
  ];

  return (
    <>
      <PageHeader
        breadcrumb={{ routes }}
        ghost={false}
        title={"工作台"}
      />
      <Row className={styles.homeContent} gutter={[16, 16]}>
        <Col lg={18} md={24} style={{ width: "100%" }}>
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <ConnectedRecentRepoList style={{ marginBottom: "16px" }} />
              <ConnectedUserActivity />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
});

export default Workplace;