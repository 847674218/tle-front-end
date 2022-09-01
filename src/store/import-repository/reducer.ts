// 已重构
/**
 *  ----------仓库导入过程----------
 *  开始导入仓库
 *  更新（写入）正在导入仓库的基础信息
 *  停止导入
 *  把仓库信息存储到数据库中
 */
import { IImportedRepository } from "./../../types/index";
import {
  IImportRepositoryState,
  ImportRepositoryAcitons,
  IUpdateImportingRepositoryAction,
  ISendImportedRepositoryFailureAction,
  IFinishCloneBranchesAction,
  IFinishCloneCommitsAction,
  IFinishCloneFileStructureAction,
  IFinishCloneFileContentAction,
  START_IMPORT_REPOSITORY,
  UPDATE_IMPORTING_REPOSITORY,
  FINISH_CLONE_BRANCHES,
  FINISH_CLONE_COMMITS,
  FINISH_CLONE_FILE_STRUCTURE,
  FINISH_CLONE_FILE_CONTENT,
  IMPORT_REPOSITORY_SUCCESS,
  IMPORT_REPOSITORY_FAILURE,
  STOP_IMPORT,
  SEND_IMPORTED_REPOSITORY,
  SEND_IMPORTED_REPOSITORY_SUCCESS,
  SEND_IMPORTED_REPOSITORY_FAILURE,
} from "./types";

const initialState: IImportRepositoryState = {
  loading: false,
  importStarted: false,
  importDone: false,
  stop: false,
};

export const importRepositoryReducer = (
  state = initialState,
  action: ImportRepositoryAcitons
): IImportRepositoryState => {
  switch (action.type) {
    // 开始导入仓库
    case START_IMPORT_REPOSITORY:
      return {
        ...state,
        importStarted: true,
        importDone: false,
        stop: false,
        importProccess: undefined,
        // 未导入任何仓库属性
        importedRepository: undefined
      };
    // 更新（写入）正在导入仓库的基础信息
    case UPDATE_IMPORTING_REPOSITORY:
      const newRepo = (action as IUpdateImportingRepositoryAction).payload as IImportedRepository;
      return {
        ...state,
        importedRepository: { ...newRepo }
      };
    // 复制分支完成
    case FINISH_CLONE_BRANCHES: {
      const { payload: { branches } } = action as IFinishCloneBranchesAction;
      const repo: IImportedRepository = state.importedRepository as IImportedRepository;
      return {
        ...state,
        importProccess: "BRANCHES",
        importedRepository: { ...repo, branches }
      };
    }
    // 复制提交完成
    case FINISH_CLONE_COMMITS: {
      const { payload: { commits } } = action as IFinishCloneCommitsAction;
      const repo: IImportedRepository = state.importedRepository as IImportedRepository;
      return {
        ...state,
        importProccess: "COMMITS",
        importedRepository: { ...repo, commits }
      };
    }
    // 复制文件结构完成
    case FINISH_CLONE_FILE_STRUCTURE: {
      const { payload: { files } } = action as IFinishCloneFileStructureAction;
      const repo: IImportedRepository = state.importedRepository as IImportedRepository;
      return {
        ...state,
        importProccess: "FILE_STUCTURE",
        importedRepository: { ...repo, trees: files }
      };
    }
    // 复制文件内容完成
    case FINISH_CLONE_FILE_CONTENT: {
      const { payload: { map } } = action as IFinishCloneFileContentAction;
      const repo: IImportedRepository = state.importedRepository as IImportedRepository;
      return {
        ...state,
        importProccess: "FILE_CONTENT",
        importedRepository: { ...repo, shaFileContentMap: map }
      };
    }
    // 导入成功和失败
    case IMPORT_REPOSITORY_SUCCESS:
      return {
        ...state,
        importDone: true,
        importStarted: false
      };
    case IMPORT_REPOSITORY_FAILURE:
      return {
        ...state,
        importProccess: undefined,
        error: true
      };
    // 停止导入
    case STOP_IMPORT:
      return {
        ...state,
        stop: true
      };
    // 把仓库信息存储到数据库中
    case SEND_IMPORTED_REPOSITORY:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SEND_IMPORTED_REPOSITORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case SEND_IMPORTED_REPOSITORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as ISendImportedRepositoryFailureAction).meta
      };
    default:
      return {
        ...state
      };
  }
};