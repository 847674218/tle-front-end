// 已重构
// 类的统计：每个类对应的需求的个数
import React, { FC, memo } from "react";
import { Spin } from "antd";
import { Axis, Chart, Geom, Tooltip } from "bizcharts";
import { IStatistic } from "../../types";
import { ChartTitle } from "./chart-title";

export interface IOwnProps {
  loading: boolean;
  fileStatistics: IStatistic[];
}

export interface IImplementStatisticBarChartProps extends IOwnProps { }

const cols = { sales: { tickInterval: 20 } };

export const ImplementStatisticBarChart: FC<IImplementStatisticBarChartProps> = memo((props: IImplementStatisticBarChartProps) => {
  const { loading, fileStatistics } = props;

  const data = fileStatistics.sort((a, b) => b.value - a.value);

  return (
    <Spin spinning={loading}>
      <Chart
        height={400}
        data={data}
        scale={cols}
        forceFit
      >
        <ChartTitle text={"每个源码文件对应的需求数量"} />
        <Axis
          name="label"
          label={{ rotate: 75 } as any}
        />
        <Axis name="value" />
        <Tooltip />
        <Geom
          type="interval"
          position="label*value"
        />
      </Chart>
    </Spin>
  );
});