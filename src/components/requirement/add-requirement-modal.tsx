// 已重构
// 在需求管理页面点击+添加单条需求规约
import React, { FunctionComponent, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Spin } from "antd";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { toggleAddRequirementModal, addRequirement } from "../../store/requirement/actions";
import { RequirementActions } from "../../store/requirement/types";
import { IRequirementDescription } from "../../types";
import { RequirementForm } from "./requirement-form";

export interface IAddRequirementModalProps {
  requirementId: string;
}

export const AddRequirementModal: FunctionComponent<IAddRequirementModalProps> = memo((props: IAddRequirementModalProps) => {
  const { requirementId } = props;

  // 可视化和加载状态
  const visible = useSelector<RootState, boolean>(state => state.requirementReducer.addRequirementModalVisible);
  const loading = useSelector<RootState, boolean>(state => state.requirementReducer.addRequirementLoading);

  const dispatch = useDispatch<AppDispatch<RequirementActions>>();
  const onCancel = () => dispatch(toggleAddRequirementModal());
  const onDone = (description: Omit<IRequirementDescription, "_id">) => dispatch(addRequirement(requirementId, description));

  return (
    <Modal
      width={"80vw"}
      closable={false}
      maskClosable
      footer={null}
      onCancel={onCancel}
      visible={visible}
    >
      <Spin spinning={loading}>
        <RequirementForm
          onDone={onDone}
        />
      </Spin>
    </Modal>
  );
});