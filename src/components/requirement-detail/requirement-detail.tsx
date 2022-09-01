// 已重构
// 需求抽屉
import React, { FunctionComponent, memo, useEffect } from "react";
import { Typography } from "antd";
import { createUseStyles } from "react-jss";
import { IRequirementDescription, ITraceLink } from "../../types";
import { RequirementCard } from "../requirement/requirement-card";
import { TraceLinkContent } from "./trace-link-content";

export interface IStateProps {
  loading: boolean;
  traceLinks: ITraceLink[];
}

export interface IDispatchProps {
  fetchDescriptionRelatedTraceLinks: (
    repoName: string,
    commitSha: string,
    descriptionName: string
  ) => void;
}

export interface IOwnProps {
  repoName: string;
  commitSha: string;
  description: IRequirementDescription;
}

export interface IRequirementDetailProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  requirementDetail: {
    width: "100%"
  },
  relatedImplements: {
    margin: { top: "16px" },
    display: "flex",
    flexDirection: "column"
  },
  implementCard: {
    margin: { top: "8px" },
    width: "100%"
  },
  editableArea: {
    marginBottom: "16px"
  },
  requirementArea: {
    margin: { bottom: "16px" }
  },
  typographyTitle: {
    margin: { top: "24px" }
  }
});

export const RequirementDetail: FunctionComponent<IRequirementDetailProps> = memo((props: IRequirementDetailProps) => {
  const styles = useStyles();
  const {
    loading,
    traceLinks,
    repoName,
    commitSha,
    description,
    fetchDescriptionRelatedTraceLinks
  } = props;

  // 挂载开始请求需求对应跟踪链接
  useEffect(() => {
    if (description) {
      const doFetch = async () => {
        try {
          fetchDescriptionRelatedTraceLinks(repoName, commitSha, description.name);
        } catch (e) {
          if (process.env.NODE_ENV === "production") {
            console.log(e);
          }
        }
      };
      doFetch();
    }
  }, [description, repoName, fetchDescriptionRelatedTraceLinks]);

  return (
    <div className={styles.requirementDetail}>
      <Typography.Title level={3}>需求描述</Typography.Title>
      <div className={styles.requirementArea}>
        <RequirementCard
          useCard={false}
          description={description}
        />
      </div>
      <Typography.Title level={3} className={styles.typographyTitle}>
        跟踪链接
      </Typography.Title>
      <TraceLinkContent
        loading={loading}
        repoName={repoName}
        commitSha={commitSha}
        description={description}
        traceLinks={traceLinks}
      />
    </div>
  );
});

export default RequirementDetail;