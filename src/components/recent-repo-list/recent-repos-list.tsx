// 已重构
// 工作台仓库列表：根文件
import React, { CSSProperties, FunctionComponent, memo, useEffect, useMemo, ReactNode } from "react";
import { Card, Col, Row, Skeleton, Empty } from "antd";
import { createUseStyles } from "react-jss";
import { IImportedRepository } from "../../types";
import { SimpleRepoCard } from "../simple-repo-card";

export interface IStateProps {
  loading: boolean;
  repositoryList: IImportedRepository[];
}

export interface IDispatchProps {
  fetchImportedRepositoryList: () => void;
}

export interface IOwnProps {
  style?: CSSProperties;
}

export interface IRecentReposProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  recentRepository: {
    width: "100%"
  },
  centeredEmpty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    minHeight: "300px",
    width: "100%"
  }
});

const bodyStyle = { padding: 0 };

const RecentRepos: FunctionComponent<IRecentReposProps> = memo((props: IRecentReposProps) => {
  const { loading, repositoryList, style, fetchImportedRepositoryList } = props;
  const styles = useStyles();

  // 选择最新导入的仓库版本展示
  const lastUpdateRepositories: IImportedRepository[] = [];
  for (let i = 0; i < repositoryList.length;) {
    let tempRepository = repositoryList[i];
    let count = 0;
    for (let j = i + 1; j < repositoryList.length; j++) {
      if (repositoryList[j].name == tempRepository.name) {
        count++;
        if (repositoryList[j]!.commits[0]!.committedAt > tempRepository!.commits[0]!.committedAt) {
          tempRepository = repositoryList[j];
        }
      }
    }
    lastUpdateRepositories.push(tempRepository);
    i = i + count + 1;
  }

  // 展示内容
  const contents = useMemo(() => {
    if (loading) {
      let contents: ReactNode[] = [];
      for (let i = 0; i < 6; i++) {
        contents.push(
          <Col span={8} key={i}>
            <div style={{ padding: "16px" }}>
              <Skeleton />
            </div>
          </Col>
        );
      }
      return contents;
    } else if (!lastUpdateRepositories || lastUpdateRepositories.length === 0) {
      return <Empty className={styles.centeredEmpty} />;
    } else {
      return lastUpdateRepositories.map(repo => {
        return (
          <Col span={8} key={repo._id}>
            <SimpleRepoCard
              repoId={repo._id}
              description={repo.description}
              repositoryName={repo.name}
              language={repo.language}
            />
          </Col>
        );
      });
    }
  }, [lastUpdateRepositories, loading, styles]);

  // 挂载完成请求所有仓库
  useEffect(() => {
    const doIt = async () => {
      try {
        fetchImportedRepositoryList();
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.log(e);
        }
      }
    };
    doIt();
  }, [fetchImportedRepositoryList]);

  return (
    <Card
      className={styles.recentRepository}
      bodyStyle={bodyStyle}
      style={style}
      title={"所有仓库"}
    >
      <Row>{contents}</Row>
    </Card>
  );
}
);

RecentRepos.defaultProps = { style: {} };

export default RecentRepos;