// 已重构
// 变更文件的展示：文件增删的示意块
import React, { FunctionComponent, memo, ReactNode } from "react";
import { createUseStyles } from "react-jss";

export interface IStatsBoxProps {
  color?: string;
}

const useStyles = createUseStyles({
  box: {
    width: "8px",
    height: "8px",
    margin: { left: "1px" },
    bacground: "#d1d5da"
  },
  boxes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: { left: "16px" }
  }
});

const StatsBox: FunctionComponent<IStatsBoxProps> = memo(
  (props: IStatsBoxProps) => {
    const styles = useStyles();
    const { color } = props;
    return <span className={styles.box} style={{ background: color }} />;
  }
);

export interface IStatsBoxesProps {
  added: number;
  removed: number;
  total: number;
}

const StatsBoxes: FunctionComponent<IStatsBoxesProps> = memo(
  (props: IStatsBoxesProps) => {
    const { added, removed, total } = props;
    const styles = useStyles();

    const addBoxNumber: number = Math.round((added * 5) / total);
    const removedBoxNumber: number = Math.round((removed * 5) / total);

    const boxes: ReactNode[] = [];

    for (let i = 0; i < addBoxNumber; i++) {
      boxes.push(<StatsBox key={`add-${i}`} color="#2cbe4e" />);
    }
    for (let i = 0; i < removedBoxNumber; i++) {
      boxes.push(<StatsBox key={`removed=${i}`} color="#cb2431" />);
    }

    return <div className={styles.boxes}>{boxes}</div>;
  }
);

export default StatsBoxes;