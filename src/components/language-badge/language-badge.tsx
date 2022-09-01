// 已重构
// 编程语言颜色标记
import React, { FunctionComponent, memo } from "react";
import { Badge } from "antd";
import { ProgramLanguage, colorByLanguage } from "../../utils/language-color";

export interface IStateProps { }

export interface IDispatchProps { }

export interface IOwnProps {
  language: ProgramLanguage;
}

export interface ILanguageBadgeProps extends IStateProps, IDispatchProps, IOwnProps { }

const LanguageBadge: FunctionComponent<ILanguageBadgeProps> = memo((props: ILanguageBadgeProps) => {
  const { language } = props;

  return (
    <Badge
      color={colorByLanguage(language)}
      text={language ? language : "未知语言"}
    />
  );
}
);

export default LanguageBadge;