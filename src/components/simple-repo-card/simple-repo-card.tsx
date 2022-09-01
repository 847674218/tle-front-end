// 已重构
// 仓库信息概要
import React, { FC, memo } from "react";
import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { RouteConstants } from "../../routes/constants";
import { ProgramLanguage } from "../../utils/language-color";
import { RepositoryAvatar } from "../repository-avatar";

export interface IStateProps { }

export interface IDispatchProps { }

export interface IOwnProps {
  repoId: string;
  repositoryName: string;
  language: ProgramLanguage;
  description: string;
}

export interface ISimpleRepoCardProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  simpleRepoCard: {
    height: "100%"
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cardTitle: {
    display: "inline-block",
    margin: { left: "10px" }
  },
  cardDescription: {
    margin: { top: "10px", bottom: "10px" }
  },
  cardBottomWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  cardBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  updateDate: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

const SimpleRepoCard: FC<ISimpleRepoCardProps> = memo((props: ISimpleRepoCardProps) => {
  const styles = useStyles();
  const {
    repoId,
    description,
    repositoryName,
    language,
  } = props;

  return (
    <Card
      className={styles.simpleRepoCard}
      hoverable
      bodyStyle={{
        height: "100%",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}
    >
      <div className={styles.cardHeader}>
        <RepositoryAvatar
          size={"small"}
          repositoryName={repositoryName}
          language={language}
        />
        <Typography.Text className={styles.cardTitle}>
          <Link to={RouteConstants.REPOSITORY_DETAIL(repoId)}>
            {repositoryName}
          </Link>
        </Typography.Text>
      </div>
      <Typography.Paragraph className={styles.cardDescription}>
        {description}
      </Typography.Paragraph>
    </Card>
  );
});

export default SimpleRepoCard;