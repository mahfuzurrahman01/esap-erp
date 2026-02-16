import { Edge } from "@xyflow/react";

export const DemandForecastDocInitialEdges = [
    { id: "demand_forecast->sales_operation_planning", type: "demand-forecast-edge", source: "demand_forecast", target: "sales_operation_planning", animated: true },
    { id: "sales_operation_planning->sales_operation_planning_approval", type: "demand-forecast-edge", source: "sales_operation_planning", target: "sales_operation_planning_approval", animated: true },
    { id: "sales_operation_planning_approval->requisition", type: "demand-forecast-edge", source: "sales_operation_planning_approval", target: "requisition", animated: true },
    { id: "requisition->requisition_approval", type: "demand-forecast-edge", source: "requisition", target: "requisition_approval", animated: true },
] satisfies Edge[];