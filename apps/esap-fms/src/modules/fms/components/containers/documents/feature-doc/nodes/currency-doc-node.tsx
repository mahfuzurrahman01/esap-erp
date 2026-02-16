import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const CurrencyDocInitialNodes: AppNode[] = [
    {
        id: "currency",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Currency" },
        sourcePosition: Position.Right,
    },
    {
        id: "currency_exchange",
        position: { x: 300, y: 50 },
        data: { label: "Currency Exchange" },
        targetPosition: Position.Left,
    }
]; 