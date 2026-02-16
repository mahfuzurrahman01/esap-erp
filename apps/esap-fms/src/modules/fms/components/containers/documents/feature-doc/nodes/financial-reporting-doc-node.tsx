import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const FinancialReportingDocInitialNodes: AppNode[] = [
    {
        id: "general_ledger",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "General Ledger" },
        sourcePosition: Position.Right,
    },
    {
        id: "trial_balance",
        position: { x: 300, y: 0 },
        data: { label: "Trial Balance" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "profit_loss",
        position: { x: 600, y: -50 },
        data: { label: "Profit and Loss" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "balance_sheet",
        position: { x: 600, y: 50 },
        data: { label: "Balance Sheet" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "cash_flow",
        position: { x: 900, y: -50 },
        data: { label: "Cash Flow Forecasting" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "budget_variance",
        position: { x: 900, y: 50 },
        data: { label: "Budget Variance" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "fixed_asset_register",
        position: { x: 300, y: 100 },
        data: { label: "Fixed Asset Register" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "asset_depreciation",
        position: { x: 600, y: 150 },
        data: { label: "Asset Depreciation" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "accounts_receivable",
        position: { x: 900, y: 150 },
        data: { label: "Accounts Receivable" },
        targetPosition: Position.Left,
    },
    {
        id: "accounts_payable",
        position: { x: 900, y: 250 },
        data: { label: "Accounts Payable" },
        targetPosition: Position.Left,
    }
]; 