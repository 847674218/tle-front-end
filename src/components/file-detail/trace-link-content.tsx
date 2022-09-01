// 已重构
// 文件页面跟踪链接：选择+展示
import React from "react";
import { useSelector } from "react-redux";
import { Skeleton, Empty } from "antd";
import { RootState } from "../../store/reducers";
import { IFileTreeNode, ITraceLink, IRequirementDescription } from "../../types";
import { SelectRequirement } from "../add-trace-link/select-requirement";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

export interface ITraceLinkContentProps {
  loading: boolean;
  repoName: string;
  commitSha: string;
  traceLinks: ITraceLink[];
  fileNode: IFileTreeNode;
}

export const TraceLinkContent: React.FC<ITraceLinkContentProps> = React.memo((props: ITraceLinkContentProps) => {
  const { loading, repoName, commitSha, fileNode, traceLinks } = props;

  // 请求当前版本仓库存在的需求规约
  const descriptions: IRequirementDescription[] = useSelector<
    RootState,
    IRequirementDescription[]
  >(state => state.requirementReducer.requirement?.descriptions || []);

  // 已存的跟踪链接不能再被添加
  const deWeightDescription: IRequirementDescription[] = [];
  for (let i = 0; i < descriptions.length; i++) {
    let isRepeat = false;
    for (let j = 0; j < traceLinks.length; j++) {
      if (descriptions[i].name == traceLinks[j].requirementDescriptionName) {
        isRepeat = true;
      }
    }
    if (!isRepeat) {
      deWeightDescription.push(descriptions[i]);
    }
  }

  if (loading) {
    return (
      <Skeleton title={false} avatar={false} active paragraph={{ rows: 5 }} />
    );
  } else if (!loading && fileNode && traceLinks) {
    return (
      <>
        <SelectRequirement
          repoName={repoName}
          commitSha={commitSha}
          fileName={fileNode.path}
          descriptions={deWeightDescription}
        />
        {traceLinks.map(link => (
          <SimpleTraceLinkCard
            key={link._id}
            traceLink={link}
            descriptions={descriptions}
            showRequirement={true}
            showImplement={false}
          />
        ))}
      </>
    );
  } else {
    return <Empty />;
  }
});