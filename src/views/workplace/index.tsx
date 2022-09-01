// 已重构
// 工作台
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import WorkPlace, { IDispatchProps, IOwnProps, IStateProps } from "./workplace";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = () => {
  return {

  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = () => {
  return {

  };
};

export const ConnectedWorkPlaceView = connect(mapStateToProps, mapDispatchToProps)(WorkPlace);