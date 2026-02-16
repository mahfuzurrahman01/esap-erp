import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const FMSDocInitialNodes: AppNode[] = [
    {
        id: "accounting",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Accounting" },
        sourcePosition: Position.Right,
    },
    {
        id: "budget_management",
        position: { x: 300, y: 0 },
        data: { label: "Budget Management" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "asset_management",
        position: { x: 600, y: -50 },
        data: { label: "Asset Management" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "banking",
        position: { x: 900, y: 0 },
        data: { label: "Banking" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "payments",
        position: { x: 300, y: 100 },
        data: { label: "Payments" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "currency",
        position: { x: 600, y: 100 },
        data: { label: "Currency" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "tax",
        position: { x: 900, y: 100 },
        data: { label: "Tax" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "compliance",
        position: { x: 1200, y: 50 },
        data: { label: "Compliance" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "financial_reporting",
        position: { x: 1500, y: 50 },
        data: { label: "Financial Reporting" },
        targetPosition: Position.Left,
    },
]; 