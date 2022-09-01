// 已重构
// 需求卡片展示
import React from "react";
import { Card, Descriptions } from "antd";
import { createUseStyles } from "react-jss";
import moment from "moment";
import { IRequirementDescription } from "../../types";

export interface IRequirementCardProps {
  useCard?: boolean;
  bordered?: boolean;
  description: IRequirementDescription | Omit<IRequirementDescription, "_id">;
}

// 时间格式转换
const MomentDate = React.memo<{ date: number }>(({ date }) => {
  return <span>{moment(date).format("YYYY-MM-DD HH:mm:SS")}</span>;
});

const useStyles = createUseStyles({
  buttonWrapper: {
    margin: { top: "16px" },
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  descriptions: {
    width: "100%"
  }
});

export const RequirementCard: React.FunctionComponent<IRequirementCardProps> = React.memo((props: IRequirementCardProps) => {
  const styles = useStyles();
  const { useCard, bordered, description } = props;

  const descriptions = (
    // 描述列表
    <Descriptions
      className={styles.descriptions}
      column={2}
      bordered={bordered}
      size={"small"}
    >
      <Descriptions.Item label="ID" span={1}>
        {(description as any)._id || "暂无"}
      </Descriptions.Item>
      <Descriptions.Item label="名称" span={1}>
        {description.name}
      </Descriptions.Item>
      <Descriptions.Item label="优先级" span={1}>
        {description.priority}
      </Descriptions.Item>
      <Descriptions.Item label="参与者" span={1}>
        {description.participants}
      </Descriptions.Item>
      <Descriptions.Item label="创建者" span={1}>
        {description.createBy}
      </Descriptions.Item>
      <Descriptions.Item label="创建日期" span={1}>
        {<MomentDate date={description.createAt} />}
      </Descriptions.Item>
      <Descriptions.Item label="需求描述" span={2}>
        {description.description}
      </Descriptions.Item>
      <Descriptions.Item label="前置条件" span={2}>
        {description.preCondition}
      </Descriptions.Item>
      <Descriptions.Item label="后置条件" span={2}>
        {description.postCondition}
      </Descriptions.Item>
      <Descriptions.Item label="正常流程" span={2}>
        {description.normalProcess}
      </Descriptions.Item>
      <Descriptions.Item label="异常流程" span={2}>
        {description.specialNeeds}
      </Descriptions.Item>
      <Descriptions.Item label="扩展流程" span={2}>
        {description.expansionProcess}
      </Descriptions.Item>
      <Descriptions.Item label="审核通过" span={2}>
        {"陈曦、董武骏、刘瑞、邵灵丹"}
      </Descriptions.Item>
      <Descriptions.Item label="审核拒绝" span={2}>
        {""}
      </Descriptions.Item>
    </Descriptions>
  );

  return useCard ? <Card>{descriptions}</Card> : descriptions;
});

RequirementCard.defaultProps = {
  useCard: true,
  bordered: true
};