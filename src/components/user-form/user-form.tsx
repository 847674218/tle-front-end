// 已重构
// 创建用户表单
import React from "react";
import { useSelector } from "react-redux";
import { Button, Card, Form, Input, Select } from "antd";
import { RootState } from "../../store/reducers";
import { IUser } from "../../types";
import { isPasswordValid } from "../../utils/password";

export interface IUserFormProps {
    onDone: (userInfo: Omit<IUser, "_id">) => void;
}

export const UserForm: React.FunctionComponent<IUserFormProps> = React.memo((props: IUserFormProps) => {
    const { onDone } = props;
    const githubId = useSelector<RootState, string>(state => state.authReducer.ghProfile?.login || "unknown");
    const [form] = Form.useForm();
    const { Option } = Select;

    return (
        <Card>
            <Form
                onFinish={value => {
                    const userInfo: Omit<IUser, "_id"> = {
                        userName: value.userName,
                        email: value.email,
                        password: value.password,
                        organization: value.organization,
                        role: "user",
                        program: value.program,
                        githubId: githubId,
                        createAt: Date.now(),
                        lastUpdateAt: Date.now(),
                    };
                    onDone(userInfo);
                    form.resetFields();
                }}
                form={form}
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 14 }}
            >
                <Form.Item
                    name="userName"
                    label="姓名"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        { required: true },
                        { type: "email", message: "邮箱格式不正确！请输入正确格式的邮箱！" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="初始密码"
                    rules={[
                        { required: true },
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="organization"
                    label="组织"
                    rules={[{ required: true }]}
                    initialValue="suppliers"
                >
                    <Select>
                        <Option value="suppliers">suppliers</Option>
                        <Option value="clients">clients</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="program"
                    label="项目"
                    rules={[{ required: true }]}
                    initialValue="IRTool"
                >
                    <Select>
                        <Option value="IRTool">IRTool</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    wrapperCol={{ offset: 5, span: 14 }}
                >
                    <Button type="primary" htmlType="submit" block>创建开发人员账号</Button>
                </Form.Item>
            </Form>
        </Card>
    );
});

export default UserForm;