import { Edge } from "@xyflow/react";

export const FMSDocInitialEdges = [
    { id: "accounting->budget_management", type: "fms-edge", source: "accounting", target: "budget_management", animated: true },
    { id: "budget_management->asset_management", type: "fms-edge", source: "budget_management", target: "asset_management", animated: true },
    { id: "asset_management->banking", type: "fms-edge", source: "asset_management", target: "banking", animated: true },
    { id: "accounting->payments", type: "fms-edge", source: "accounting", target: "payments", animated: true },
    { id: "payments->currency", type: "fms-edge", source: "payments", target: "currency", animated: true },
    { id: "currency->tax", type: "fms-edge", source: "currency", target: "tax", animated: true },
    { id: "banking->compliance", type: "fms-edge", source: "banking", target: "compliance", animated: true },
    { id: "tax->compliance", type: "fms-edge", source: "tax", target: "compliance", animated: true },
    { id: "compliance->financial_reporting", type: "fms-edge", source: "compliance", target: "financial_reporting", animated: true },
] satisfies Edge[]; 