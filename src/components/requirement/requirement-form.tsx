// 已重构
// 需求表单(有输入框需要填写)
import React from "react";
import { useSelector } from "react-redux";
import { Button, Card, Form, Input, Radio } from "antd";
import { RootState } from "../../store/reducers";
import { IRequirementDescription } from "../../types";

export interface IRequirementFormProps {
  onDone: (desc: Omit<IRequirementDescription, "_id">) => void;
}

export const RequirementForm: React.FunctionComponent<IRequirementFormProps> = React.memo((props: IRequirementFormProps) => {
  const { onDone } = props;
  const githubId = useSelector<RootState, string>(state => state.authReducer.ghProfile?.login || "unknown");
  const [form] = Form.useForm();

  return (
    <Card>
      <Form
        onFinish={value => {
          const description: Omit<IRequirementDescription, "_id"> = {
            name: value.name,
            description: value.description,
            priority: value.priority,
            participants: value.participants,
            triggeringCondition: value.triggeringCondition,
            preCondition: value.preCondition,
            postCondition: value.postCondition,
            normalProcess: value.normalProcess,
            expansionProcess: value.expansionProcess,
            specialNeeds: value.specialNeeds,
            createBy: githubId,
            createAt: Date.now(),
            lastUpdateBy: githubId,
            lastUpdateAt: Date.now(),
          };
          onDone(description);
          form.resetFields();
        }}
        form={form}
        name="basic"
        initialValues={{ priority: "low" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="需求描述"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="priority"
          label="优先级"
          rules={[{ required: true }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="low">低</Radio.Button>
            <Radio.Button value="medium">中</Radio.Button>
            <Radio.Button value="high">高</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="participants"
          label="参与者"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"triggeringCondition"}
          label={"触发条件"}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"preCondition"}
          label={"前置条件"}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"postCondition"}
          label={"后置条件"}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"normalProcess"}
          label={"正常流程"}
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item
          name={"expansionProcess"}
          label={"扩展流程"}
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item
          name={"specialNeeds"}
          label={"特別需求"}
        >
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 5, span: 14 }}
        >
          <Button type="primary" htmlType="submit" block> 提交</Button>
        </Form.Item>
      </Form>
    </Card>
  );
});