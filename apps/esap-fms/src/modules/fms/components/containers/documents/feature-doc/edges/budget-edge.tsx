import { Edge } from "@xyflow/react";

export const BudgetDocInitialEdges = [
    { id: "budget->monthly_distribution", type: "fms-edge", source: "budget", target: "monthly_distribution", animated: true },
    { id: "monthly_distribution->budget_against", type: "fms-edge", source: "monthly_distribution", target: "budget_against", animated: true },
    { id: "budget->cost_center", type: "fms-edge", source: "budget", target: "cost_center", animated: true },
    { id: "cost_center->fiscal_year", type: "fms-edge", source: "cost_center", target: "fiscal_year", animated: true },
    { id: "budget_against->budget_analysis", type: "fms-edge", source: "budget_against", target: "budget_analysis", animated: true },
    { id: "budget_analysis->budget_forecasting", type: "fms-edge", source: "budget_analysis", target: "budget_forecasting", animated: true },
    { id: "fiscal_year->budget_analysis", type: "fms-edge", source: "fiscal_year", target: "budget_analysis", animated: true },
] satisfies Edge[]; 