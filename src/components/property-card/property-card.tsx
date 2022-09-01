// 已重构
// 仓库属性卡模板（外壳）
import React, { FunctionComponent, memo, ReactNode, useMemo } from "react";
import { createUseStyles } from "react-jss";
import { Card, Empty } from "antd";
import CardTitle, { ICardTitleProps } from "./card-title";

export interface IPropertyCardProps {
  titleProps: ICardTitleProps;
  children?: ReactNode[] | ReactNode;
  color?: "white" | "grey";
}

const useStyles = createUseStyles({
  contentCard: {
    borderRadius: "5px",
    width: "100%"
  }
});

const bodyStyle = {
  padding: "0px",
  width: "100%"
};

const PropertyCard: FunctionComponent<IPropertyCardProps> = memo((props: IPropertyCardProps) => {
  const { titleProps, children, color } = props;
  const styles = useStyles();

  const cardStyle = useMemo(() => ({ background: color === "white" ? "#fff" : "#eff1f3" }), [color]);

  return (
    <Card
      className={styles.contentCard}
      style={cardStyle}
      bodyStyle={bodyStyle}
      title={<CardTitle {...titleProps} />}
    >
      {!!children ? children : <Empty />}
    </Card>
  );
});

PropertyCard.defaultProps = { color: "grey" };

export default PropertyCard;