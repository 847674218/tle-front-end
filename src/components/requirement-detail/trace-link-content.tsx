// 已重构
// 某个需求对应的跟踪链接的内容
import React from "react";
import { Skeleton, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { IFileTreeNode, IRequirementDescription, ITraceLink } from "../../types";
import { SelectImplement } from "../add-trace-link/select-implement";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

export interface ITraceLinkContentProps {
  loading: boolean;
  repoName: string;
  commitSha: string;
  description: IRequirementDescription;
  traceLinks: ITraceLink[];
}

export const TraceLinkContent: React.FunctionComponent<ITraceLinkContentProps> = React.memo((props: ITraceLinkContentProps) => {
  const { loading, repoName, commitSha, description, traceLinks } = props;

  // 得到所有java文件的文件名（带路径）
  const fullyQualifiedNames: string[] = useSelector<RootState, string[]>(state => {
    const { repositoryReducer: { importedRepositoryDetail } } = state;

    if (!importedRepositoryDetail) return [];

    const names: string[] = [];

    const traverse = (node: IFileTreeNode) => {
      if (node.type === "FILE" && node.fullyQualifiedName.search(".java") != -1) {
        names.push(node.fullyQualifiedName);
      } else if (node.type === "FOLDER") {
        (node.subTrees || []).map(traverse);
      }
    };

    const { trees } = importedRepositoryDetail;

    trees.map(traverse);
    return names;
  });

  // 已存的跟踪链接不能再被添加
  const deWeightFileNames: string[] = [];
  for (let i = 0; i < fullyQualifiedNames.length; i++) {
    let isRepeat = false;
    for (let j = 0; j < traceLinks.length; j++) {
      if (fullyQualifiedNames[i].search(traceLinks[j].fullyQualifiedName) != -1) {
        isRepeat = true;
      }
    }
    if (!isRepeat) {
      deWeightFileNames.push(fullyQualifiedNames[i]);
    }
  }

  if (loading) {
    return <Skeleton title={false} avatar={false} paragraph={{ rows: 5 }} />;
  } else {
    return (
      <Spin spinning={loading}>
        <SelectImplement
          repoName={repoName}
          commitSha={commitSha}
          description={description}
          fullyQualifiedNames={deWeightFileNames}
        />
        {traceLinks.map(link => (
          <SimpleTraceLinkCard
            key={link._id}
            traceLink={link}
            showRequirement={false}
            showImplement={true}
          />
        ))}
      </Spin>
    );
  }
});