// 已重构
// 仓库细节
import React, { FunctionComponent, memo, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { Drawer, PageHeader, Skeleton, Spin, Tabs } from "antd";
import { RouteConstants } from "../../routes/constants";
import { ICommit, IFileTreeNode, IImportedRepository, IRequirement, IRequirementDescription, ITraceLink } from "../../types";
import RepoDetailDescription from "./repo-detail-description";
import { DrawerContent } from "./drawer-content";
import FileCard from "./file-card";
import RequirementCard from "./requirement-card";
import { TraceLinkCard } from "./trace-link-card";
import { AddRequirementModal } from "../../components/requirement/add-requirement-modal";
import { ConnectedRepositoryOutline } from "../../components/repository-outline";

export interface IStateProps {
  loading: boolean;
  repo?: IImportedRepository;
  requirement?: IRequirement;
  deleteRequirementLoading: boolean;
  needVoteTraceLinks: ITraceLink[];
  traceLinks: ITraceLink[];
}

export interface IDispatchProps {
  fetchRepoDetail: () => void;
  fetchRepoRequirement: (repoName: string, commitSha: string) => void;
  toggleAddRequirementModal: () => void;
  deleteRequirementDescription: (requirementId: string, description: IRequirementDescription) => void;
  fetchNeedVoteTeaceLink: (repoName: string, commitSha: string, userName: string) => void;
  // fetchRepoTeaceLink: (repoName: string, commitSha: string) => void;
}

export interface IOwnProps extends RouteComponentProps<{ id: string }> { }

export interface IRepositoryDetailProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  spining: {
    width: "100%",
    minHeight: "60vh"
  },
  content: {
    padding: "16px",
    background: "#fff",
    margin: { left: "3rem", right: "3rem" }
  },
  contentCardWrapper: {}
});

// 抽屉类型
export type RepositoryDetailDrawerType = | "FILE" | "REQUIREMENT" | "CHANGE";

const RepositoryDetail: FunctionComponent<IRepositoryDetailProps> = memo((props: IRepositoryDetailProps) => {
  const styles = useStyles();
  const {
    loading,
    repo,
    requirement,
    deleteRequirementLoading,
    needVoteTraceLinks,
    fetchRepoDetail,
    fetchRepoRequirement,
    toggleAddRequirementModal,
    deleteRequirementDescription,
    fetchNeedVoteTeaceLink,
    // fetchRepoTeaceLink,
    match: { params: { id: repoId } }
  } = props;

  // 顶部信息
  const repoName = repo ? repo.name : "";
  const commitSha = repo ? repo.branches[0].commitHeadSha : "";
  const pageTitle = repo ? repo.name : <Skeleton.Input />;
  const userName = localStorage.getItem("userName") || "";

  // 面包屑
  const routes = useMemo(() => {
    return [
      {
        path: "/",
        breadcrumbName: "首页"
      },
      {
        path: RouteConstants.WORKPLACE,
        breadcrumbName: "工作台"
      },
      {
        path: RouteConstants.REPOSITORY_DETAIL(repoId),
        breadcrumbName: repoName
      }
    ];
  }, [repoId, repoName]);

  // 抽屉信息
  // 设置初始值
  const [drawerType, setDrawerType] = useState<null | RepositoryDetailDrawerType>(null);
  const [selectedFile, setSelectedFile] = useState<IFileTreeNode | null>(null);
  const [selectedRequirementDescription, setSelectedRequirementDescription] = useState<IRequirementDescription | null>(null);
  const [selectedChange, setSelectedChange] = useState<ICommit | null>(null);

  // 抽屉可视化：点击文件、需求、跟踪链接且有内容的时候抽屉可视
  const drawerVisible = !!drawerType && (!!selectedFile || !!selectedRequirementDescription || !!selectedChange);

  // 抽屉的标题
  const drawerTitle = useMemo(() => {
    if (drawerType === "FILE") {
      return selectedFile?.fullyQualifiedName;
    } else if (drawerType === "REQUIREMENT") {
      return `ID: ${selectedRequirementDescription?._id}`;
    } else if (drawerType === "CHANGE") {
      return `变更统计`;
    } else return <Skeleton.Input />;
  }, [
    drawerType,
    selectedFile,
    selectedRequirementDescription,
    selectedChange,
  ]);

  // 开关抽屉
  const openDrawer = (type: RepositoryDetailDrawerType) => setDrawerType(type);
  const closeDrawer = () => setDrawerType(null);

  // 得到选择文件的文件内容
  const selectedFileContent = selectedFile && repo ? repo.shaFileContentMap[selectedFile.sha] : "";

  // 挂载开始请求仓库细节、需求和跟踪链接
  useEffect(() => {
    fetchRepoDetail();
    fetchRepoRequirement(repoName, commitSha);
    fetchNeedVoteTeaceLink(repoName, commitSha, userName);
    // fetchRepoTeaceLink(repoName, commitSha);
  }, [repoName, commitSha]);

  return (
    <Spin spinning={loading} className={styles.spining}>
      <Drawer
        destroyOnClose
        width={"70vw"}
        title={drawerTitle}
        visible={drawerVisible}
        onClose={closeDrawer}
      >
        {drawerType && (
          <DrawerContent
            repoName={repoName}
            commitSha={commitSha}
            drawerType={drawerType}
            file={
              selectedFile
                ? {
                  ...selectedFile,
                  content: selectedFileContent
                }
                : null
            }
            description={selectedRequirementDescription}
            commit={selectedChange}
          />
        )}
      </Drawer>
      <PageHeader
        breadcrumb={{ routes }}
        ghost={false}
        onBack={() => window.history.back()}
        title={pageTitle}
      >
        {repo ? <RepoDetailDescription repo={repo} /> : <Skeleton />}
      </PageHeader>
      <div
        style={{
          width: "100%",
          background: "#fff",
          minHeight: "80vh"
        }}
      >
        <Tabs
          className={styles.content}
          type="card"
          defaultActiveKey={"FILE"}
        >
          <Tabs.TabPane tab={"文件"} key={"FILE"}>
            {repo ? (
              <FileCard
                treeData={repo.trees}
                shaFileContentMap={repo.shaFileContentMap}
                onFileNodeClick={node => {
                  if (node && node.type === "FILE") {
                    setSelectedFile(node);
                    openDrawer("FILE");
                  }
                }}
              />
            ) : (
              <Skeleton
                avatar={false}
                title={false}
                paragraph={{ rows: 5 }}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"需求"} key="REQUIREMENT">
            {requirement &&
              <AddRequirementModal
                requirementId={requirement._id}
              />}
            {!!requirement ? (
              <RequirementCard
                loading={deleteRequirementLoading}
                requirement={requirement}
                toggleAddRequirementModal={toggleAddRequirementModal}
                onDetailClick={description => {
                  openDrawer("REQUIREMENT");
                  setSelectedRequirementDescription(description);
                }}
                onDeleteClick={description =>
                  deleteRequirementDescription(requirement._id, description)
                }
              />
            ) : (
              <Skeleton />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"投票"} key="VOTE">
            {(!!needVoteTraceLinks && repo) ? (
              <TraceLinkCard
                repo={repo}
                repoName={repoName}
                commitSha={commitSha}
                onDetailClick={commit => {
                  openDrawer("CHANGE");
                  setSelectedChange(commit);
                }}
              />
            ) : (
              <Skeleton />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="统计图" key="OUTLINE">
            <ConnectedRepositoryOutline
              repoName={repoName}
              commitSha={commitSha}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Spin>
  );
});

export default RepositoryDetail;