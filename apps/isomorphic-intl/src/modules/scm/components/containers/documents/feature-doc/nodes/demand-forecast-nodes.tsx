import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const DemandForecastDocInitialNodes: AppNode[] = [
    {
        id: "demand_forecast",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Demand Forecast" },
        sourcePosition: Position.Right,
    },
    {
        id: "sales_operation_planning",
        position: { x: 300, y: 0 },
        data: { label: "Sales Operation Planning" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "sales_operation_planning_approval",
        position: { x: 600, y: -50 },
        data: { label: "Sales Operation Planning Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "requisition",
        position: { x: 900, y: 100 },
        data: { label: "Requisition" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "capacity_planning",
        position: { x: 0, y: 200 },
        data: { label: "Capacity Planning" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];