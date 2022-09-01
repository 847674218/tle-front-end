// 已重构
// 仓库属性卡的抬头
import React, { FunctionComponent, memo, ReactNode } from "react";
import { Badge } from "antd";
import { createUseStyles } from "react-jss";

export interface ICardTitleProps {
  itemNumber?: number;
  text: string;
  actions?: ReactNode[];
}

const useStyles = createUseStyles({
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center"
  },
  text: {
    margin: { left: "16px" }
  },
  actions: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

const CardTitle: FunctionComponent<ICardTitleProps> = memo((props: ICardTitleProps) => {
  const styles = useStyles();
  const { text, itemNumber, actions } = props;

  return (
    <div className={styles.cardTitle}>
      {/* Badge：徽标数 */}
      <Badge
        count={itemNumber}
        style={{
          backgroundColor: "rgba(27,31,35,.15)",
          color: "#24292e",
          marginBottom: "1px"
        }}
      />
      <span className={styles.text}>{text}</span>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
});

export default CardTitle;