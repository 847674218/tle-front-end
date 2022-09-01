// 已重构
// 主页面
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import Home, { IStateProps, IDispatchProps, IOwnProps } from "./home";
import { Dispatch } from "redux";
import { toggleAuthModal } from "../../store/auth/actions";
import { AuthActions } from "../../store/auth/types";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {
    authModalVisible: state.authReducer.authModalVisible
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: Dispatch<AuthActions>
) => {
  return {
    toggle: () => dispatch(toggleAuthModal())
  };
};

export const ConnectedHomeView = connect(mapStateToProps, mapDispatchToProps)(Home);