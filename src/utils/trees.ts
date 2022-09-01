// 已重构
// 获取所有文件：将树结构平铺
import { IFileTreeNode } from "../types";

export const flatten = (nodes: IFileTreeNode[]): IFileTreeNode[] => {
  const res: IFileTreeNode[] = [];
  const traverse = (node: IFileTreeNode) => {
    if (node.type === "FILE") {
      res.push({ ...node });
    } else if (node.type === "FOLDER") {
      (node.subTrees || []).map(traverse);
    }
  };

  (nodes || []).map(traverse);

  return res;
};