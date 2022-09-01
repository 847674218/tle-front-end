// 已重构
// 导入项目自带需求（新）或者手动添加需求或者上传文件
// 夹带导入最新的跟踪链接
import React from "react";
import { Button, Result, Card, message, Upload } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { UploadOutlined } from '@ant-design/icons';
import { IFileTreeNode, IRequirementDescription, IImportedRepository, ITraceLink } from "../../types";
import { RequirementForm } from "../../components/requirement/requirement-form";
import { RequirementCard } from "../../components/requirement/requirement-card";

export interface IImportRequirementProps {
    onDescriptionsConfirmed: (descriptions: Omit<IRequirementDescription, "_id">[]) => void;
    onTraceLinksConfirmed: (traceLinks: Omit<ITraceLink, "_id">[]) => void;
}

// 遍历所有的需求并展示
const Descriptions = React.memo<{ descriptions: Omit<IRequirementDescription, "_id">[]; }>(({ descriptions }) => {
    return (
        <>
            {(descriptions || []).map((description, index) => (
                <RequirementCard key={index} description={description} />
            ))}
        </>
    );
});

// 从配置文件中解析出需求（需要需求文档写成json对象的格式）
const parseDescriptions = (jsonStr: string, defaultUser?: string): Omit<IRequirementDescription, "_id">[] => {
    const parsed: any = JSON.parse(jsonStr);
    const res: Omit<IRequirementDescription, "_id">[] = [];
    for (const item of parsed) {
        const {
            name,
            description,
            priority,
            participants,
            triggeringCondition,
            preCondition,
            postCondition,
            normalProcess,
            expansionProcess,
            specialNeeds,
            createBy,
        } = item;
        res.push({
            name: name || "",
            description: description,
            priority: priority || "medium",
            participants: participants || "",
            triggeringCondition: triggeringCondition || "",
            preCondition: preCondition || "",
            postCondition: postCondition || "",
            normalProcess: normalProcess || "",
            expansionProcess: expansionProcess || "",
            specialNeeds: specialNeeds || "",
            createBy: createBy || defaultUser,
            createAt: Date.now(),
            lastUpdateBy: createBy || defaultUser,
            lastUpdateAt: Date.now(),
        });
    }
    return res;
};

// 从配置文件中解析出跟踪链接
const parseTraceLinks = (jsonStr: string, defaultUser?: string): Omit<ITraceLink, "_id">[] => {
    const parsed: any = JSON.parse(jsonStr);
    const res: Omit<ITraceLink, "_id">[] = [];
    for (const item of parsed) {
        const {
            requirementDescription,
            fullyQualifiedName,
            introducer,
            state,
            confirmor,
            rejector
        } = item;
        res.push({
            requirementDescriptionName: requirementDescription || "",
            fullyQualifiedName: fullyQualifiedName || "",
            introducer: introducer || "",
            state: state || "",
            confirmor: confirmor || [],
            rejector: rejector || [],
            createAt: Date.now(),
            lastUpdateAt: Date.now(),
        });
    }
    return res;
};

export const ImportRequirement: React.FunctionComponent<IImportRequirementProps> = React.memo((props: IImportRequirementProps) => {
    const { onDescriptionsConfirmed, onTraceLinksConfirmed } = props;

    const githubId = useSelector<RootState, string | undefined>(state => state.authReducer.ghProfile?.login);
    const importDone = useSelector<RootState, boolean>(state => state.importRepositoryReducer.importDone);
    // 导入的仓库信息
    const repository = useSelector<RootState, IImportedRepository | undefined>(state => state.importRepositoryReducer.importedRepository);

    // 定义需求描述的state
    const [descriptions, setDescriptions] = React.useState<Omit<IRequirementDescription, "_id">[]>([]);
    const [traceLinks, setTraceLinks] = React.useState<Omit<ITraceLink, "_id">[]>([]);

    // 从根目录下读取需求文件
    const readRequirementDescriptionFromConfig = () => {
        if (repository) {
            const { trees, shaFileContentMap } = repository;
            let requirementFile: IFileTreeNode | null = null;
            let traceLinkFile: IFileTreeNode | null = null;

            for (const node of trees) {
                if (node.fullyQualifiedName === "requirement.json") {
                    requirementFile = node;
                } else if (node.fullyQualifiedName === "config.json") {
                    traceLinkFile = node;
                }
            }

            // 配置文件不存在
            if (!requirementFile) {
                message.error("根目录下没有找到需求文件");
                return;
            } else if (!traceLinkFile) {
                message.error("根目录下没有找到跟踪链接文件");
                return;
            }

            // 获取配置文件内容
            const requirementFileContent: string | undefined = shaFileContentMap[requirementFile.sha];
            const traceLinkFileContent: string | undefined = shaFileContentMap[traceLinkFile.sha];

            if (!requirementFileContent) {
                message.error("配置文件为空！");
                return;
            } else if (!traceLinkFileContent) {
                message.error("配置文件为空！");
                return;
            }

            // 解析需求描述
            const descriptions: Omit<IRequirementDescription, "_id">[] = parseDescriptions(requirementFileContent, githubId);
            // 更新需求文档属性
            setDescriptions([...descriptions]);

            const traceLinks: Omit<ITraceLink, "_id">[] = parseTraceLinks(traceLinkFileContent, githubId);
            setTraceLinks([...traceLinks]);

        } else {
            message.error("请先导入仓库！");
            return;
        }
    };

    React.useEffect(() => {
        onDescriptionsConfirmed(descriptions);
        onTraceLinksConfirmed(traceLinks);
    }, [descriptions, traceLinks]);

    // 正常的return部分
    // 如果导入未完成则显示警告信息
    if (!importDone) {
        return <Result status="warning" title="请先等待导入结束" />;
    } else {
        return (
            <>
                <Card style={{ marginBottom: "16px" }}>
                    {/* 操作按钮部分的卡片 */}
                    <Card.Meta
                        title={"导入新版本需求"}
                        description={
                            <>
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={readRequirementDescriptionFromConfig}
                                >
                                    从根目录下读取
                                </Button>
                                <br />
                                <Upload>
                                    <Button icon={<UploadOutlined />}>点击此处上传需求</Button>
                                </Upload>
                            </>
                        }
                    />
                </Card>
                {/* 需求表单(有输入框需要填写) */}
                <RequirementForm
                    onDone={(description: Omit<IRequirementDescription, "_id">) => {
                        setDescriptions(old => [description, ...old]);
                    }}
                />
                {/* 遍历所有的需求并展示 */}
                <Descriptions descriptions={descriptions} />
            </>
        );
    }
});