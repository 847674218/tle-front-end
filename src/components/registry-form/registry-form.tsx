// 已重构
// 注册标签页展示：需要按照提示（前端验证规则）输入正确的邮箱和密码，否则会注册失败
import React, { FunctionComponent, memo, ChangeEvent } from "react";
import { createUseStyles } from "react-jss";
import { Form, Input, Button } from "antd";
import { IRegistryData } from "../../store/auth/types";
import { isPasswordValid } from "../../utils/password";

export interface IRegistryFormProps {
  loading: boolean;
  onFinish: (data: IRegistryData) => void;
  onFinishFailed: (error: any) => void;
}

const useStyles = createUseStyles({
  formItem: {
    margin: { bottom: "10px" }
  }
});

const RegistryForm: FunctionComponent<IRegistryFormProps> = memo(
  (props: IRegistryFormProps) => {
    const { loading } = props;
    const styles = useStyles();
    const [form] = Form.useForm();

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

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
      form.setFieldsValue({ email: e.target.value });

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      form.setFieldsValue({ password: e.target.value });
    }

    const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
      form.setFieldsValue({ confirmPassword: e.target.value });

    const onFinish = (values: any) => {
      if (typeof props.onFinish === "function") {
        props.onFinish(
          {
            email: values.email,
            password: values.password,
            role: "admin"
          }
        );
        form.setFieldsValue({ email: null, password: null, confirmPassword: null });
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      form.setFieldsValue({ email: null, password: null, confirmPassword: null });
      if (typeof props.onFinishFailed === "function") {
        props.onFinishFailed(errorInfo);
        console.log(errorInfo);
      }
      if (process.env.NODE_ENV !== "production") {
        console.log(errorInfo);
      }
    };

    return (
      <Form
        name="registry from"
        form={form}
        // 提交表单且数据验证（前端验证规则）成功后回调事件
        onFinish={onFinish}
        // 提交表单且数据验证（前端验证规则）失败后回调事件
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
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
          name="password"
          label={"密码"}
          rules={[
            { required: true, message: "请输入密码" },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  if (!isPasswordValid(value) && value.length > 0) {
                    reject("密码需为8至16位, 包含数字、大写、小写、标点符号至少各一个");
                  }
                  else resolve(200);
                });
              }
            }
          ]}
        >
          <Input.Password
            placeholder={"请输入密码"}
            onChange={debounce(onPasswordChange, 1000)}
          />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name="confirmPassword"
          label={"确认密码"}
          rules={[
            { required: true, message: "请输入密码" },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  const password = form.getFieldValue("password");
                  if (password !== value) {
                    reject("两次输入密码不一致");
                  }
                  resolve(200);
                });
              }
            }
          ]}
        >
          <Input.Password
            placeholder={"请输入密码"}
            onChange={debounce(onConfirmPasswordChange, 1000)}
          />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" block>{"注册"}</Button>
        </Form.Item>
      </Form>
    );
  });

export default RegistryForm;