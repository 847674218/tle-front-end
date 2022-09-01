// 已重构
import { ProgramLanguage } from "./../utils/language-color";

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  organization: string;
  program: string;
  githubId?: string;
  createAt: number;
  lastUpdateAt: number;
}

// 已导入的仓库(新)
export interface IImportedRepository {
  _id: string;
  name: string;
  ownerId: string;
  currentBranch: string;
  // 跟GitHub监听服务器上的数据类型定义有出入（因为这里用到语言对应颜色展示）
  language: ProgramLanguage;
  description: string;
  stakeholders: string[];
  branches: IBranch[];
  commits: ICommit[];
  trees: IFileTreeNode[];
  shaFileContentMap: ShaFileContentMap;
  lastUpdateAt?: number;
}

// 分支(新)
export interface IBranch {
  name: string;
  commitHeadSha: string;
}

// 提交(新)
export interface ICommit {
  sha: string;
  message: string;
  committer: { id?: string } | null;
  committedAt: number;
  author: { id: string } | null;
  stats: {
    total: number;
    additions: number;
    deletions: number
  };
  parents: { sha: string; }[];
  changedFiles: ICommitChanges[];
  // 当前提交对应的文件树sha（这个似乎是多版本展示需要用到的）
  // relatedTree: String
}

// 提交的文件的变更内容(新)
export interface ICommitChanges {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  patch: string;
  rawContent: string;
}

// 文件树节点(新)
export interface IFileTreeNode {
  sha: string;
  // 文件名称（不含路径）
  path: string;
  // 完整名称（含路径）
  fullyQualifiedName: string;
  type: "FOLDER" | "FILE";
  subTrees: IFileTreeNode[] | null;
}

// 文件内容映射：SHA值<->文件内容(新)
export type ShaFileContentMap = {
  [key: string]: string
};

// --------需求部分数据定义--------

// 需求
export interface IRequirement {
  _id: string;
  relatedRepoName: string;
  relatedRepoOwnerId?: string;
  relatedCommitSha: String;
  descriptions: IRequirementDescription[];
}

// 需求规约
export interface IRequirementDescription {
  _id: string;
  description: string;
  name: string;
  priority: string;
  participants: string;
  triggeringCondition: string;
  preCondition: string;
  postCondition: string;
  normalProcess: string;
  expansionProcess: string;
  specialNeeds: string;
  createBy: string;
  createAt: number;
  lastUpdateBy: string;
  lastUpdateAt: number;
  traced?: boolean;
}

// --------跟踪链接部分数据定义--------

// 跟踪矩阵
export interface ITraceLinkMatrix {
  _id: string;
  relatedRepoName: string;
  relatedRepoOwnerId?: string;
  relatedCommitSha: String;
  links: ITraceLink[];
}

// 跟踪链接
export interface ITraceLink {
  _id: string;
  requirementDescriptionName: string;
  fullyQualifiedName: string;
  introducer: string;
  state: string;
  confirmor: string[];
  rejector: string[];
  createAt?: number;
  lastUpdateAt?: number;
}

// --------统计图部分数据定义--------

// 统计数据定义：用来查找需求对应的跟踪链接数目和文件对应的需求数目
export interface IStatistic {
  label: string;
  value: number;
}

// 和弦图数据定义
export type GraphNode = {
  id: string | number;
  name: string;
  value: number
};

export type GraphLink = {
  source: string | number;
  target: string | number;
  sourceWeight: number;
  targetWeight: number;
};

export type GraphData = {
  links: GraphLink[];
  nodes: GraphNode[]
};

// 用户动态数据定义
export interface IUserActivity {
  _id: string;
  avatarUrl: string;
  title: string;
  description: string;
}