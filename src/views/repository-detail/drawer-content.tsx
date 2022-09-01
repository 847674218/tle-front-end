// 已重构
// 抽屉展示
import React from "react";
import { Empty } from "antd";
import { ICommit, IRequirementDescription, IFileTreeNode, ITraceLink } from "../../types";
import { RepositoryDetailDrawerType } from "./repository-detail";
import { ConnectedFileDetail } from "../../components/file-detail";
import { ConnectedRequirementDetail } from "../../components/requirement-detail";
import { CommitDetail } from "../../components/commit-detail";

export interface IDrawerContentProps {
  repoName: string;
  commitSha: string;
  drawerType: RepositoryDetailDrawerType;
  file: (IFileTreeNode & { content: string }) | null;
  description: IRequirementDescription | null;
  commit: ICommit | null;
}

export const DrawerContent: React.FC<IDrawerContentProps> = React.memo((props: IDrawerContentProps) => {
  const { repoName, commitSha, drawerType, file, description, commit } = props;

  if (drawerType === "FILE") {
    return (
      <>
        {file ? (
          <ConnectedFileDetail
            repoName={repoName}
            commitSha={commitSha}
            fileNode={file}
            fileContent={file.content}
          />
        ) : (
          <Empty />
        )}
      </>
    );
  } else if (drawerType === "REQUIREMENT") {
    return description ? (
      <ConnectedRequirementDetail
        repoName={repoName}
        commitSha={commitSha}
        description={description}
      />
    ) : (
      <Empty />
    );
  } else if (drawerType === "CHANGE") {
    return commit ? (
      <CommitDetail
        commit={commit}
      />
    ) : (
      <Empty />
    );
  } else
    return null;
});