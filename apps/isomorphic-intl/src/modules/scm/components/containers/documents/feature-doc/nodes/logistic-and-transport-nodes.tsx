import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const LogisticAndTransportDocInitialNodes: AppNode[] = [
    {
        id: "shipment",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Shipment" },
        sourcePosition: Position.Right,
    },
    {
        id: "freight",
        position: { x: 300, y: -50 },
        data: { label: "Freight" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "received_approval",
        position: { x: 300, y: 50 },
        data: { label: "Received Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "return_process",
        position: { x: 300, y: 150 },
        data: { label: "Return Process" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "return_approval",
        position: { x: 600, y: 150 },
        data: { label: "Return Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "update_stock",
        position: { x: 900, y: 150 },
        data: { label: "Update Stock" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];