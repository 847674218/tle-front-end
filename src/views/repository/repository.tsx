// 已重构
// 仓库管理页面
import React, { FunctionComponent, memo, useEffect } from "react";
import { Col, PageHeader, Row, Typography } from "antd";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";
import { ConnectedSearchGitHubRepository } from "../../components/search-github-repository";
import { ConnectedGitHubRepositoryList } from "../../components/github-repository-list";
import { ConnectedImportedRepository } from "../../components/imported-repository";
import { RouteConstants } from "../../routes/constants";

export interface IStateProps { }

export interface IDispatchProps {
  fetchAllRepositories: () => void;
}

export interface IOwnProps extends RouteComponentProps { }

export interface IRepositoryProps extends IStateProps, IOwnProps, IDispatchProps { }

const useStyles = createUseStyles({
  repositoryViewContainer: {
    width: "100%"
  },
  importedRepositoryListWrapper: {
    width: "100%",
    padding: "16px"
  },
  githubRepository: {
    width: "100%",
    height: "100%",
    borderRight: "2px solid #f2f2f2",
    padding: "16px"
  }
});

const Repository: FunctionComponent<IRepositoryProps> = memo((props: IRepositoryProps) => {
  const styles = useStyles();
  const { fetchAllRepositories } = props;

  const routes = [
    {
      path: "/",
      breadcrumbName: "首页"
    },
    {
      path: RouteConstants.REPOSITORY,
      breadcrumbName: "仓库"
    }
  ];

  // 挂载完成执行请求所有GitHub仓库的操作
  useEffect(() => {
    const doFetch = async () => {
      try {
        fetchAllRepositories();
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.log(e);
        }
      }
    };
    doFetch();
  }, [fetchAllRepositories]);

  return (
    <div className={styles.repositoryViewContainer}>
      <PageHeader
        breadcrumb={{ routes }}
        ghost={false}
        title={"仓库管理"}
      >
        <Row gutter={[16, 16]}>
          <Col md={{ span: 6 }} sm={{ span: 24 }}>
            <div className={styles.githubRepository}>
              <Typography.Title level={4}>{"搜索"}</Typography.Title>
              <ConnectedSearchGitHubRepository />
              <ConnectedGitHubRepositoryList
                // 当导入按钮被点击的时候，在控制台打印当前导入仓库的信息以便观察输出
                onImportClick={item => console.log(item)}
              />
            </div>
          </Col>
          <Col md={{ span: 18 }} sm={{ span: 24 }}>
            <div className={styles.importedRepositoryListWrapper}>
              <Typography.Title level={4}>{"已导入仓库"}</Typography.Title>
              <ConnectedImportedRepository />
            </div>
          </Col>
        </Row>
      </PageHeader>
    </div>
  );
}
);

export default Repository;