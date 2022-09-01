// 已重构
/**
 *  ----------跟踪链接相关操作----------
 *  将跟踪链接存储在数据库中
 *  请求文件对应的跟踪链接（仓库名称、提交SHA、文件名）
 *  请求需求对应的跟踪链接
 *  添加一条新的跟踪链接
 *  请求需要投票的跟踪链接
 *  请求仓库对应的跟踪链接
 *  更新投票结果
 */
import { ITraceLink } from "./../../types/index";

// 将跟踪链接存储在数据库中
export const SEND_INIT_TRACE_LINK = "SEND_INIT_TRACE_LINK";
export const SEND_INIT_TRACE_LINK_SUCCESS = "SEND_INIT_TRACE_LINK_SUCCESS";
export const SEND_INIT_TRACE_LINK_FAILURE = "SEND_INIT_TRACE_LINK_FAILURE";

// 请求文件对应的跟踪链接
export const FETCH_FILE_RELATED_TRACE_LINK = "FETCH_FILE_RELATED_TRACE_LINK";
export const FETCH_FILE_RELATED_TRACE_LINK_SUCCESS = "FETCH_FILE_RELATED_TRACE_LINK_SUCCESS";
export const FETCH_FILE_RELATED_TRACE_LINK_FAILURE = "FETCH_FILE_RELATED_TRACE_LINK_FAILURE";

// 请求需求对应的跟踪链接
export const FETCH_DESCRIPTION_RELATED_TRACE_LINK = "FETCH_DESCRIPTION_RELATED_TRACE_LINK";
export const FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS = "FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS";
export const FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE = "FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE";

// 添加一条新的跟踪链接
export const ADD_TRACE_LINK = "ADD_TRACE_LINK";
export const ADD_TRACE_LINK_SUCCESS = "ADD_TRACE_LINK_SUCCESS";
export const ADD_TRACE_LINK_FAILURE = "ADD_TRACE_LINK_FAILURE";

// 请求需要投票的跟踪链接
export const FETCH_NEED_VOTE_TRACE_LINK = "FETCH_NEED_VOTE_TRACE_LINK";
export const FETCH_NEED_VOTE_TRACE_LINK_SUCCESS = "FETCH_NEED_VOTE_TRACE_LINK_SUCCESS";
export const FETCH_NEED_VOTE_TRACE_LINK_FAILURE = "FETCH_NEED_VOTE_TRACE_LINK_FAILURE";

// 请求仓库对应的跟踪链接
export const FETCH_REPO_TRACE_LINK = "FETCH_REPO_TRACE_LINK";
export const FETCH_REPO_TRACE_LINK_SUCCESS = "FETCH_REPO_TRACE_LINK_SUCCESS";
export const FETCH_REPO_TRACE_LINK_FAILURE = "FETCH_REPO_TRACE_LINK_FAILURE";

// 更新投票结果
export const UPDATE_VOTE_RESULT = "UPDATE_VOTE_RESULT";
export const UPDATE_VOTE_RESULT_SUCCESS = "UPDATE_VOTE_RESULT_SUCCESS";
export const UPDATE_VOTE_RESULT_FAILURE = "UPDATE_VOTE_RESULT_FAILURE";

// 跟踪链接state
export interface ITraceLinkState {
  loading: boolean;
  sendNewTraceLinkLoading: boolean;
  deleteTraceLinkLoading: boolean;
  fileRelatedTraceLinks: ITraceLink[]; // 跟某个文件相关的跟踪链接
  requirementRelatedTraceLinks: ITraceLink[]; // 跟某个需求相关的跟踪链接
  needVoteTraceLinks: ITraceLink[];
  traceLinks: ITraceLink[];
  error?: boolean | any;
}

// 将跟踪链接存储在数据库中
export interface ISendInitTraceLinkAction {
  type: typeof SEND_INIT_TRACE_LINK;
}

export interface ISendInitTraceLinkSuccessAction {
  type: typeof SEND_INIT_TRACE_LINK_SUCCESS;
}

export interface ISendInitTraceLinkFailureAction {
  type: typeof SEND_INIT_TRACE_LINK_FAILURE;
  meta?: string;
}

// 请求文件对应的跟踪链接
export interface IFetchFileRelatedTraceLinkAction {
  type: typeof FETCH_FILE_RELATED_TRACE_LINK;
}

export interface IFetchFileRelatedTraceLinkSuccessAction {
  type: typeof FETCH_FILE_RELATED_TRACE_LINK_SUCCESS;
  payload: ITraceLink[];
}

export interface IFetchFileRelatedTraceLinkFailureAction {
  type: typeof FETCH_FILE_RELATED_TRACE_LINK_FAILURE;
}

