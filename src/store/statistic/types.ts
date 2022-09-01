// 已重构
/**
 *  ----------统计数据相关操作----------
 *  需求的统计：每个需求对应的类的个数
 *  类的统计：每个类对应的需求的个数
 *  请求统计图中需求的数量
 *  请求统计图中跟踪链接的数量
 */
import { IStatistic } from "./../../types/index";

// 需求的统计：每个需求对应的类的个数
export const FETCH_FILE_STATISTIC = "FETCH_FILE_STATISTIC";
export const FETCH_FILE_STATISTIC_SUCCESS = "FETCH_FILE_STATISTIC_SUCCESS";
export const FETCH_FILE_STATISTIC_FAILURE = "FETCH_FILE_STATISTIC_FAILURE";

// 类的统计：每个类对应的需求的个数
export const FETCH_REQUIREMENT_STATISTIC = "FETCH_REQUIREMENT_STATISTIC";
export const FETCH_REQUIREMENT_STATISTIC_SUCCESS = "FETCH_REQUIREMENT_STATISTIC_SUCCESS";
export const FETCH_REQUIREMENT_STATISTIC_FAILURE = "FETCH_REQUIREMENT_STATISTIC_FAILURE";

// 请求统计图中需求的数量
export const FETCH_REQUIREMENT_NUMBER_STATISTIC = "FETCH_REQUIREMENT_NUMBER_STATISTIC";
export const FETCH_REQUIREMENT_NUMBER_STATISTIC_SUCCESS = "FETCH_REQUIREMENT_NUMBER_STATISTIC_SUCCESS";
export const FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE = "FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE";

// 请求统计图中跟踪链接的数量
export const FETCH_TRACELINK_NUMBER_STATISTIC = "FETCH_TRACELINK_NUMBER_STATISTIC";
export const FETCH_TRACELINK_NUMBER_STATISTIC_SUCCESS = "FETCH_TRACELINK_NUMBER_STATISTIC_SUCCESS";
export const FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE = "FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE";

export interface IStatisticState {
  loading: boolean;
  requirementStatistic: IStatistic[];
  fileStatistics: IStatistic[];
  requirementNumber: number[];  // 统计图中需求数量的增长
  traceLinkNumber: number[];  // 统计图中跟踪链接数量的增长
  error: boolean | string;
}

// 需求的统计：每个需求对应的类的个数
export interface IFetchRequirementStatisticAction {
  type: typeof FETCH_REQUIREMENT_STATISTIC;
}

export interface IFetchRequirementStatisticSuccessAction {
  type: typeof FETCH_REQUIREMENT_STATISTIC_SUCCESS;
  payload: IStatistic[];
}

export interface IFetchRequirementStatisticFailureAction {
  type: typeof FETCH_REQUIREMENT_STATISTIC_FAILURE;
}

// 类的统计：每个类对应的需求的个数
export interface IFetchFileStatisticAction {
  type: typeof FETCH_FILE_STATISTIC;
}

export interface IFetchFileStatisticSuccessAction {
  type: typeof FETCH_FILE_STATISTIC_SUCCESS;
  payload: IStatistic[];
}

export interface IFetchFileStatisticFailureAction {
  type: typeof FETCH_FILE_STATISTIC_FAILURE;
}

// 请求统计图中需求的数量
export interface IFetchRequirementNumberStatisticAction {
  type: typeof FETCH_REQUIREMENT_NUMBER_STATISTIC;
}

export interface IFetchRequirementNumberStatisticSuccessAction {
  type: typeof FETCH_REQUIREMENT_NUMBER_STATISTIC_SUCCESS;
  payload: number[];
}

export interface IFetchRequirementNumberStatisticFailureAction {
  type: typeof FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE;
}

// 请求统计图中跟踪链接的数量
export interface IFetchTraceLinkNumberStatisticAction {
  type: typeof FETCH_TRACELINK_NUMBER_STATISTIC;
}

export interface IFetchTraceLinkNumberStatisticSuccessAction {
  type: typeof FETCH_TRACELINK_NUMBER_STATISTIC_SUCCESS;
  payload: number[];
}

export interface IFetchTraceLinkNumberStatisticFailureAction {
  type: typeof FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE;
}

export type StatisticActions =
  | IFetchRequirementStatisticAction
  | IFetchRequirementStatisticSuccessAction
  | IFetchRequirementStatisticFailureAction
  | IFetchFileStatisticAction
  | IFetchFileStatisticSuccessAction
  | IFetchFileStatisticFailureAction
  | IFetchRequirementNumberStatisticAction
  | IFetchRequirementNumberStatisticSuccessAction
  | IFetchRequirementNumberStatisticFailureAction
  | IFetchTraceLinkNumberStatisticAction
  | IFetchTraceLinkNumberStatisticSuccessAction
  | IFetchTraceLinkNumberStatisticFailureAction;

export type StatisticActionTypes =
  | typeof FETCH_REQUIREMENT_STATISTIC
  | typeof FETCH_REQUIREMENT_STATISTIC_SUCCESS
  | typeof FETCH_REQUIREMENT_STATISTIC_FAILURE
  | typeof FETCH_FILE_STATISTIC
  | typeof FETCH_FILE_STATISTIC_SUCCESS
  | typeof FETCH_FILE_STATISTIC_FAILURE
  | typeof FETCH_REQUIREMENT_NUMBER_STATISTIC
  | typeof FETCH_REQUIREMENT_NUMBER_STATISTIC_SUCCESS
  | typeof FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE
  | typeof FETCH_TRACELINK_NUMBER_STATISTIC
  | typeof FETCH_TRACELINK_NUMBER_STATISTIC_SUCCESS
  | typeof FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE;