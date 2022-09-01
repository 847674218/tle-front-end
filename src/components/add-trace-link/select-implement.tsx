// 已重构
// 添加跟踪链接：给某个需求添加关联文件
import React from "react";
import { Button, Card, Select, Spin } from "antd";
import { createUseStyles, useTheme } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { addTraceLink as sendNewTraceLink } from "../../store/trace-link/actions";
import { CustomTheme } from "../../theme";
import { IRequirementDescription, ITraceLink } from "../../types";

export interface ISelectImplementProps {
  repoName: string;
  commitSha: string;
  description: IRequirementDescription;
  fullyQualifiedNames: string[];
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

export const SelectImplement: React.FunctionComponent<ISelectImplementProps> = React.memo((props: ISelectImplementProps) => {
  const theme = useTheme() as CustomTheme;
  const styles = useStyle({ theme });
  const { repoName, commitSha, description, fullyQualifiedNames } = props;

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
  const [filename, setFilename] = React.useState<string | null>(null);

  const handleButtonClick = () => setShowInput(prev => !prev);

  const handleSelectChange = (filename: string) => setFilename(filename);

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
      fullyQualifiedName: filename ? filename.slice(filename.lastIndexOf('/') + 1) : "文件名不存在",
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
              title={description.name}
              description={
                <div>
                  <div className={styles.link}>
                    <Select
                      className={styles.select}
                      value={filename || ""}
                      onChange={handleSelectChange}
                    >
                      {fullyQualifiedNames.map(name => {
                        return (
                          <Select.Option key={name} value={name}>
                            {name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <div className={styles.buttons}>
                      <Button
                        onClick={handleConfirmButtonClick}
                        className={styles.button}
                        type="primary"
                      >
                        确认
                      </Button>
                      <Button
                        onClick={() => setShowInput(false)}
                        className={styles.button}
                        danger
                        type="primary"
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