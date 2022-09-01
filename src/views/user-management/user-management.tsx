// 已重构
// 用户管理页面
import React, { FunctionComponent, memo, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PageHeader, Col, Row } from "antd";
import { createUseStyles } from "react-jss";
import { RouteConstants } from "../../routes/constants";
import { IUser } from "../../types";
import Table, { ColumnsType } from "antd/lib/table";
import { UserForm } from "../../components/user-form";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/agate";

export interface IStateProps {
    userInfo: IUser[];
}

export interface IDispatchProps {
    fetchAllUserInfo: () => void;
    addUser: (newUser: Omit<IUser, "_id">) => void
}

export interface IOwnProps extends RouteComponentProps { }

export interface IUserManagementProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
    userManagementViewContainer: {
        width: "100%"
    },
    table: {
        width: "100%",
    }
});

const UserManagement: FunctionComponent<IUserManagementProps> = memo((props: IUserManagementProps) => {
    const { userInfo, fetchAllUserInfo, addUser } = props;
    const styles = useStyles();
    const routes = [
        {
            path: "/",
            breadcrumbName: "首页"
        },
        {
            path: RouteConstants.USERMANAGEMENT,
            breadcrumbName: "人员组织"
        }
    ];

    const columns: ColumnsType<IUser> = React.useMemo(() => {
        return [
            {
                title: "项目",
                dataIndex: "program",
                key: "program",
            },
            {
                title: "组织",
                dataIndex: "organization",
                key: "organization",
            },
            {
                title: "姓名",
                dataIndex: "userName",
                key: "userName",
            },
            {
                title: "邮箱",
                dataIndex: "email",
                key: "email",
            }
        ];
    }, []);

    // 挂载完成请求所有用户信息
    useEffect(() => {
        const doFetch = async () => {
            try {
                fetchAllUserInfo();
            } catch (e) {
                if (process.env.NODE_ENV !== "production") {
                    console.log(e);
                }
            }
        };
        doFetch();
    }, [fetchAllUserInfo]);

    return (
        <div className={styles.userManagementViewContainer}>
            <PageHeader
                breadcrumb={{ routes }}
                ghost={false}
                title={"人员组织"}
            >
                <Row gutter={[16, 16]}>
                    <Col md={{ span: 12 }} sm={{ span: 24 }}>
                        <UserForm
                            onDone={(userInfo) =>
                                addUser(userInfo)
                            }
                        />
                    </Col>
                    <Col md={{ span: 12 }} sm={{ span: 24 }}>
                        <Table
                            rowKey={"_id"}
                            dataSource={userInfo}
                            columns={columns}
                            rowClassName={style.rowClassName}
                        />
                    </Col>
                </Row>


            </PageHeader>
        </div>
    );
});

export default UserManagement;