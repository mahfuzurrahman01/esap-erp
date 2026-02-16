import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const ComplianceDocInitialNodes: AppNode[] = [
    {
        id: "terms_conditions",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Terms and Conditions" },
        sourcePosition: Position.Right,
    }
]; 