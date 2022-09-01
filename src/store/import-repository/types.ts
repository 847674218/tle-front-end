// 已重构
/**
 *  ----------仓库导入过程----------
 *  开始导入仓库
 *  更新（写入）正在导入仓库的基础信息
 *  停止导入
 *  把仓库信息存储到数据库中
 */
import { IBranch, ICommit, IFileTreeNode, ShaFileContentMap } from "./../../types/index";
import { IImportedRepository } from "../../types";

// 开始导入仓库
export const START_IMPORT_REPOSITORY = "START_IMPORT_REPOSITORY";

// 更新正在导入的仓库的基础信息
export const UPDATE_IMPORTING_REPOSITORY = "UPDATE_IMPORTING_REPOSITORY";

// 复制结束
export const FINISH_CLONE_BRANCHES = "FINISH_CLONE_BRANCHES";
export const FINISH_CLONE_COMMITS = "FINISH_CLONE_COMMITS";
export const FINISH_CLONE_FILE_STRUCTURE = "FINISH_CLONE_FILE_STRUCTURE";
export const FINISH_CLONE_FILE_CONTENT = "FINISH_CLONE_FILE_CONTENT";

// 导入结果（成功和失败）
export const IMPORT_REPOSITORY_SUCCESS = "IMPORT_REPOSITORY_SUCCESS";
export const IMPORT_REPOSITORY_FAILURE = "IMPORT_REPOSITORY_FAILURE";

// 停止导入
export const STOP_IMPORT = "STOP_IMPORT";

// 把仓库信息存储到数据库中
export const SEND_IMPORTED_REPOSITORY = "SEND_IMPORTED_REPOSITORY";
export const SEND_IMPORTED_REPOSITORY_SUCCESS = "SEND_IMPORTED_REPOSITORY_SUCCESS";
export const SEND_IMPORTED_REPOSITORY_FAILURE = "SEND_IMPORTED_REPOSITORY_FAILURE";

// 导入仓库的state
export interface IImportRepositoryState {
  loading: boolean; // 加载状态
  importStarted: boolean; // 导入过程开始（与下个定义意义相反）
  importDone: boolean;  // 导入完成（指仓库分支、提交、结构和文件内容导入完成）
  stop: boolean;  // 停止导入
  importProccess?: ImportProccess; // 仓库导入过程（见下方数据定义）
  importedRepository?: IImportedRepository; // 已导入的仓库（导入过程就是往仓库对象里面复制数据）
  error?: boolean | string; // 错误
}

// 导入仓库的过程
export type ImportProccess =
  | "BRANCHES"
  | "COMMITS"
  | "FILE_STUCTURE"
  | "FILE_CONTENT";

// 开始导入仓库
export interface IStartImportRepositoryAction {
  type: typeof START_IMPORT_REPOSITORY;
}

// 更新（写入）正在导入的仓库的基础信息
export interface IUpdateImportingRepositoryAction {
  type: typeof UPDATE_IMPORTING_REPOSITORY;
  payload: Partial<IImportedRepository>;
}

// 复制
export interface IFinishCloneBranchesAction {
  type: typeof FINISH_CLONE_BRANCHES;
  payload: { branches: IBranch[] };
}

export interface IFinishCloneCommitsAction {
  type: typeof FINISH_CLONE_COMMITS;
  payload: { commits: ICommit[] };
}

export interface IFinishCloneFileStructureAction {
  type: typeof FINISH_CLONE_FILE_STRUCTURE;
  payload: { files: IFileTreeNode[] };
}

export interface IFinishCloneFileContentAction {
  type: typeof FINISH_CLONE_FILE_CONTENT;
  payload: { map: ShaFileContentMap };
}

// 导入结果
export interface IImportRepositorySuccessAction {
  type: typeof IMPORT_REPOSITORY_SUCCESS;
  payload: IImportedRepository;
}

export interface IImportRepositoryFailureAction {
  type: typeof IMPORT_REPOSITORY_FAILURE;
}

// 停止导入
export interface IStopImportAction {
  type: typeof STOP_IMPORT;
}

// 把仓库信息存储到数据库中
export interface ISendImportedRepositoryAction {
  type: typeof SEND_IMPORTED_REPOSITORY;
}

export interface ISendImportedRepositorSuccessAction {
  type: typeof SEND_IMPORTED_REPOSITORY_SUCCESS;
}

export interface ISendImportedRepositoryFailureAction {
  type: typeof SEND_IMPORTED_REPOSITORY_FAILURE;
  meta?: string;
}

export type ImportRepositoryAcitons =
  | IStartImportRepositoryAction
  | IImportRepositorySuccessAction
  | IImportRepositoryFailureAction
  | IUpdateImportingRepositoryAction
  | IFinishCloneBranchesAction
  | IFinishCloneCommitsAction
  | IFinishCloneFileContentAction
  | IFinishCloneFileStructureAction
  | ISendImportedRepositoryAction
  | ISendImportedRepositorSuccessAction
  | ISendImportedRepositoryFailureAction
  | IStopImportAction;

export type ImportRepositoryActionTypes =
  | typeof START_IMPORT_REPOSITORY
  | typeof IMPORT_REPOSITORY_SUCCESS
  | typeof IMPORT_REPOSITORY_FAILURE
  | typeof UPDATE_IMPORTING_REPOSITORY
  | typeof FINISH_CLONE_BRANCHES
  | typeof FINISH_CLONE_COMMITS
  | typeof FINISH_CLONE_FILE_CONTENT
  | typeof FINISH_CLONE_FILE_STRUCTURE
  | typeof SEND_IMPORTED_REPOSITORY
  | typeof SEND_IMPORTED_REPOSITORY_SUCCESS
  | typeof SEND_IMPORTED_REPOSITORY_FAILURE
  | typeof STOP_IMPORT;