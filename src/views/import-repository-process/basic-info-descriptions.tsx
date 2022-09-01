// 已重构
// 基本信息展示
import React, { FunctionComponent, memo } from "react";
import { Descriptions, Skeleton, Typography } from "antd";
import { IImportedRepository } from "../../types";
import { LanguageBadge } from "../../components/language-badge";
import { FileTree } from "../../components/file-tree";

export interface IBasicInfoDescriptionsProps {
  repo?: Partial<IImportedRepository>;
}

const BasicInfoDescriptions: FunctionComponent<IBasicInfoDescriptionsProps> = memo((props: IBasicInfoDescriptionsProps) => {
  const { repo } = props;
  const {
    name,
    language,
    currentBranch,
    description,
    branches,
    commits,
    trees,
    shaFileContentMap
  } = repo || ({} as any);

  return (
    <Descriptions bordered>
      <Descriptions.Item label="名称">
        {!!name ? <span>{name}</span> : <Skeleton.Input active />}
      </Descriptions.Item>
      <Descriptions.Item label="语言">
        {!!language ? <LanguageBadge language={language} /> : <Skeleton.Input active />}
      </Descriptions.Item>
      <Descriptions.Item label="当前分支">
        {!!currentBranch ? <span>{currentBranch}</span> : <Skeleton.Input active />}
      </Descriptions.Item>
      <Descriptions.Item label="描述" span={3}>
        {!!description ? <span>{description}</span> : <span>无描述</span>}
      </Descriptions.Item>
      <Descriptions.Item label="其它分支" span={3}>
        {!!branches && Array.isArray(branches) ? (
          <Typography.Paragraph>
            <ul>
              {branches.map(branch => (
                <li key={branch.name}>{branch.name}</li>
              ))}
            </ul>
          </Typography.Paragraph>
        ) : (
          <Skeleton
            active
            paragraph={{ rows: 3 }}
            avatar={false}
            title={false}
          />
        )}
      </Descriptions.Item>
      <Descriptions.Item label="提交日志" span={3}>
        {!!commits && Array.isArray(commits) ? (
          <Typography.Paragraph>
            <ul>
              {commits.map(commit => (
                <li key={commit.sha}>{commit.message}</li>
              ))}
            </ul>
          </Typography.Paragraph>
        ) : (
          <Skeleton
            paragraph={{ rows: 3 }}
            avatar={false}
            title={false}
            active
          />
        )}
      </Descriptions.Item>
      <Descriptions.Item label={"文件"} span={3}>
        {trees ? (
          <FileTree
            treeData={trees}
            shaFileContentMap={{ ...shaFileContentMap } || {}}
          />
        ) : (
          <Skeleton
            paragraph={{ rows: 3 }}
            avatar={false}
            title={false}
            active
          />
        )}
      </Descriptions.Item>
    </Descriptions>
  );
});

export default BasicInfoDescriptions;