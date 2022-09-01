// 已重构
// Github仓库列表展示（略缩图）：有搜索结果展示搜索结果，没有结果展示原始仓库列表
import React, { FunctionComponent, memo } from "react";
import { List, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { RouteConstants } from "../../routes/constants";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { ProgramLanguage } from "../../utils/language-color";
import { LanguageBadge } from "../language-badge";

export interface IStateProps {
  loading: boolean;
  repositoryList: IGHRepositoryRes[];
}

export interface IDispatchProps { }

export interface IOwnProps {
  onImportClick: (ghRepoRes: IGHRepositoryRes) => void;
}

export interface IGitHubRepositoryListProps extends IStateProps, IDispatchProps, IOwnProps { }

const IGitHubRepositoryList: FunctionComponent<IGitHubRepositoryListProps> = memo(
  (props: IGitHubRepositoryListProps) => {
    const { loading, repositoryList } = props;

    return (
      <List
        loading={loading}
        dataSource={repositoryList}
        // 自定义渲染项：
        renderItem={(item: IGHRepositoryRes) => {
          const { language, description, html_url, id } = item;
          return (
            <List.Item
              key={item.name}
              actions={[
                <Link to={RouteConstants.IMPORT_PROCESS(id.toString())}>
                  {"导入"}
                </Link>
              ]}
            >
              <List.Item.Meta
                title={
                  <Tooltip title={"View in Github"}>
                    <a href={html_url}>{item.name}</a>
                  </Tooltip>
                }
                description={
                  description
                }
              />
            </List.Item>
          );
        }}
      />
    );
  }
);

export default IGitHubRepositoryList;