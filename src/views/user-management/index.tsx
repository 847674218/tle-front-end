// 已重构
// 主页面
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { addUser, fetchAllUserInfo } from "../../store/auth/actions";
import { AuthActions } from "../../store/auth/types";
import { RootState } from "../../store/reducers";
import { IUser } from "../../types";
import UserManagement, { IStateProps, IDispatchProps, IOwnProps } from "./user-management";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
    return {
        userInfo: state.authReducer.user,
    };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
    dispath: ThunkDispatch<RootState, any, AuthActions>
) => {
    return {
        fetchAllUserInfo: () => dispath(fetchAllUserInfo()),
        addUser: (newUser: Omit<IUser, "_id">) => dispath(addUser(newUser))
    };
};

export const ConnectedUserManagementView = connect(mapStateToProps, mapDispatchToProps)(UserManagement);