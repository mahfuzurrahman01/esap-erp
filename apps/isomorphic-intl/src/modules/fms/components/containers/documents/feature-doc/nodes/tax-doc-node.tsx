import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const TaxDocInitialNodes: AppNode[] = [
    {
        id: "tax_category",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Tax Category" },
        sourcePosition: Position.Right,
    },
    {
        id: "tax_template",
        position: { x: 300, y: 0 },
        data: { label: "Tax Template" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "tax_rule",
        position: { x: 600, y: 50 },
        data: { label: "Tax Rule" },
        targetPosition: Position.Left,
    }
]; 