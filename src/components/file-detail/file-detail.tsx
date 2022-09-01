// 已重构
// 文件抽屉的细节：标头+跟踪链接部分（选择+展示）+代码部分
import React, { FunctionComponent, memo, useEffect } from "react";
import { Col, Divider, Empty, Row, Typography } from "antd";
import { IFileTreeNode, ITraceLink } from "../../types";
import { HighlightCode } from "../highlight-code";
import { TraceLinkContent } from "./trace-link-content";

export interface IStateProps {
  loading: boolean;
  traceLinks: ITraceLink[];
}

export interface IDispatchProps {
  fetchFileRelatedTraceLinks: (
    repoName: string,
    commitSha: string,
    fileName: string
  ) => void;
}

export interface IOwnProps {
  repoName: string;
  commitSha: string;
  fileNode: IFileTreeNode;
  fileContent: string;
}

export interface IFileDetailProps extends IStateProps, IDispatchProps, IOwnProps { }

export const FileDetail: FunctionComponent<IFileDetailProps> = memo((props: IFileDetailProps) => {
  const {
    loading,
    traceLinks,
    repoName,
    commitSha,
    fileNode,
    fileContent,
    fetchFileRelatedTraceLinks
  } = props;

  useEffect(() => {
    if (fileNode) {
      const doFetch = async () => {
        try {
          fetchFileRelatedTraceLinks(repoName, commitSha, fileNode.path);
        } catch (e) {
          if (process.env.NODE_ENV === "production") {
            console.log(e);
          }
        }
      };
      doFetch();
    }
  }, [fetchFileRelatedTraceLinks, repoName, commitSha, fileNode]);

  return (
    <Row>
      <Col span={24}>
        {
          (fileNode.fullyQualifiedName.search(".java") != -1) ? (
            // java文件显示跟踪链接
            <div>
              <Typography.Title level={3}>跟踪链接</Typography.Title>
              <TraceLinkContent
                loading={loading}
                repoName={repoName}
                commitSha={commitSha}
                traceLinks={traceLinks}
                fileNode={fileNode}
              />
              <Divider />
            </div>
          ) : (<div />)
        }
        {/* 非java文件只显示源码 */}
        <Typography.Title level={3}>源代码</Typography.Title>
        {!!fileNode ? (
          <HighlightCode code={fileContent} language={"Java"} />
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
});

export default FileDetail;