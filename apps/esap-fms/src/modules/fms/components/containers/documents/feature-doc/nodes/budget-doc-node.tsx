import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const BudgetDocInitialNodes: AppNode[] = [
    {
        id: "budget",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Budget" },
        sourcePosition: Position.Right,
    },
    {
        id: "monthly_distribution",
        position: { x: 300, y: 0 },
        data: { label: "Monthly Distribution" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "budget_against",
        position: { x: 600, y: 0 },
        data: { label: "Budget Against" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "cost_center",
        position: { x: 300, y: 100 },
        data: { label: "Cost Center" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "fiscal_year",
        position: { x: 600, y: 100 },
        data: { label: "Fiscal Year" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "budget_analysis",
        position: { x: 900, y: 50 },
        data: { label: "Budget Analysis" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "budget_forecasting",
        position: { x: 1200, y: 50 },
        data: { label: "Budget Forecasting" },
        targetPosition: Position.Left,
    },
]; 