// 已重构
// 仓库需求展示
import React, { FunctionComponent, memo } from "react";
import { Button, Popconfirm, List } from "antd";
import { createUseStyles } from "react-jss";
import { PlusOutlined } from "@ant-design/icons";
import { IRequirement, IRequirementDescription } from "../../types";
import PropertyCard from "../../components/property-card/property-card";

export interface IRequirementCardProps {
  loading: boolean;
  requirement: IRequirement;
  toggleAddRequirementModal: () => void;
  onDetailClick: (description: IRequirementDescription) => void;
  onDeleteClick: (description: IRequirementDescription) => void;
}

const useStyles = createUseStyles({
  list: {},
  listItem: {
    background: "#fff",
    margin: "8px",
    padding: "8px"
  }
});

const RequirementCard: FunctionComponent<IRequirementCardProps> = memo((props: IRequirementCardProps) => {
  const {
    requirement,
    loading,
    onDetailClick,
    onDeleteClick,
    toggleAddRequirementModal
  } = props;
  const styles = useStyles();

  return (
    <PropertyCard
      titleProps={{
        itemNumber: requirement.descriptions.length || 0,
        text: "需求",
        actions: [
          <PlusOutlined
            key={"addRequirement"}
            onClick={toggleAddRequirementModal}
          />
        ]
      }}
    >
      <List
        className={styles.list}
        loading={loading}
        dataSource={requirement.descriptions || []}
        renderItem={desc => (
          <List.Item
            className={styles.listItem}
            actions={[
              <Button
                size="small"
                type={"primary"}
                onClick={() => onDetailClick(desc)}
              >
                详情
              </Button>,
              <Popconfirm
                title="确认删除？"
                onConfirm={() => onDeleteClick(desc)}
                okText="确认"
                cancelText="取消"
              >
                <Button size="small" type="primary" danger>
                  删除
                </Button>
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              title={<>{desc.name}</>}
              description={desc.description}
            />
          </List.Item>
        )}
      />
    </PropertyCard>
  );
});

export default RequirementCard;