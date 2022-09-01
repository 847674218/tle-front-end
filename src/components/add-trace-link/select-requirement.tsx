// 已重构
// 添加跟踪链接：给某个文件添加关联需求
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUseStyles, useTheme } from "react-jss";
import { Button, Card, Select, Spin } from "antd";
import { RootState } from "../../store/reducers";
import { addTraceLink as sendNewTraceLink } from "../../store/trace-link/actions";
import { CustomTheme } from "../../theme";
import { IRequirementDescription, ITraceLink } from "../../types";

export interface ISelectRequirementProps {
  repoName: string;
  commitSha: string;
  fileName: string;
  descriptions: IRequirementDescription[];
}

const bodyStyle = { padding: "8px 12px" };

const useStyle = createUseStyles(theme => ({
  traceLinkCard: {
    margin: { top: "8px" },
    width: "100%"
  },
  link: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  buttons: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  button: {
    margin: { left: "16px" }
  },
  select: {
    width: "100%"
  }
}));

export const SelectRequirement: React.FunctionComponent<ISelectRequirementProps> = React.memo((props: ISelectRequirementProps) => {
  const { repoName, commitSha, fileName, descriptions } = props;
  const theme = useTheme() as CustomTheme;
  const styles = useStyle({ theme });

  const cardStyle = React.useMemo(() => {
    return {
      borderLeftColor: theme.confirmColor,
      borderLeftWidth: "8px"
    };
  }, [theme]);

  const loading = useSelector<RootState, boolean>(
    state => state.traceLinkReducer.sendNewTraceLinkLoading
  );

  const userName = localStorage.getItem("userName") || "";

  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [description, setDescription] = React.useState<IRequirementDescription | null>(null);

  const handleButtonClick = () => setShowInput(prev => !prev);

  // 找到选中的需求是哪个并将需求内容填充至description
  const handleSelectChange = (descriptionId: string) => {
    let selected: IRequirementDescription | undefined;
    for (const description of descriptions) {
      if (descriptionId.toString() === description._id.toString()) {
        selected = description;
      }
    }
    setDescription({ ...(selected as IRequirementDescription) });
  };

  const dispatch = useDispatch();
  const handleConfirmButtonClick = async () => {
    if (description) {
      dispatch(sendNewTraceLink(repoName, commitSha, toTraceLink(description)));
      setShowInput(false);
    }
  };

  const toTraceLink = (
    description: IRequirementDescription
  ): Omit<ITraceLink, "_id"> => {
    return {
      requirementDescriptionName: description.name,
      fullyQualifiedName: fileName,
      introducer: userName,
      state: "create",
      confirmor: [userName],
      rejector: []
    };
  };

  return (
    <>
      <Button block type={"primary"} onClick={handleButtonClick}>
        创建跟踪链接
      </Button>
      {showInput && (
        <Spin spinning={loading}>
          <Card
            hoverable
            style={cardStyle}
            bodyStyle={bodyStyle}
            className={styles.traceLinkCard}
          >
            <Card.Meta
              title={fileName}
              description={
                <div>
                  <div className={styles.link}>
                    <Select
                      className={styles.select}
                      value={description?.name}
                      onChange={handleSelectChange}
                    >
                      {descriptions.map((description, index) => {
                        return (
                          <Select.Option
                            key={description._id || index}
                            value={description._id}
                          >
                            {description.normalProcess}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <div className={styles.buttons}>
                      <Button
                        className={styles.button}
                        type="primary"
                        onClick={handleConfirmButtonClick}
                      >
                        确认
                      </Button>
                      <Button
                        className={styles.button}
                        danger
                        type="primary"
                        onClick={() => setShowInput(false)}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                </div>
              }
            />
          </Card>
        </Spin>
      )}
    </>
  );
});