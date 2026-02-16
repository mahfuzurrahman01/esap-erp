import { Edge } from "@xyflow/react";

export const ComplianceAndRiskDocInitialEdges = [
    { id: "compliance", type: "compliance-and-risk-edge", source: "compliance", target: "", animated: true },
    { id: "risk_assessment", type: "compliance-and-risk-edge", source: "risk_assessment", target: "", animated: true },
] satisfies Edge[];