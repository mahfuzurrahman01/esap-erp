import { Edge } from "@xyflow/react";

export const BudgetDocInitialEdges = [
    { id: "budget->fiscal_year", type: "fms-edge", source: "budget", target: "fiscal_year", animated: true },
    { id: "budget->company", type: "fms-edge", source: "budget", target: "company", animated: true },
    { id: "fiscal_year->cost_center", type: "fms-edge", source: "fiscal_year", target: "cost_center", animated: true },
    { id: "company->cost_center", type: "fms-edge", source: "company", target: "cost_center", animated: true },
    { id: "cost_center->budget_against", type: "fms-edge", source: "cost_center", target: "budget_against", animated: true },
    { id: "budget_against->budget_allocation", type: "fms-edge", source: "budget_against", target: "budget_allocation", animated: true },
    { id: "budget_against->budget_details", type: "fms-edge", source: "budget_against", target: "budget_details", animated: true },
    { id: "budget_allocation->budget_records", type: "fms-edge", source: "budget_allocation", target: "budget_records", animated: true },
    { id: "budget_details->budget_records", type: "fms-edge", source: "budget_details", target: "budget_records", animated: true },
] satisfies Edge[]; 