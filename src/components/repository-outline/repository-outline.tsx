// 已重构
// 跟踪链接统计图
import React, { FunctionComponent, memo, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Card, Spin, Statistic, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IImportedRepository, IRequirementDescription, IStatistic, ITraceLink } from "../../types";
import { RequirementStatisticBarChart } from "../graph/requirement-statistic-bar-chart";
import { ImplementStatisticBarChart } from "../graph/implement-statistic-bar-chart";

export interface IStateProps {
    loading: boolean;
    repo: IImportedRepository | undefined;
    descriptions: IRequirementDescription[] | undefined;
    traceLinks: ITraceLink[];
    requirementStatistic: IStatistic[];
    fileStatistics: IStatistic[];
    requirementNumber: number[];
    traceLinkNumber: number[];
}

export interface IDispatchProps {
    fetchRequirementStatistic: (repoName: string, commitSha: string) => void,
    fetchFileStatistic: (repoName: string, commitSha: string) => void,
    fetchRequirementNumber: (repoName: string, commitSha: string) => void
    fetchTraceLinkNumber: (repoName: string, commitSha: string) => void
}

export interface IOwnProps {
    repoName: string;
    commitSha: string;
}

export interface IRepositoryOutlineProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
    container: {
        width: "100%",
        height: "100%"
    },
    topSmallCardsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: "10px"
    },
    smallCard: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    iconContainer: {
        position: "absolute",
        top: "10px",
        right: "10px",
        cursor: "pointer"
    },
    statisticContainer: {
        width: "100%",
        margin: { top: "16px" }
    }
});

// 折线图统计卡属性
interface ISmallCardProps {
    title: string;
    value: string | number;
    description: string;
    data: number[];
}

// 折线图统计卡样式
const SmallCard: React.FunctionComponent<ISmallCardProps> = React.memo((props: ISmallCardProps) => {
    const { title, value, description, data } = props;
    const styles = useStyles();

    return (
        <div>
            <Card className={styles.smallCard} >
                <div className={styles.iconContainer}>
                    <Tooltip title={description}>
                        <InfoCircleOutlined />
                    </Tooltip>
                </div>
                <Statistic title={title} value={value} />
                <Sparklines data={data}>
                    <SparklinesLine color="blue" />
                </Sparklines>

            </Card>
        </div>
    );
});

const RepositoryOutline: FunctionComponent<IRepositoryOutlineProps> = memo((props: IRepositoryOutlineProps) => {
    const styles = useStyles();
    const {
        loading,
        descriptions,
        traceLinks,
        requirementStatistic,
        fileStatistics,
        requirementNumber,
        traceLinkNumber,
        fetchRequirementStatistic,
        fetchFileStatistic,
        fetchRequirementNumber,
        fetchTraceLinkNumber,
        repoName,
        commitSha,
    } = props;

    // 挂载开始请求统计图需要的各种数据
    useEffect(() => {
        fetchRequirementStatistic(repoName, commitSha);
        fetchFileStatistic(repoName, commitSha);
        fetchRequirementNumber(repoName, commitSha);
        fetchTraceLinkNumber(repoName, commitSha);
    }, [repoName, commitSha, descriptions, traceLinks]);

    return (
        <div>
            <Spin spinning={loading} >
                {descriptions && traceLinks && (
                    <div className={styles.container}>
                        <div className={styles.topSmallCardsContainer}>
                            <SmallCard
                                title={"当前版本需求数量"}
                                value={descriptions.length}
                                data={requirementNumber.reverse()}
                                description={"版本迭代过程中需求数量的增长态势"}
                            />
                            <SmallCard
                                title="当前版本跟踪链接数量"
                                value={14}
                                data={traceLinkNumber.reverse()}
                                description={"版本迭代过程中跟踪链接数量的增长态势"}
                            />
                        </div>
                        < div className={styles.statisticContainer} >
                            <Card
                                title="需求的统计"
                                bodyStyle={{ padding: "16px 0px 0px 0px" }}
                            >
                                <RequirementStatisticBarChart
                                    loading={loading}
                                    requirementStatistic={requirementStatistic}
                                />
                            </Card>
                        </div>
                        < div className={styles.statisticContainer} >
                            <Card
                                title="实现类的统计"
                                bodyStyle={{ padding: "16px 0px 0px 0px" }}
                            >
                                <ImplementStatisticBarChart
                                    loading={loading}
                                    fileStatistics={fileStatistics}
                                />
                            </Card>
                        </div>
                    </div>
                )}
            </Spin>
        </div>
    );
});

export default RepositoryOutline;