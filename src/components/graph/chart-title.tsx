// 已重构
// 标题样式
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";

export interface IChartTitleProps {
  text: string;
}

const useStyle = createUseStyles({
  mainTitle: {
    fontSize: 20,
    color: "black",
    textAlign: "center"
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center"
  }
});

export const ChartTitle: FunctionComponent<IChartTitleProps> = memo(
  ({ text }) => {
    const styles = useStyle();
    return <h3 className={styles.mainTitle}>{text}</h3>;
  }
);

export const ChartSubTitle: FunctionComponent<IChartTitleProps> = memo(
  ({ text }) => {
    const styles = useStyle();
    return <h4 className={styles.subTitle}>/{text}</h4>;
  }
);