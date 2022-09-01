// 已重构
// 已导入仓库列表的展示
import React, { FunctionComponent, memo, useEffect } from "react";
import { Empty, Spin } from "antd";
import { createUseStyles } from "react-jss";
import { IImportedRepository } from "../../types";
import { RepositoryCard } from "../repository-card";

export interface IStateProps {
  repositoryList: IImportedRepository[];
  loading: boolean;
}

export interface IDispatchProps {
  fetchImportedRepositoryList: () => void;
}

export interface IOwnProps { }

export interface IImportedRepositoryProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  importedRepository: {
    width: "100%",
    minHeight: "100vh"
  },
  repoCardList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  empty: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const ImportedRepository: FunctionComponent<IImportedRepositoryProps> = memo((props: IImportedRepositoryProps) => {
  const { loading, fetchImportedRepositoryList, repositoryList } = props;
  const styles = useStyles();

  // 选择最近更新的版本展示
  const lastUpdateRepository = [];
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
    lastUpdateRepository.push(tempRepository);
    i = i + count + 1;
  }

  useEffect(() => {
    fetchImportedRepositoryList();
  }, [fetchImportedRepositoryList]);

  return (
    <Spin spinning={loading}>
      <div className={styles.importedRepository}>
        <div className={styles.repoCardList}>
          {lastUpdateRepository && lastUpdateRepository.length !== 0 ? (
            lastUpdateRepository.map(repo => {
              return <RepositoryCard repo={repo} key={repo.name} />;
            })
          ) : (
            <div className={styles.empty}>
              <Empty />
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
}
);

export default ImportedRepository;