// 已重构
// 需求的统计：每个需求对应的类的个数
import React, { FC, memo } from "react";
import { Spin } from "antd";
import { Axis, Chart, Geom, Tooltip } from "bizcharts";
import { IStatistic } from "../../types";
import { ChartTitle } from "./chart-title";

export interface IOwnProps {
  loading: boolean;
  requirementStatistic: IStatistic[];
}

export interface IRequirementStatisticBarChartProps extends IOwnProps { }

const cols = { sales: { tickInterval: 20 } };

export const RequirementStatisticBarChart: FC<IRequirementStatisticBarChartProps> = memo((props: IRequirementStatisticBarChartProps) => {
  const { loading, requirementStatistic } = props;

  // 柱状图从高到低排序
  const data = requirementStatistic.sort((a, b) => b.value - a.value);

  return (
    <Spin spinning={loading}>
      <Chart
        height={400}
        data={data}
        scale={cols}
        forceFit
      >
        <ChartTitle text={"每个需求对应的源码文件数量"} />
        <Axis name="label" />
        <Axis name="value" />
        <Tooltip />
        <Geom type="interval" position="label*value" />
      </Chart>
    </Spin>
  );
});