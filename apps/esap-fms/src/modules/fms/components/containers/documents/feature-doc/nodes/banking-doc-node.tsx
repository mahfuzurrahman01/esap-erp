import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const BankingDocInitialNodes: AppNode[] = [
    {
        id: "bank",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Bank" },
        sourcePosition: Position.Right,
    },
    {
        id: "bank_account",
        position: { x: 300, y: 0 },
        data: { label: "Bank Account" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "bank_transactions",
        position: { x: 300, y: 100 },
        data: { label: "Bank Transactions" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "bank_statement",
        position: { x: 600, y: 0 },
        data: { label: "Bank Statement" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "bank_clearance",
        position: { x: 600, y: 100 },
        data: { label: "Bank Clearance" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "bank_reconciliation",
        position: { x: 900, y: 50 },
        data: { label: "Bank Reconciliation" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "reconciliation_report",
        position: { x: 1200, y: 50 },
        data: { label: "Reconciliation Report" },
        targetPosition: Position.Left,
    },
]; 