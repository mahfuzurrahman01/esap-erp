import { Edge } from "@xyflow/react";

export const AccountingDocInitialEdges = [
    { id: "foundational_setup->country", type: "fms-edge", source: "foundational_setup", target: "country", animated: true },
    { id: "foundational_setup->company", type: "fms-edge", source: "foundational_setup", target: "company", animated: true },
    { id: "foundational_setup->currency", type: "fms-edge", source: "foundational_setup", target: "currency", animated: true },
    { id: "country->accounting_types", type: "fms-edge", source: "country", target: "accounting_types", animated: true },
    { id: "company->accounting_types", type: "fms-edge", source: "company", target: "accounting_types", animated: true },
    { id: "currency->chart_of_accounts", type: "fms-edge", source: "currency", target: "chart_of_accounts", animated: true },
    { id: "accounting_types->journal_templates", type: "fms-edge", source: "accounting_types", target: "journal_templates", animated: true },
    { id: "chart_of_accounts->journal_entries", type: "fms-edge", source: "chart_of_accounts", target: "journal_entries", animated: true },
    { id: "journal_templates->journal_entries", type: "fms-edge", source: "journal_templates", target: "journal_entries", animated: true },
    { id: "journal_entries->general_ledger", type: "fms-edge", source: "journal_entries", target: "general_ledger", animated: true },
] satisfies Edge[]; 