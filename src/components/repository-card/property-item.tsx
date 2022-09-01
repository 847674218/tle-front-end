// 已重构
// 已导入仓库的信息展示卡片：属性对上下排布，上面是属性名称，下面是值
import React, { FunctionComponent, memo, ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { Row, Col } from "antd";

export interface IPropertyItemProps {
  property: ReactNode;
  value: ReactNode;
}

const useStyles = createUseStyles({
  propertyItem: {
    width: "100%",
    height: "100%"
  },
  topText: {
    fontSize: "12px",
    color: "#9d9d9d"
  },
  bottomText: {
    color: "#666",
    fontSize: "14px"
  }
});

const PropertyItem: FunctionComponent<IPropertyItemProps> = memo((props: IPropertyItemProps) => {
  const styles = useStyles();
  const { property, value } = props;

  return (
    <Row>
      <Col span={24}>
        <span className={styles.topText}>{property}</span>
      </Col>
      <Col span={24}>
        <span className={styles.bottomText}>{value}</span>
      </Col>
    </Row>
  );
}
);

export default PropertyItem;