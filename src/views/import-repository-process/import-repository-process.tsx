// 已重构
// 导入过程
import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { Button, Col, Modal, PageHeader, Row, Tabs, Tooltip } from "antd";
import { createUseStyles } from "react-jss";
import { RouteConstants } from "../../routes/constants";
import { IImportedRepository, IRequirement, IRequirementDescription, ITraceLink, ITraceLinkMatrix } from "../../types";
import { ImportProccess, ImportProccess as ImportProccessType } from "../../store/import-repository/types";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { ImportProcessStep } from "../../components/import-process-step";
import BasicInfoDescriptions from "./basic-info-descriptions";
import { ImportRequirement } from "./import-requirement"

export interface IStateProps {
  repositoryRes: IGHRepositoryRes;
  importProccess?: ImportProccessType;
  importDone: boolean;
  importedRepostiroy?: Partial<IImportedRepository>;
  confirmImportLoading: boolean;
}

export interface IDispatchProps {
  startImport: (repositoryRes: IGHRepositoryRes) => void;
  stopImport: () => void;
  confirmImport: (
    repo: Omit<IImportedRepository, "_id">,
    requirement: Omit<IRequirement, "_id">,
    traceLinkMatrix: Omit<ITraceLinkMatrix, "_id">
  ) => void;
}

export interface IOwnProps extends RouteComponentProps<{ id: string }> { }

export interface IImportRepositoryProcessProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  importProcessContent: {
    background: "#fff",
    padding: "16px"
  },
  importProcess: {
    width: "100%"
  },
  tabs: {},
  steps: {},
  initRequirementAlert: {
    margin: { bottom: "16px" }
  },
  initRequirementTextArea: {
    margin: { bottom: "16px" }
  },
  confirmImportButton: {
    margin: { top: "24px" }
  }
});

const ImportRepositoryProcess: FC<IImportRepositoryProcessProps> = memo((props: IImportRepositoryProcessProps) => {
  const styles = useStyles();
  const {
    repositoryRes,
    importProccess,
    importDone,
    confirmImportLoading,
    importedRepostiroy,
    startImport,
    confirmImport,
    stopImport,
    match: { params: { id } },
    history
  } = props;

  // 面包屑配置
  const routes = useMemo(() => {
    return [
      {
        path: "/",
        breadcrumbName: "首页"
      },
      {
        path: "/authed/repository",
        breadcrumbName: "仓库"
      },
      {
        path: `/authed/import_process/${id}`,
        breadcrumbName: "导入"
      }
    ];
  }, [id]);

  // 当前导入步骤
  // branch未导入完成之前，process为undefined，返回值为0
  const toCurrentStep = (process: ImportProccess | undefined) => {
    if (process)
      return {
        BRANCHES: 1,
        COMMITS: 2,
        FILE_STUCTURE: 3,
        FILE_CONTENT: 4
      }[process];
    else return 0;
  };
  // 设置当前步骤对应数字
  const currentStep = toCurrentStep(importProccess);

  const [activeTabKey, setActiveTabKey] = useState<"BASIC_INFO" | "Requiremetn">("BASIC_INFO");
  const [descriptions, setDescriptions] = useState<Omit<IRequirementDescription, "_id">[]>([]);
  const [traceLinks, setTraceLinks] = useState<Omit<ITraceLink, "_id">[]>([]);

  // 导入按钮是否可点击以及是否进行文字提醒的判断
  const confirmImportButtonDisable = !importDone;

  const confirmImportButton = (
    <Button
      className={styles.confirmImportButton}
      block
      // 设置按钮载入状态：设置按钮载入状态
      loading={confirmImportLoading}
      type="primary"
      onClick={async () => {
        confirmImport(
          importedRepostiroy as IImportedRepository,
          {
            relatedRepoName: importedRepostiroy!.name!,
            relatedCommitSha: importedRepostiroy!.commits![0].sha,
            descriptions: descriptions as any
          },
          {
            relatedRepoName: importedRepostiroy!.name!,
            relatedCommitSha: importedRepostiroy!.commits![0].sha,
            links: traceLinks as any
          }
        );
      }}
      // 按钮不可点击
      disabled={confirmImportButtonDisable}
    >
      确认导入
    </Button>
  );

  // undefined两次取反是false，false取反是true，故默认的初始值是false
  const [isBlocking, setIsBlocking] = useState<boolean>(!!importProccess && !importDone);
  // 设置isBlocking的值，以此控制Prompt跳转：只有在结束之前，导入开始之后才需要弹窗
  useEffect(() =>
    setIsBlocking(!!importProccess && !importDone)
    , [importProccess, importDone]);

  // 挂载完成开始导入仓库
  useEffect(() => {
    if (repositoryRes)
      startImport(repositoryRes);
    else
      history.push(RouteConstants.ERROR("发生错误", "请重新选择仓库"));
  }, [startImport, repositoryRes, history]);

  return (
    <div className={styles.importProcess}>
      {/* 当路由变化时触发Prompt组件 */}
      <Prompt
        // 状态when=true时才触发下面的方法：导入过程正在进行中时才会提醒
        when={isBlocking}
        message={() => {
          if (!isBlocking) {
            return true;
          }
          Modal.warning({
            title: "警告",
            content: "正在导入中，确认离开？",
            cancelText: "取消",
            okText: "确认",
            onOk: () => {
              setIsBlocking(false);
              stopImport();
              history.goBack();
            }
          });
          return false;
        }}
      />
      <PageHeader
        breadcrumb={{ routes }}
        ghost={false}
        title={"工件获取"}
      />
      <Row className={styles.importProcessContent} gutter={[16, 16]}>
        {/* 导入状态显示部分 */}
        <Col span={24}>
          <div className={styles.steps}>
            <ImportProcessStep currentStep={currentStep} done={importDone} />
          </div>
        </Col>
        <Col span={24}>
          <div className={styles.tabs}>
            <Tabs
              type="card"
              activeKey={activeTabKey}
              onChange={setActiveTabKey as (str: string) => void}
            >
              <Tabs.TabPane tab={"仓库导入"} key={"BASIC_INFO"}>
                <BasicInfoDescriptions
                  repo={importedRepostiroy}
                />
                {confirmImportButtonDisable ? (
                  <Tooltip title="等待导入完成">
                    {confirmImportButton}
                  </Tooltip>
                ) : (
                  confirmImportButton
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab={"需求导入"} key={"Requirement"}>
                <ImportRequirement
                  onDescriptionsConfirmed={descriptions => {
                    setDescriptions(descriptions);
                  }}
                  onTraceLinksConfirmed={traceLinks => {
                    setTraceLinks(traceLinks);
                  }}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  );
});

export default ImportRepositoryProcess;