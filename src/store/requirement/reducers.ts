// 已重构
/**
 *  ----------需求相关操作----------
 *  把需求存储在数据库中
 *  请求仓库对应的需求
 *  改变添加需求模态框的显示状态
 *  添加单条需求规约
 *  删除单条需求规约
 */
import {
  POST_REQUIREMENT,
  POST_REQUIREMENT_SUCCESS,
  POST_REQUIREMENT_FAILURE,
  FETCH_REPO_REQUIREMENT,
  FETCH_REPO_REQUIREMENT_SUCCESS,
  FETCH_REPO_REQUIREMENT_FAILURE,
  TOGGLE_ADD_REQUIREMENT_MODAL,
  ADD_REQUIREMENT,
  ADD_REQUIREMENT_FAILURE,
  ADD_REQUIREMENT_SUCCESS,
  DELETE_REQUIREMENT,
  DELETE_REQUIREMENT_SUCCESS,
  DELETE_REQUIREMENT_FAILURE,
  IRequirementState,
  RequirementActions,
  IAddRequirementSuccessAction,
  IDeleteRequirementSuccessAction,
  IPostRequirementFailureAction,

} from "./types";

const initialState: IRequirementState = {
  loading: false,
  addRequirementLoading: false,
  deleteRequirementLoading: false,
  addRequirementModalVisible: false,
};

export const requirementReducer = (
  state = initialState,
  action: RequirementActions
): IRequirementState => {
  switch (action.type) {
    // 把需求存储在数据仓库中
    case POST_REQUIREMENT:
      return {
        ...state,
        loading: true,
        error: false
      };
    case POST_REQUIREMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case POST_REQUIREMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as IPostRequirementFailureAction).meta
      };
    // 请求仓库对应的需求列表
    case FETCH_REPO_REQUIREMENT:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_REPO_REQUIREMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        requirement: action.payload,
        error: false
      };
    case FETCH_REPO_REQUIREMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // 改变添加需求模态框的显示状态
    case TOGGLE_ADD_REQUIREMENT_MODAL:
      return {
        ...state,
        addRequirementModalVisible: !state.addRequirementModalVisible
      };
    // 添加单条需求规约
    case ADD_REQUIREMENT:
      return {
        ...state,
        addRequirementLoading: true
      };
    case ADD_REQUIREMENT_SUCCESS:
      return {
        ...state,
        addRequirementLoading: false,
        requirement: state.requirement
          ? {
            ...(action as IAddRequirementSuccessAction).payload
          }
          : undefined
      };
    case ADD_REQUIREMENT_FAILURE:
      return {
        ...state,
        addRequirementLoading: false
      };
    // 删除单条需求规约
    case DELETE_REQUIREMENT:
      return {
        ...state,
        deleteRequirementLoading: true,
        error: false
      };
    case DELETE_REQUIREMENT_SUCCESS:
      return {
        ...state,
        deleteRequirementLoading: false,
        requirement: state.requirement
          ? {
            ...(action as IDeleteRequirementSuccessAction).payload
          }
          : undefined
      };
    case DELETE_REQUIREMENT_FAILURE:
      return {
        ...state,
        deleteRequirementLoading: false,
        error: true,
      };
    default:
      return {
        ...state
      };
  }
};