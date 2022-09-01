// 文件树的内部结构
interface IGHTreeResInnerTree {
  path: string;
  mode: string;
  type: "blob" | "tree";
  size: number;
  sha: string;
  url: string;
}

// 文件树
export interface IGHTreeRes {
  sha: string;
  url: string;
  tree: IGHTreeResInnerTree[];
  truncated: boolean;
}