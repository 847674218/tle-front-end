// 已重构
// 兑换access_token
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import AuthRedirect, { IDispatchProps, IStateProps, IOwnProps } from "./auth-redirect";
import { sendGitHubLogIn } from "../../store/auth/actions";
import { AuthActions } from "../../store/auth/types";
import { ThunkDispatch } from "redux-thunk";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (state: RootState) => {
  return {
    loggedIn: state.authReducer.loggedIn,
    error: !!state.authReducer.error
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, AuthActions>
) => {
  return {
    sendGitHubLogIn: code => dispatch(sendGitHubLogIn(code))
  };
};

export const AuthRedirectView = connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);