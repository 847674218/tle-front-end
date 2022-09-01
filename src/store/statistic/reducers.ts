// 已重构
/**
 *  ----------统计数据相关操作----------
 *  需求的统计：每个需求对应的类的个数
 *  类的统计：每个类对应的需求的个数
 *  请求统计图中需求的数量
 *  请求统计图中跟踪链接的数量
 */
import {
  FETCH_REQUIREMENT_STATISTIC,
  FETCH_REQUIREMENT_STATISTIC_SUCCESS,
  FETCH_REQUIREMENT_STATISTIC_FAILURE,
  FETCH_FILE_STATISTIC,
  FETCH_FILE_STATISTIC_SUCCESS,
  FETCH_FILE_STATISTIC_FAILURE,
  FETCH_REQUIREMENT_NUMBER_STATISTIC,
  FETCH_REQUIREMENT_NUMBER_STATISTIC_SUCCESS,
  FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE,
  FETCH_TRACELINK_NUMBER_STATISTIC,
  FETCH_TRACELINK_NUMBER_STATISTIC_SUCCESS,
  FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE,
  IStatisticState,
  StatisticActions,
  IFetchRequirementStatisticSuccessAction,
  IFetchFileStatisticSuccessAction,
  IFetchRequirementNumberStatisticSuccessAction,
  IFetchTraceLinkNumberStatisticSuccessAction,
} from "./types";

const initialState: IStatisticState = {
  loading: false,
  requirementStatistic: [],
  fileStatistics: [],
  requirementNumber: [],
  traceLinkNumber: [],
  error: false
};

export const statisticReducer = (
  state = initialState,
  action: StatisticActions
): IStatisticState => {
  switch (action.type) {
    // 需求的统计：每个需求对应的类的个数
    case FETCH_REQUIREMENT_STATISTIC:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_REQUIREMENT_STATISTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        requirementStatistic: (action as IFetchRequirementStatisticSuccessAction).payload
      };
    case FETCH_REQUIREMENT_STATISTIC_FAILURE:
      return {
        ...state,
        loading: false
      };
    // 类的统计：每个类对应的需求的个数
    case FETCH_FILE_STATISTIC:
      return {
        ...state,
        loading: true
      };
    case FETCH_FILE_STATISTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        fileStatistics: (action as IFetchFileStatisticSuccessAction).payload
      };
    case FETCH_FILE_STATISTIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: false
      };
    // 请求统计图中需求的数量
    case FETCH_REQUIREMENT_NUMBER_STATISTIC:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_REQUIREMENT_NUMBER_STATISTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        requirementNumber: (action as IFetchRequirementNumberStatisticSuccessAction).payload,
        error: false
      };
    case FETCH_REQUIREMENT_NUMBER_STATISTIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    // 请求统计图中跟踪链接的数量
    case FETCH_TRACELINK_NUMBER_STATISTIC:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_TRACELINK_NUMBER_STATISTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        traceLinkNumber: (action as IFetchTraceLinkNumberStatisticSuccessAction).payload,
        error: false
      };
    case FETCH_TRACELINK_NUMBER_STATISTIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return {
        ...state
      }
  }
};