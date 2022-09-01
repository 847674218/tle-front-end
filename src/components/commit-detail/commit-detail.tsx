// 已重构
// 提交细节：变更统计
import React, { FunctionComponent, memo, useMemo, useRef } from "react";
import { Col, Collapse, Divider, Row, Statistic, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { createUseStyles } from "react-jss";
import { ICommit } from "../../types";
import { CommitChangeInfo } from "../commit-change-info";
import { HighlightCode } from "../highlight-code";

export interface IOwnProps {
  commit: ICommit;
}

export interface ICommitDetailProps extends IOwnProps { }

const useStyles = createUseStyles({
  commitDetail: {
    width: "100%"
  },
  collapsePanel: {
    background: "#f7f7f7",
    borderRadius: "2px",
    marginBottom: "24px",
    border: "0px",
    overflow: "hidden"
  }
});

const CommitDetail: FunctionComponent<ICommitDetailProps> = memo((props: ICommitDetailProps) => {
  const styles = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const { commit } = props;
  const { changedFiles, stats } = commit;

  const defaultActiveKeys = useMemo(
    () => (changedFiles || []).map(changes => changes.sha),
    [changedFiles]
  );

  return (
    <div className={styles.commitDetail} ref={ref}>
      <Typography.Title level={3}>代码统计</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Statistic
            title={"总修改量"}
            value={stats.total.toString()} />
        </Col>
        <Col span={8}>
          <Statistic
            title={"增加"}
            valueStyle={{ color: "#3f8600" }}
            value={stats.additions.toString()}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title={"刪除"}
            valueStyle={{ color: "#cf1322" }}
            value={stats.deletions.toString()}
          />
        </Col>
      </Row>
      <Divider />
      {/* 变更文件展示 */}
      <Typography.Title level={3}>变更的文件</Typography.Title>
      <CommitChangeInfo
        changes={changedFiles}
        getContainer={ref && ref.current ? () => ref.current as HTMLElement : undefined}
      />
      <Collapse
        defaultActiveKey={defaultActiveKeys}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {(changedFiles || []).map(changes => {
          const language = (changes.filename || "").split(".")[1] || "";
          return (
            <Collapse.Panel
              header={<span id={changes.sha}>{changes.filename}</span>}
              key={changes.sha}
            >
              {changes.patch ? (
                <HighlightCode
                  useDiff
                  code={changes.patch}
                  language={language}
                />
              ) : (
                <Typography.Text code>{"没有变化"}</Typography.Text>
              )}
            </Collapse.Panel>
          );
        })}
      </Collapse>
      <Divider />
    </div>
  );
});

export default CommitDetail;