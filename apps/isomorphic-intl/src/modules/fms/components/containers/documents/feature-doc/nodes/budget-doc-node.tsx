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
        id: "fiscal_year",
        position: { x: 300, y: 0 },
        data: { label: "Define Fiscal Year" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "company",
        position: { x: 300, y: 100 },
        data: { label: "Select Company" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "cost_center",
        position: { x: 600, y: 50 },
        data: { label: "Configure Cost Centers" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "budget_against",
        position: { x: 900, y: 50 },
        data: { label: "Assign Budget Against" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "budget_allocation",
        position: { x: 1200, y: 0 },
        data: { label: "Budget Distribution" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "budget_details",
        position: { x: 1200, y: 100 },
        data: { label: "Budget Distribution Details" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "budget_records",
        position: { x: 1500, y: 50 },
        data: { label: "Maintain Budget Records" },
        targetPosition: Position.Left,
    },
]; 