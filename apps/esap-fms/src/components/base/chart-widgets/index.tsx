import BrushBarChart from "@/components/base/chart-widgets/brush-bar-chart"
import CustomShapeBarChart from "@/components/base/chart-widgets/custom-shape-bar-chart"
import CustomizedDotLineChart from "@/components/base/chart-widgets/customized-dot-line-chart"
import CustomizedMixChart from "@/components/base/chart-widgets/customized-mix-chart"
import MixBarChart from "@/components/base/chart-widgets/mix-bar-chart"
import RadialBarChart from "@/components/base/chart-widgets/radial-bar-chart"
import SimpleAreaChart from "@/components/base/chart-widgets/simple-area-chart"
import SimpleBarChart from "@/components/base/chart-widgets/simple-bar-chart"
import SimpleLineChart from "@/components/base/chart-widgets/simple-line-chart"
import SimpleRadarChart from "@/components/base/chart-widgets/simple-radar-chart"
import StackedAreaChart from "@/components/base/chart-widgets/stacked-area-chart"

export default function ChartWidgets() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:gap-8">
      <SimpleLineChart />
      <CustomizedDotLineChart />
      <SimpleBarChart />
      <MixBarChart />
      <CustomShapeBarChart />
      <BrushBarChart />
      <SimpleAreaChart />
      <StackedAreaChart />
      <SimpleRadarChart />
      <RadialBarChart />
      <CustomizedMixChart className="lg:col-span-2" />
    </div>
  )
}
