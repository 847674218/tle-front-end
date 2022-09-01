// 已重构
// 设置子布局（产品服务和使用流程）的样式
import React, { FunctionComponent, memo, ReactNode } from "react";
import { createUseStyles } from "react-jss";

export interface ISectionLayoutProps {
  title: string;
  content: ReactNode;
}

const useStyles = createUseStyles({
  section: { width: "100%", minHeight: "60vh", padding: "36px" },
  titleWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: { top: "10px", bottom: "10px" }
  },
  title: {
    fontSize: "32px",
    color: "#314659",
    margin: {
      top: "24px",
      bottom: "24px"
    }
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

const SectionLayout: FunctionComponent<ISectionLayoutProps> = memo(
  (props: ISectionLayoutProps) => {
    const { title, content } = props;
    const styles = useStyles();

    return (
      <section className={styles.section}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.content}>{content}</div>
      </section>
    );
  }
);

export default SectionLayout;