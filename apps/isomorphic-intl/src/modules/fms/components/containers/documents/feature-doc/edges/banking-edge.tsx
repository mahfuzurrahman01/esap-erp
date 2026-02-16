import { Edge } from "@xyflow/react";

export const BankingDocInitialEdges = [
    { id: "bank->bank_account", type: "fms-edge", source: "bank", target: "bank_account", animated: true },
    { id: "bank->bank_transactions", type: "fms-edge", source: "bank", target: "bank_transactions", animated: true },
    { id: "bank_account->bank_statement", type: "fms-edge", source: "bank_account", target: "bank_statement", animated: true },
    { id: "bank_transactions->bank_clearance", type: "fms-edge", source: "bank_transactions", target: "bank_clearance", animated: true },
    { id: "bank_statement->bank_reconciliation", type: "fms-edge", source: "bank_statement", target: "bank_reconciliation", animated: true },
    { id: "bank_clearance->bank_reconciliation", type: "fms-edge", source: "bank_clearance", target: "bank_reconciliation", animated: true },
    { id: "bank_reconciliation->reconciliation_report", type: "fms-edge", source: "bank_reconciliation", target: "reconciliation_report", animated: true },
] satisfies Edge[]; 