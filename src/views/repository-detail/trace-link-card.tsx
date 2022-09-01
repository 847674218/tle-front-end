// 已重构
// 投票（包括变更统计）
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import { Table, Typography, Divider, Card, Button, Popconfirm } from "antd";
import { ColumnsType } from "antd/lib/table";
import { RootState } from "../../store/reducers";
import { ITraceLink, IRequirementDescription, ShaFileContentMap, IFileTreeNode, IImportedRepository, ICommit } from "../../types";
import { HighlightCode } from "../../components/highlight-code";
import { RequirementCard } from "../../components/requirement/requirement-card";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/agate";
import { updateVoteResult } from "../../store/trace-link/actions";

export interface ITraceLinkTableProps {
  repo: IImportedRepository;
  repoName: string;
  commitSha: string;
  onDetailClick: (commit: ICommit) => void;
}

const useStyles = createUseStyles({
  expandArea: {
    background: "#fff",
    margin: { left: "1rem", right: "1rem" }
  },
  buttonStyle: {
    mangin: { right: "2rem" }
  },
});

// 额外展开表单的属性
interface IExpandAreaProps {
  requirementDescriptionName: String;
  fullyQualifiedName: String;
}

// 展开行内容展示
const ExpandArea: React.FunctionComponent<IExpandAreaProps> = React.memo((props: IExpandAreaProps) => {
  const styles = useStyles();
  const { requirementDescriptionName, fullyQualifiedName } = props;

  // 找到选定跟踪链接对应的需求规约内容
  const descriptions = useSelector<RootState, IRequirementDescription[]>(
    state => state.requirementReducer.requirement?.descriptions || []
  );

  const [description, setDescription] = React.useState<IRequirementDescription>(descriptions[0]);
  React.useMemo(() => {
    let selected;
    for (const description of descriptions) {
      if (description.name === requirementDescriptionName) {
        selected = description;
      }
    }
    setDescription({ ...(selected as IRequirementDescription) });
  }, [descriptions]);

  // 找到选定跟踪链接对应的文件内容
  const fileNodes = useSelector<RootState, IFileTreeNode[]>(
    state => state.repositoryReducer.importedRepositoryDetail?.trees || []
  );
  const shaFileContentMap = useSelector<RootState, ShaFileContentMap | undefined>(
    state => state.repositoryReducer.importedRepositoryDetail?.shaFileContentMap
  );

  // 对比仓库文件树的所有结点，找到对应文件并返回内容（代码）
  const code: string | null = React.useMemo(() => {
    if (!shaFileContentMap) return null;

    let found: IFileTreeNode | undefined;

    const traverse = (node: IFileTreeNode) => {
      if (node.type === "FILE") {
        const nodeName = node.fullyQualifiedName;
        if (nodeName.slice(nodeName.lastIndexOf('/') + 1) === fullyQualifiedName) {
          found = node;
        }
      } else if (node.type === "FOLDER") {
        (node.subTrees || []).map(traverse);
      }
    };

    fileNodes.map(traverse);

    if (!found) return null;

    return shaFileContentMap[found.sha];
  }, [shaFileContentMap, fullyQualifiedName, fileNodes]);

  // 展开行内容的展示
  return (
    <div className={styles.expandArea}>
      <Typography.Title level={4}>需求描述</Typography.Title>
      <RequirementCard
        useCard={false}
        bordered={false}
        description={description}
      />
      {/* 分割线 */}
      <Divider style={{ marginTop: "16px" }} />
      <Typography.Title level={4}>实现代码</Typography.Title>
      {code ? <HighlightCode language="Java" code={code} /> : <Typography.Text code>{"请在【查看文件变更】中查看已删除文件"}</Typography.Text>}
    </div>
  );
});

export const TraceLinkCard: React.FunctionComponent<ITraceLinkTableProps> = React.memo((props: ITraceLinkTableProps) => {
  const { repo, repoName, commitSha, onDetailClick } = props;
  const userName = localStorage.getItem("userName") || "";

  const needVoteTraceLinks = useSelector<RootState, ITraceLink[]>(
    state => state.traceLinkReducer.needVoteTraceLinks
  );
  // -------------------------------------------待确认跟踪链接展示-------------------------------------------
  // 每行数据
  const columns: ColumnsType<ITraceLink> = React.useMemo(() => {
    return [
      // {
      //   title: "ID",
      //   dataIndex: "_id",
      //   key: "_id"
      // },
      {
        title: "需求",
        dataIndex: "requirementDescriptionName",
        key: "requirementDescriptionName",
      },
      {
        title: "实现",
        dataIndex: "fullyQualifiedName",
        key: "fullyQualifiedName",
      },
      {
        title: "状态",
        dataIndex: "state",
        key: "state",
      },
      {
        title: "提出者",
        dataIndex: "introducer",
        key: "introducer",
      },
      {
        title: "审核通过",
        dataIndex: "confirmor",
        key: "confirmor",
      },
      {
        title: "审核拒绝",
        dataIndex: "rejector",
        key: "rejector",
      },
      {
        title: "",
        dataIndex: "delete",
        key: "delete",
        render: (text, record) => {
          return (
            <div>
              <Popconfirm
                title="确认通过？"
                onConfirm={() => { confirmTraceLink(record._id) }}
                okText="确认"
                cancelText="取消"
              >
                <Button
                  size="small"
                  type="primary"
                >
                  同意
                </Button >
              </Popconfirm>
              <Popconfirm
                title="确认拒绝？"
                onConfirm={() => { rejectTraceLink(record._id) }}
                okText="确认"
                cancelText="取消"
              >
                <Button
                  size="small"
                  type="primary"
                  danger
                >
                  拒绝
                </Button >
              </Popconfirm>
            </div>
          )
        }
      }
    ];
  }, []);

  const dispatch = useDispatch();
  const confirmTraceLink = async (id: any) => {
    const traceLinkId = needVoteTraceLinks?.filter(traceLink => traceLink._id.toString() == id.toString())[0]._id;
    console.log(traceLinkId);
    dispatch(updateVoteResult(repoName, commitSha, traceLinkId, userName, "pass"))
  }

  const rejectTraceLink = async (id: any) => {
    const traceLinkId = needVoteTraceLinks?.filter(traceLink => traceLink._id.toString() == id.toString())[0]._id;
    dispatch(updateVoteResult(repoName, commitSha, traceLinkId, userName, "reject"))
  }

  return (
    <div>
      <Card style={{ marginBottom: "16px" }}>
        <Card.Meta
          title={"待确认跟踪链接"}
          description={
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  onDetailClick(repo.commits[0]);
                }}
              >
                查看文件变更
              </Button>
            </>
          }
        />
      </Card>
      <Table
        rowKey={"_id"}
        dataSource={needVoteTraceLinks}
        columns={columns}
        rowClassName={style.rowClassName}
        expandable={{
          expandedRowRender: link => {
            const { _id, requirementDescriptionName, fullyQualifiedName } = link;
            return (
              <ExpandArea
                key={_id}
                requirementDescriptionName={requirementDescriptionName}
                fullyQualifiedName={fullyQualifiedName}
              />
            );
          }
        }}
      />
    </div>
  );
});