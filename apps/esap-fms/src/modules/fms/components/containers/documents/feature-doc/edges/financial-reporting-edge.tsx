import { Edge } from "@xyflow/react";

export const FinancialReportingDocInitialEdges = [
    { id: "general_ledger->trial_balance", type: "fms-edge", source: "general_ledger", target: "trial_balance", animated: true },
    { id: "trial_balance->profit_loss", type: "fms-edge", source: "trial_balance", target: "profit_loss", animated: true },
    { id: "trial_balance->balance_sheet", type: "fms-edge", source: "trial_balance", target: "balance_sheet", animated: true },
    { id: "profit_loss->cash_flow", type: "fms-edge", source: "profit_loss", target: "cash_flow", animated: true },
    { id: "balance_sheet->budget_variance", type: "fms-edge", source: "balance_sheet", target: "budget_variance", animated: true },
    { id: "general_ledger->fixed_asset_register", type: "fms-edge", source: "general_ledger", target: "fixed_asset_register", animated: true },
    { id: "fixed_asset_register->asset_depreciation", type: "fms-edge", source: "fixed_asset_register", target: "asset_depreciation", animated: true },
    { id: "asset_depreciation->accounts_receivable", type: "fms-edge", source: "asset_depreciation", target: "accounts_receivable", animated: true },
    { id: "asset_depreciation->accounts_payable", type: "fms-edge", source: "asset_depreciation", target: "accounts_payable", animated: true },
] satisfies Edge[]; 