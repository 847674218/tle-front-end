// 已重构
// 仓库细节头部：简单信息展示
import React, { FunctionComponent, memo } from "react";
import { Descriptions, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import moment from "moment";
import { IImportedRepository } from "../../types";
import { LanguageBadge } from "../../components/language-badge";

export interface IRepoDetailDescriptionProps {
  repo: IImportedRepository;
}

const RepoDetailDescription: FunctionComponent<IRepoDetailDescriptionProps> = memo((props: IRepoDetailDescriptionProps) => {
  const { repo } = props;

  return (
    <Descriptions size="small" column={2}>
      <Descriptions.Item label="描述">
        {repo.description ? repo.description : ""}
      </Descriptions.Item>
      <Descriptions.Item label="语言">
        <LanguageBadge language={repo.language} />
      </Descriptions.Item>
      <Descriptions.Item label="当前分支">
        {repo.currentBranch}
      </Descriptions.Item>
      <Descriptions.Item label="GitHub">
        <Tooltip title="View in GitHub">
          <a href={`https://github.com/${repo.ownerId}/${repo.name}`}>
            {"前往"}
            <LinkOutlined />
          </a>
        </Tooltip>
      </Descriptions.Item>
      <Descriptions.Item label={"最近更新"}>
        {moment(repo.lastUpdateAt).format("YYYY-MM-DD HH:mm:SS")}
      </Descriptions.Item>
      <Descriptions.Item label="项目负责人">
        {repo.ownerId}
      </Descriptions.Item>
    </Descriptions>
  );
});

export default RepoDetailDescription;