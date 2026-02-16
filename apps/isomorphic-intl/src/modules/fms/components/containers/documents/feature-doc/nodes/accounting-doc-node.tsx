import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const AccountingDocInitialNodes: AppNode[] = [
    {
        id: "foundational_setup",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Foundational Setup" },
        sourcePosition: Position.Right,
    },
    {
        id: "country",
        position: { x: 300, y: -50 },
        data: { label: "Define Country" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "company",
        position: { x: 300, y: 50 },
        data: { label: "Register Company" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "currency",
        position: { x: 300, y: 150 },
        data: { label: "Set up Currency" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "accounting_types",
        position: { x: 600, y: 0 },
        data: { label: "Configure Accounting Types" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "chart_of_accounts",
        position: { x: 600, y: 100 },
        data: { label: "Create Chart of Accounts" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "journal_templates",
        position: { x: 900, y: 0 },
        data: { label: "Create Journal Templates" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "journal_entries",
        position: { x: 900, y: 100 },
        data: { label: "Post Journal Entries" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "general_ledger",
        position: { x: 1200, y: 50 },
        data: { label: "Generate General Ledger Reports" },
        targetPosition: Position.Left,
    },
]; 