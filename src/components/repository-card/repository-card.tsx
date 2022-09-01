// 已重构
// 已导入仓库的信息展示卡片
import React, { FunctionComponent, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import moment from "moment";
import { Card, Col, Row, Tooltip, Button, Popconfirm, Modal, Progress } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import PropertyItem from "./property-item";
import { toGitHubCommitPage } from "../../configs/github-auth.config";
import { IImportedRepository } from "../../types";
import { AppDispatch } from "../../store/store";
import { RepositoryActions } from "../../store/repository/types";
import { deleteRepository } from "../../store/repository/action";
import { RootState } from "../../store/reducers";

export interface IRepositoryCardProps {
  repo: IImportedRepository;
}

const useStyles = createUseStyles({
  repoCard: {
    width: "100%",
    margin: { bottom: "16px" }
  },
  operationTitle: {
    display: "block"
  },
  Button: {
    margin: {
      top: "8px",
      bottom: "8px",
      right: "10px"
    }
  }
});

const bodyStyle = { padding: "8px" };

const RepositoryCard: FunctionComponent<IRepositoryCardProps> = memo((props: IRepositoryCardProps) => {
  const styles = useStyles();
  const { repo } = props;
  const { name, ownerId, language, currentBranch, commits, lastUpdateAt, } = repo;

  const lastCommitSha = commits[0].sha;

  // -------------------------------------------模拟更新跟踪链接-------------------------------------------

  // 打开和关闭跟踪链接演进模态框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeNumber, setTimeNumber] = useState(0);

  function clock() {
    let number = 0;
    const timer = setInterval(() => {
      number++;
      setTimeNumber(number);
      if (timeNumber >= 100) {
        clearInterval(timer);
      }
    }, 20)
  }

  // -------------------------------------------删除仓库-------------------------------------------
  const deleteLoading = useSelector<RootState, boolean>(
    state => !!state.repositoryReducer.deleteRepoLoading
  );
  const dispatch = useDispatch<AppDispatch<RepositoryActions>>();
  const onConfirm = () => dispatch(deleteRepository(name));

  return (
    <div>
      <Modal title="跟踪链接演进中"
        visible={isModalVisible}
        cancelText="取消"
        onCancel={() => setIsModalVisible(false)}
        okText="完成"
        onOk={() => setIsModalVisible(true)}
        closable={false}
        destroyOnClose
      >
        <Progress percent={timeNumber} />
        <p>跟踪链接演进结果：</p>
        <p>F12 - CopyFileUtil.java</p>
        <p>F13 - DataPath.java</p>
        <p>F14 - GetTraceMatrix.java</p>
        <p>F16 - BreakClassIntoMethods.java</p>
        <p>F16 - DataPath.java</p>
        <p>F16 - RequirementsDivisionUtil.java</p>
      </Modal>
      <Card className={styles.repoCard} bodyStyle={bodyStyle}>
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <PropertyItem
              property={ownerId}
              value={name}
            />
          </Col>
          <Col span={5}>
            <PropertyItem
              property={"LANGUAGE"}
              value={language}
            />
          </Col>
          <Col span={5}>
            <PropertyItem
              property={"DEFAULT BRANCH"}
              value={currentBranch} />
          </Col>
          <Col span={5}>
            <PropertyItem
              property={"COMMIT"}
              value={
                <Tooltip title="View in GitHub">
                  {/* 跳转到GitHub仓库最近一次提交的界面 */}
                  <a href={toGitHubCommitPage(ownerId, name, lastCommitSha)}>
                    {"最近提交"}
                    <LinkOutlined />
                  </a>
                </Tooltip>
              }
            />
          </Col>
          <Col span={5}>
            <PropertyItem
              property={"UPDATED"}
              value={moment(lastUpdateAt).fromNow()}
            />
          </Col>
        </Row>
        {/* 演进跟踪链接
        点击弹出进度条对话框
        后端：把跟踪链接信息循环注册进fabric（思考细节） */}
        <Button
          className={styles.Button}
          disabled={name == "cassandra"}
          size="small"
          type="primary"
          onClick={() => {
            setIsModalVisible(true)
            clock()
          }}
        >
          {"演进跟踪链接"}
        </Button>
        <Popconfirm
          title={"确认删除？"}
          onConfirm={onConfirm}
          okText={"确认"}
          cancelText={"取消"}
        >
          <Button
            className={styles.Button}
            loading={deleteLoading}
            size="small"
            danger
            type="primary"
          >
            {"删除仓库"}
          </Button>
        </Popconfirm>
      </Card>
    </div>
  );
});

export default RepositoryCard;