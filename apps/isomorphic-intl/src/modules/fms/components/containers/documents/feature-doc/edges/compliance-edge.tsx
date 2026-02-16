import { Edge } from "@xyflow/react";

export const ComplianceDocInitialEdges = [
    { id: "compliance_reporting->financial_reports", type: "fms-edge", source: "compliance_reporting", target: "financial_reports", animated: true },
    { id: "compliance_reporting->budget_reports", type: "fms-edge", source: "compliance_reporting", target: "budget_reports", animated: true },
    { id: "compliance_reporting->asset_reports", type: "fms-edge", source: "compliance_reporting", target: "asset_reports", animated: true },
    { id: "compliance_reporting->banking_reports", type: "fms-edge", source: "compliance_reporting", target: "banking_reports", animated: true },
    { id: "compliance_reporting->payment_reports", type: "fms-edge", source: "compliance_reporting", target: "payment_reports", animated: true },

    { id: "financial_reports->general_ledger", type: "fms-edge", source: "financial_reports", target: "general_ledger", animated: true },
    { id: "financial_reports->trial_balance", type: "fms-edge", source: "financial_reports", target: "trial_balance", animated: true },
    { id: "financial_reports->profit_loss", type: "fms-edge", source: "financial_reports", target: "profit_loss", animated: true },
    { id: "financial_reports->balance_sheet", type: "fms-edge", source: "financial_reports", target: "balance_sheet", animated: true },

    { id: "budget_reports->budget_summary", type: "fms-edge", source: "budget_reports", target: "budget_summary", animated: true },
    { id: "budget_reports->budget_variance", type: "fms-edge", source: "budget_reports", target: "budget_variance", animated: true },

    { id: "asset_reports->fixed_asset_register", type: "fms-edge", source: "asset_reports", target: "fixed_asset_register", animated: true },
    { id: "asset_reports->asset_depreciation", type: "fms-edge", source: "asset_reports", target: "asset_depreciation", animated: true },

    { id: "banking_reports->bank_summary", type: "fms-edge", source: "banking_reports", target: "bank_summary", animated: true },

    { id: "payment_reports->payment_summary", type: "fms-edge", source: "payment_reports", target: "payment_summary", animated: true },
] satisfies Edge[]; 