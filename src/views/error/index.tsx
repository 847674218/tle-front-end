// 已重构
// 出现错误点击按钮跳转至仓库管理界面
import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Result, Button } from "antd";
import { createUseStyles } from "react-jss";
import { RouteConstants } from "../../routes/constants";

export interface IErrorProps extends RouteComponentProps<{ title: string; subTitle: string }> { }

const useStyle = createUseStyles({
  result: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc!important",
    borderRadius: "10px",
    margin: "3rem",
    background: "#fff"
  }
});

export const Error: React.FunctionComponent<IErrorProps> = React.memo((props: IErrorProps) => {
  const styles = useStyle();
  const { match: { params: { title, subTitle } } } = props;

  return (
    <div className={styles.result}>
      <Result
        status="error"
        title={title}
        subTitle={subTitle}
        extra={[
          <Link key="repositoryManagement" to={RouteConstants.REPOSITORY}>
            <Button type="primary">前往仓库管理</Button>
          </Link>
        ]}
      />
    </div>
  );
});