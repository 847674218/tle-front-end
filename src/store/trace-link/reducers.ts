// 已重构
/**
 *  ----------跟踪链接相关操作----------
 *  将跟踪链接存储在数据库中
 *  请求文件对应的跟踪链接（仓库名称、提交SHA、文件名）
 *  请求需求对应的跟踪链接
 *  添加一条新的跟踪链接
 *  请求需要投票的跟踪链接
 *  请求仓库对应的跟踪链接
 */
import {
  SEND_INIT_TRACE_LINK,
  SEND_INIT_TRACE_LINK_SUCCESS,
  SEND_INIT_TRACE_LINK_FAILURE,
  FETCH_FILE_RELATED_TRACE_LINK,
  FETCH_FILE_RELATED_TRACE_LINK_SUCCESS,
  FETCH_FILE_RELATED_TRACE_LINK_FAILURE,
  FETCH_DESCRIPTION_RELATED_TRACE_LINK,
  FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS,
  FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE,
  ADD_TRACE_LINK,
  ADD_TRACE_LINK_SUCCESS,
  ADD_TRACE_LINK_FAILURE,
  FETCH_NEED_VOTE_TRACE_LINK,
  FETCH_NEED_VOTE_TRACE_LINK_SUCCESS,
  FETCH_NEED_VOTE_TRACE_LINK_FAILURE,
  FETCH_REPO_TRACE_LINK,
  FETCH_REPO_TRACE_LINK_SUCCESS,
  FETCH_REPO_TRACE_LINK_FAILURE,
  UPDATE_VOTE_RESULT,
  UPDATE_VOTE_RESULT_SUCCESS,
  UPDATE_VOTE_RESULT_FAILURE,
  ITraceLinkState,
  TraceLinkActions,
  IFetchFileRelatedTraceLinkSuccessAction,
  IFetchDescriptionRelatedTraceLinkSuccessAction,
  ISendInitTraceLinkFailureAction,
  IFetchNeedVoteTraceLinkSuccessAction,
  IFetchRepoTraceLinkSuccessAction,
  IUpateVoteResultSuccessAction,
} from "./types";

const initialState: ITraceLinkState = {
  loading: false,
  sendNewTraceLinkLoading: false,
  deleteTraceLinkLoading: false,
  fileRelatedTraceLinks: [],
  requirementRelatedTraceLinks: [],
  needVoteTraceLinks: [],
  traceLinks: [],
  error: false
};

export const traceLinkReducer = (
  state = initialState,
  action: TraceLinkActions
): ITraceLinkState => {
  switch (action.type) {
    // 将跟踪链接存储在数据库中
    case SEND_INIT_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SEND_INIT_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case SEND_INIT_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as ISendInitTraceLinkFailureAction).meta
      };
    // 请求文件对应的跟踪链接
    case FETCH_FILE_RELATED_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_FILE_RELATED_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        fileRelatedTraceLinks: [
          ...(action as IFetchFileRelatedTraceLinkSuccessAction).payload
        ]
      };
    case FETCH_FILE_RELATED_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 请求需求对应的跟踪链接
    case FETCH_DESCRIPTION_RELATED_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        requirementRelatedTraceLinks: [
          ...(action as IFetchDescriptionRelatedTraceLinkSuccessAction).payload
        ]
      };
    case FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 添加一条新的跟踪链接
    case ADD_TRACE_LINK:
      return {
        ...state,
        sendNewTraceLinkLoading: true,
        error: false
      };
    case ADD_TRACE_LINK_SUCCESS:
      return {
        ...state,
        sendNewTraceLinkLoading: false,
        error: false
      }
    case ADD_TRACE_LINK_FAILURE:
      return {
        ...state,
        sendNewTraceLinkLoading: false,
        error: true
      };
    // 请求需要投票的跟踪链接
    case FETCH_NEED_VOTE_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_NEED_VOTE_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        needVoteTraceLinks: [
          ...(action as IFetchNeedVoteTraceLinkSuccessAction).payload
        ]
      };
    case FETCH_NEED_VOTE_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 请求仓库对应的跟踪链接
    case FETCH_REPO_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_REPO_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        traceLinks: [
          ...(action as IFetchRepoTraceLinkSuccessAction).payload
        ]
      };
    case FETCH_REPO_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 更新投票结果
    case UPDATE_VOTE_RESULT:
      return {
        ...state,
        loading: true,
        error: false
      };
    case UPDATE_VOTE_RESULT_SUCCESS: {
      const payload = (action as IUpateVoteResultSuccessAction).payload;
      if (payload.newTraceLink.state == "passConfirm" || payload.newTraceLink.state == "rejectDelete") {
        const newState = {
          ...state,
          loading: false,
          needVoteTraceLinks: [
            ...state.needVoteTraceLinks.filter(
              link => link._id.toString() != payload.traceLinkId
            )
          ],
          traceLinks: [
            payload.newTraceLink,
            ...state.traceLinks
          ]
        };
        return newState;
      } else {
        const newState = {
          ...state,
          loading: false,
          needVoteTraceLinks: [
            ...state.needVoteTraceLinks.filter(
              link => link._id.toString() != payload.traceLinkId
            )
          ]
        };
        return newState;
      }
    }
    case UPDATE_VOTE_RESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return {
        ...state
      };
  }
};