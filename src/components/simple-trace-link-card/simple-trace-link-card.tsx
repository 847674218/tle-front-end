// 已重构
// 跟踪链接卡片：展示需求内容或者文件列表
import React, { FunctionComponent, memo, useMemo } from "react";
import { Card, Divider, Typography } from "antd";
import { createUseStyles, useTheme } from "react-jss";
import { CustomTheme } from "../../theme";
import { IRequirementDescription, ITraceLink } from "../../types";
import { RequirementCard } from "../requirement/requirement-card";
import "./styles.css";

export interface ISimpleTraceLinkCardProps {
  traceLink: ITraceLink | Omit<ITraceLink, "_id">;
  descriptions?: IRequirementDescription[];
  showRequirement?: boolean;
  showImplement?: boolean;
}

const bodyStyle = { padding: "8px 12px" };

const useStyle = createUseStyles({
  traceLinkCard: {
    margin: { top: "8px" },
    width: "100%"
  },
  traceLinkCardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  implementAndOperations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  operations: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  modifyButton: {
    background: "#57BC90",
    height: "100%",
    color: "#fff"
  },
  deleteButton: {
    background: "#FF3F3B",
    height: "100%",
    color: "#fff",
    "&:hover": {
      background: "#FF3F3B",
      color: "#fff !important"
    }
  }
});

const SimpleTraceLinkCard: FunctionComponent<ISimpleTraceLinkCardProps> = memo((props: ISimpleTraceLinkCardProps) => {
  const { traceLink, descriptions, showRequirement, showImplement } = props;
  const theme: CustomTheme = useTheme() as CustomTheme;
  const styles = useStyle({ theme });

  // 跟踪链接卡片的标题是跟踪链接的ID
  const cardTitle = useMemo(() => {
    return (
      <div>
        {(traceLink as any)._id ? `#${(traceLink as any)._id}` : "暂无"}
      </div>
    );
  }, [traceLink]);

  // 找到跟踪链接中对应的需求规约是哪个
  const targetDescription: IRequirementDescription | undefined = useMemo(() => {
    if (descriptions) {
      for (const description of descriptions) {
        if (traceLink.requirementDescriptionName.toString() === description.name.toString()) {
          return description;
        }
      }
    }
  }, [descriptions, traceLink])

  return (
    <Card
      className={styles.traceLinkCard}
      bodyStyle={bodyStyle}
      hoverable
    >
      <Card.Meta
        // title={cardTitle}
        description={
          <>
            {/* 展示文件对应的需求 */}
            {showRequirement && targetDescription && (
              <Typography style={{ width: "100%" }}>
                <Typography.Text>需求描述</Typography.Text>
                <RequirementCard
                  useCard={false}
                  description={targetDescription}
                />
              </Typography>
            )}
            {showImplement && showRequirement && <Divider />}
            <div className={styles.implementAndOperations}>
              {showImplement && (
                <>
                  <Typography style={{ width: "100%" }}>
                    <Typography.Text>实现类或函数</Typography.Text>
                    <Typography.Paragraph strong>
                      {traceLink.fullyQualifiedName}
                    </Typography.Paragraph>
                  </Typography>
                </>
              )}
            </div>
          </>
        }
      />
    </Card>
  );
});

SimpleTraceLinkCard.defaultProps = {
  showImplement: true,
  showRequirement: true,
};

export default SimpleTraceLinkCard;