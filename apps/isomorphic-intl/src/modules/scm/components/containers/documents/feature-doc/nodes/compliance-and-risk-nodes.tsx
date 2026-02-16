import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const ComplianceAndRiskDocInitialNodes: AppNode[] = [
    {
        id: "compliance",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Compliance" },
        sourcePosition: Position.Right,
    },
    {
        id: "risk_assessment",
        position: { x: 0, y: 100 },
        data: { label: "Risk Assessment" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
];