// 已重构
// 登录标签页展示
import React, { ChangeEvent, FunctionComponent, memo } from "react";
import { Button, Form, Input, Radio } from "antd";
import { createUseStyles } from "react-jss";
import { ILogInData } from "../../store/auth/types";

export interface ILogInFormProps {
  loading: boolean;
  onFinish: (data: ILogInData, role: number) => void;
  onFinishFailed: (error: any) => void;
}

const useStyles = createUseStyles({
  formItem: {
    margin: { bottom: "10px" }
  },
  otherLogInArea: {
    float: "right"
  }
});

const LogInForm: FunctionComponent<ILogInFormProps> = memo((props: ILogInFormProps) => {
  const styles = useStyles();
  const [form] = Form.useForm();
  const { loading } = props;

  // 防抖
  const debounce = (fn: any, wait: number) => {
    let timeout: any = null;
    return function (input: any) {
      input.persist();
      if (timeout !== null)
        clearTimeout(timeout);
      timeout = setTimeout(fn, wait, input);
    };
  };

  // 动态改变表单值
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    form.setFieldsValue({ email: e.target.value });

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    form.setFieldsValue({ password: e.target.value });

  // 提交表单且数据验证成功后回调事件：数据赋值
  const onFinish = (values: any) => {
    if (typeof props.onFinish === "function") {
      props.onFinish(
        {
          email: values.email,
          password: values.password,
          role: values.role
        },
        values.role
      );
      form.setFieldsValue({ email: null, password: null });
    }
  };

  // 提交表单且数据验证失败后回调事件：输入框置空并提示错误信息
  const onFinishFailed = (errorInfo: any) => {
    form.setFieldsValue({ email: null, password: null });
    if (typeof props.onFinishFailed === "function") {
      props.onFinishFailed(errorInfo);
    }
    if (process.env.NODE_ENV !== "production") {
      console.log(errorInfo);
    }
  };

  return (
    <Form
      name="logInForm"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name={"email"}
        label={"邮箱"}
        rules={[
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "邮箱格式不正确！请输入正确格式的邮箱！" }
        ]}
      >
        <Input
          placeholder={"请输入邮箱"}
          onChange={debounce(onEmailChange, 1000)}
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 10 }}
        name="password"
        label={"密码"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password
          placeholder={"请输入密码"}
          onChange={debounce(onPasswordChange, 1000)}
        />
      </Form.Item>
      <Form.Item
        className={styles.formItem}
        name="role"
        label={"角色"}
        initialValue={1}
      >
        <Radio.Group name="role">
          <Radio value={1}>开发人员</Radio>
          <Radio value={2}>项目负责人</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item className={styles.formItem}>
        <Button type="primary" htmlType="submit" block loading={loading}> {"登录"}</Button>
      </Form.Item>
    </Form >
  );
});

export default LogInForm;