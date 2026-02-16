import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const SupplierRelationshipDocInitialNodes: AppNode[] = [
    {
        id: "supplier",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Supplier" },
        sourcePosition: Position.Right,
    },
    {
        id: "evaluation",
        position: { x: 300, y: -50 },
        data: { label: "Evaluation" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "risk_assessment",
        position: { x: 300, y: 100 },
        data: { label: "Risk Assessment" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
];