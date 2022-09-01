// 已重构
// 代码高亮（添加是绿色，删除是粉色）
import React, { FunctionComponent, memo, CSSProperties, useMemo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface IHighlightCodeProps {
  code: string;
  useDiff?: boolean;
  language: string;
}

const HighlightCode: FunctionComponent<IHighlightCodeProps> = memo((props: IHighlightCodeProps) => {
  const { code, useDiff, language } = props;
  if (!code) return null;

  const { codeString, addedLineNumbers, removedLineNumbers } = useMemo(() => {
    // 使用Diff算法比较文件差异
    if (useDiff) {
      const rawPatch: string[] = code.split("\n");
      const codeString: string[] = [];
      const addedLineNumbers: number[] = [];
      const removedLineNumbers: number[] = [];

      // 每行开头第一个字符是+就是添加了数据，是-就是删除了数据
      // 逐行处理：计算添加和删除的数据数目并且把完整代码摘出来
      for (let i = 1; i < rawPatch.length; i++) {
        const rawLine = rawPatch[i];
        if (rawLine[0] === "+") {
          addedLineNumbers.push(i);
        } else if (rawLine[0] === "-") {
          removedLineNumbers.push(i);
        }
        codeString.push(rawLine.substr(1));
      }

      return {
        // 把所有元素放进一个字符串并通过指定字符分隔
        codeString: codeString.join("\n"),
        addedLineNumbers,
        removedLineNumbers
      };
    } else
      return {
        codeString: code,
        addedLineNumbers: [],
        removedLineNumbers: []
      };
  }, [code, useDiff]);

  // 设置添加删除行的颜色
  const lineProps = useMemo(() => {
    if (useDiff) {
      return (lineNumber: number) => {
        let style: CSSProperties = { display: "block" };
        if (addedLineNumbers.indexOf(lineNumber) !== -1) {
          style.backgroundColor = "#dbffdb";
        } else if (removedLineNumbers.indexOf(lineNumber) !== -1) {
          style.backgroundColor = "#ffecec";
        }
        return { style };
      };
    } else
      return undefined;
  }, [useDiff, addedLineNumbers, removedLineNumbers]);

  return (
    <SyntaxHighlighter
      language={language}
      style={docco}
      showLineNumbers
      // 自动换行
      wrapLines={true}
      lineProps={lineProps}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}
);

HighlightCode.defaultProps = {
  useDiff: false
};

export default HighlightCode;