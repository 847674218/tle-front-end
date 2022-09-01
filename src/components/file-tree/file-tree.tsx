// 已重构
// 将文件结构按照树的形式展示
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { Tree } from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { IFileTreeNode, ShaFileContentMap } from "../../types";

export interface IFileTreeProps {
  showLoading?: boolean;
  treeData: IFileTreeNode[];
  shaFileContentMap: ShaFileContentMap;
  onClick?: (treeNode: IFileTreeNode) => void;
  defaultExpandAll?: boolean;
}

// 格式化
const normalize = (root: IFileTreeNode[], shaFileContentMap: ShaFileContentMap) => {
  if (root) {
    let res: any = [];
    let mapping: any = {};
    for (const node of root) {
      let children;
      let icon;
      if (node.type === "FOLDER") {
        let res: any[] = normalize(node.subTrees || [], shaFileContentMap);
        children = res[0];
        mapping = {
          ...mapping,
          ...res[1]
        };
      } else if (node.type === "FILE") {
        children = [];
        icon = !!shaFileContentMap[node.sha] ? (<CheckCircleOutlined />) : (<LoadingOutlined />);
        mapping[node.sha] = { ...node };
      }
      res.push({
        key: node.sha,
        title: node.path,
        children,
        icon
      });
    }
    return [res, mapping];
  }
  return [[], {}];
};

const useStyles = createUseStyles({
  fileTrees: {}
});

const FileTree: FunctionComponent<IFileTreeProps> = memo((props: IFileTreeProps) => {
  const styles = useStyles();
  const {
    treeData,
    shaFileContentMap,
    onClick
  } = props;

  const [newTreeData, shaMapping] = React.useMemo(
    () => normalize(treeData, shaFileContentMap),
    [treeData, shaFileContentMap]
  );

  return (
    <Tree
      onClick={(e, treeNode) => {
        if (onClick) {
          onClick(shaMapping[treeNode.key.toString()]);
        }
      }}
      className={styles.fileTrees}
      // selectable：是否可选中
      selectable={false}
      // checkable：节点前添加Checkbox复选框
      checkable={false}
      // showIcon：是否展示TreeNode title前的图标，没有默认样式，如设置为true，需要自行定义图标相关样式
      showIcon={true}
      // multiple：支持点选多个节点（节点本身）
      multiple
      // defaultExpandAll：默认展开所有树节点
      defaultExpandAll={true}
      // autoExpandParent：是否自动展开父节点
      // autoExpandParent
      // defaultExpandParent：默认展开父节点
      // defaultExpandParent
      // treeData：treeNodes数据，如果设置则不需要手动构造TreeNode节点（key在整个树范围内唯一）
      treeData={newTreeData}
    />
  );
});

export default FileTree;