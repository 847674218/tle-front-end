// 已重构
/**
 *  ----------仓库导入过程----------
 *  开始导入仓库
 *  更新（写入）正在导入仓库的基础信息
 *  停止导入
 *  把仓库信息存储到数据库中
 */
import {
  START_IMPORT_REPOSITORY,
  UPDATE_IMPORTING_REPOSITORY,
  FINISH_CLONE_BRANCHES,
  FINISH_CLONE_COMMITS,
  FINISH_CLONE_FILE_STRUCTURE,
  FINISH_CLONE_FILE_CONTENT,
  IMPORT_REPOSITORY_SUCCESS,
  STOP_IMPORT,
  SEND_IMPORTED_REPOSITORY,
  SEND_IMPORTED_REPOSITORY_SUCCESS,
  SEND_IMPORTED_REPOSITORY_FAILURE,
  ImportRepositoryActionTypes,
  IStopImportAction,
  IUpdateImportingRepositoryAction,
} from "./types";
import { IBranch, ICommit, IFileTreeNode } from "../../types";
import { AppThunk } from "../store";
import { IGHRepositoryRes } from "./../../types/github-api/repository";
import { IImportedRepository, ShaFileContentMap } from "./../../types/index";
import io from "socket.io-client";
import { ProgramLanguage } from "../../utils/language-color";
import { getServerUrl, getGitHubServiceUrl } from "./../../configs/get-url";

// 开始导入仓库
export const startImportRepository = (
  importThis: IGHRepositoryRes
): AppThunk<void, ImportRepositoryActionTypes> => async (
  dispatch,
  getState
) => {
    const { authReducer: { gitHubAccessToken } } = getState();
    if (!gitHubAccessToken) throw new Error("no token");

    dispatch({ type: START_IMPORT_REPOSITORY });

    // 仓库基础信息
    let importedRepo: Partial<IImportedRepository> = {
      name: importThis.name,
      ownerId: importThis.owner.login,
      currentBranch: importThis.default_branch,
      language: importThis.language as ProgramLanguage,
      description: importThis.description,
      stakeholders: ["user1", "user2"]
    };

    // 更新（写入）正在导入仓库的基础信息
    dispatch(updateImportingRepository(importedRepo));

    // 发起连接请求
    const socket = io.connect(getGitHubServiceUrl());
    // 发送数据（配置信息和access_token）
    socket.emit("startImport", importThis, gitHubAccessToken);

    // 监听服务器端导入复制结果
    socket.on("importBranchDone", (branches: IBranch[]) => {
      console.log(branches);
      dispatch({
        type: FINISH_CLONE_BRANCHES,
        payload: { branches }
      });
    });

    socket.on("importCommitDone", (commits: ICommit[]) => {
      console.log(commits);
      dispatch({
        type: FINISH_CLONE_COMMITS,
        payload: { commits }
      });
    });

    socket.on("importFileStructureDone", (trees: IFileTreeNode[]) => {
      console.log(trees);
      dispatch({
        type: FINISH_CLONE_FILE_STRUCTURE,
        payload: { files: trees }
      });
    });

    socket.on("importFileContentDone", (shaFileContentMap: ShaFileContentMap) => {
      console.log(shaFileContentMap);
      dispatch({
        type: FINISH_CLONE_FILE_CONTENT,
        payload: { map: shaFileContentMap }
      });
    });

    // 全部导入结束后，dispatch导入成功
    socket.on("allDone", () => dispatch({ type: IMPORT_REPOSITORY_SUCCESS }));
  };

// 更新（写入）正在导入仓库的基础信息
export const updateImportingRepository = (
  repo: Partial<IImportedRepository>
): IUpdateImportingRepositoryAction => {
  return {
    type: UPDATE_IMPORTING_REPOSITORY,
    payload: repo
  };
};

// 停止导入
export const stopImport = (): IStopImportAction => ({ type: STOP_IMPORT });

// post 把仓库信息存储到数据库中 importedRepo -> 无返回
export const sendImportedRepository = (
  importedRepo: Omit<IImportedRepository, "_id">
): AppThunk<void, ImportRepositoryActionTypes> => async (
  dispatch,
  getState
) => {
    dispatch({ type: SEND_IMPORTED_REPOSITORY });
    try {
      const { authReducer: { token } } = getState();
      if (!token) throw new Error("no token");

      // 把已导入仓库的信息发送到后端
      const res = await fetch(`${getServerUrl()}/api/repository`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(importedRepo)
      }).then(res => res.json());

      if (res && res.success) {
        dispatch({ type: SEND_IMPORTED_REPOSITORY_SUCCESS });
      } else {
        dispatch({ type: SEND_IMPORTED_REPOSITORY_FAILURE, meta: res.meta });
      }
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.log(e);
      }
      dispatch({ type: SEND_IMPORTED_REPOSITORY_FAILURE });
    }
  };