// 已重构
// 产品及服务展示
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { dataSource } from "./data-source";

export interface IProductAndServiceProps { }

const useStyles = createUseStyles({
  productServiceContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around"
  },
  productServiceContentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  productServiceContentBoxTitle: {
    fontSize: "24px"
  }
});

const ProductAndService: FunctionComponent<IProductAndServiceProps> = memo(
  (props: IProductAndServiceProps) => {
    const styles = useStyles();

    return (
      <section className={styles.productServiceContent}>
        {dataSource.map(data => {
          return (
            <div className={styles.productServiceContentBox} key={data.title}>
              <img
                width={"100px"}
                height={"100px"}
                src={data.image}
                alt={"product service"}
              />
              <h1 className={styles.productServiceContentBoxTitle}>
                {data.title}
              </h1>
              <span>{data.description}</span>
            </div>
          );
        })}
      </section>
    );
  }
);

export default ProductAndService;