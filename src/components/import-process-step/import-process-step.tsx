// 已重构
// 导入步骤进度条动态展示
import React, { FC, memo } from "react";
import { Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export interface IImportProcessStepProps {
  currentStep: number;
  done: boolean;
}

const ImportProcessStep: FC<IImportProcessStepProps> = memo((props: IImportProcessStepProps) => {
  const { currentStep, done } = props;

  // currentStep为0的时候意味着branch正在导入
  // currentStep为1的时候意味着branch导入完成,正在导入commit
  return (
    <Steps current={done ? 4 : currentStep}>
      <Steps.Step
        title={"分支"}
        icon={currentStep === 0 && !done ? <LoadingOutlined /> : null}
      />
      <Steps.Step
        title={"提交"}
        icon={currentStep === 1 && !done ? <LoadingOutlined /> : null}
      />
      <Steps.Step
        title={"文件结构"}
        icon={currentStep === 2 && !done ? <LoadingOutlined /> : null}
      />
      <Steps.Step
        title={"文件内容"}
        icon={currentStep === 3 && !done ? <LoadingOutlined /> : null}
      />
    </Steps>
  );
});

export default ImportProcessStep;