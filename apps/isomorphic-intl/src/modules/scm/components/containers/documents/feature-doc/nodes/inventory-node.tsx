import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const InventoryDocInitialNodes: AppNode[] = [
    {
        id: "product",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Product" },
        sourcePosition: Position.Right,
    },
    {
        id: "stock_overview",
        position: { x: 300, y: 0 },
        data: { label: "Stock Overview" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "stock_replenishment",
        position: { x: 600, y: -50 },
        data: { label: "Stock Replenishment" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "stock_transfer",
        position: { x: 600, y: 100 },
        data: { label: "Stock Transfer" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "shipment",
        position: { x: 900, y: 100 },
        data: { label: "Shipment" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "requisition",
        position: { x: 900, y: -50 },
        data: { label: "Requisition" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];