// 请求需求对应的跟踪链接
export interface IFetchDescriptionRelatedTraceLinkAction {
  type: typeof FETCH_DESCRIPTION_RELATED_TRACE_LINK;
}

export interface IFetchDescriptionRelatedTraceLinkSuccessAction {
  type: typeof FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS;
  payload: ITraceLink[];
}

export interface IFetchDescriptionRelatedTraceLinkFailureAction {
  type: typeof FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE;
}

// 添加一条新的跟踪链接
export interface IAddTraceLinkAction {
  type: typeof ADD_TRACE_LINK;
}

export interface IAddTraceLinkSuccessAction {
  type: typeof ADD_TRACE_LINK_SUCCESS;
}

export interface IAddTraceLinkFailureAction {
  type: typeof ADD_TRACE_LINK_FAILURE;
}

// 请求需要投票的跟踪链接
export interface IFetchNeedVoteTraceLinkAction {
  type: typeof FETCH_NEED_VOTE_TRACE_LINK;
}

export interface IFetchNeedVoteTraceLinkSuccessAction {
  type: typeof FETCH_NEED_VOTE_TRACE_LINK_SUCCESS;
  payload: ITraceLink[];
}

export interface IFetchNeedVoteTraceLinkFailureAction {
  type: typeof FETCH_NEED_VOTE_TRACE_LINK_FAILURE;
}

// 请求仓库对应的跟踪链接
export interface IFetchRepoTraceLinkAction {
  type: typeof FETCH_REPO_TRACE_LINK;
}

export interface IFetchRepoTraceLinkSuccessAction {
  type: typeof FETCH_REPO_TRACE_LINK_SUCCESS;
  payload: ITraceLink[];
}

export interface IFetchRepoTraceLinkFailureAction {
  type: typeof FETCH_REPO_TRACE_LINK_FAILURE;
}

// 更新投票结果
export interface IUpateVoteResultAction {
  type: typeof UPDATE_VOTE_RESULT;
}

export interface IUpateVoteResultSuccessAction {
  type: typeof UPDATE_VOTE_RESULT_SUCCESS;
  payload: {
    traceLinkId: string;
    newTraceLink: ITraceLink;
  }
}

export interface IUpateVoteResultFailureAction {
  type: typeof UPDATE_VOTE_RESULT_FAILURE;
}

export type TraceLinkActions =
  | ISendInitTraceLinkAction
  | ISendInitTraceLinkSuccessAction
  | ISendInitTraceLinkFailureAction
  | IFetchFileRelatedTraceLinkAction
  | IFetchFileRelatedTraceLinkSuccessAction
  | IFetchFileRelatedTraceLinkFailureAction
  | IFetchDescriptionRelatedTraceLinkAction
  | IFetchDescriptionRelatedTraceLinkSuccessAction
  | IFetchDescriptionRelatedTraceLinkFailureAction
  | IAddTraceLinkAction
  | IAddTraceLinkSuccessAction
  | IAddTraceLinkFailureAction
  | IFetchNeedVoteTraceLinkAction
  | IFetchNeedVoteTraceLinkSuccessAction
  | IFetchNeedVoteTraceLinkFailureAction
  | IFetchRepoTraceLinkAction
  | IFetchRepoTraceLinkSuccessAction
  | IFetchRepoTraceLinkFailureAction
  | IUpateVoteResultAction
  | IUpateVoteResultSuccessAction
  | IUpateVoteResultFailureAction;

export type TraceLinkActionTypes =
  | typeof SEND_INIT_TRACE_LINK
  | typeof SEND_INIT_TRACE_LINK_SUCCESS
  | typeof SEND_INIT_TRACE_LINK_FAILURE
  | typeof FETCH_FILE_RELATED_TRACE_LINK
  | typeof FETCH_FILE_RELATED_TRACE_LINK_SUCCESS
  | typeof FETCH_FILE_RELATED_TRACE_LINK_FAILURE
  | typeof FETCH_DESCRIPTION_RELATED_TRACE_LINK
  | typeof FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS
  | typeof FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE
  | typeof ADD_TRACE_LINK
  | typeof ADD_TRACE_LINK_SUCCESS
  | typeof ADD_TRACE_LINK_FAILURE
  | typeof FETCH_NEED_VOTE_TRACE_LINK
  | typeof FETCH_NEED_VOTE_TRACE_LINK_SUCCESS
  | typeof FETCH_NEED_VOTE_TRACE_LINK_FAILURE
  | typeof FETCH_REPO_TRACE_LINK
  | typeof FETCH_REPO_TRACE_LINK_SUCCESS
  | typeof FETCH_REPO_TRACE_LINK_FAILURE
  | typeof UPDATE_VOTE_RESULT
  | typeof UPDATE_VOTE_RESULT_SUCCESS
  | typeof UPDATE_VOTE_RESULT_FAILURE