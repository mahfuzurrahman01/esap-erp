import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const procurementOperationNodes: AppNode[] = [
    {
        id: "requisition",
        position: { x: 0, y: 50 },
        type: "input",
        data: { label: "Requisition" },
        sourcePosition: Position.Right,
    },
    {
        id: "requisition_approval",
        position: { x: 300, y: 0 },
        data: { label: "Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "purchase_order",
        position: { x: 600, y: -50 },
        data: { label: "Purchase Order" },
        targetPosition: Position.Left,
        sourcePosition: Position.Left,
    },
    {
        id: "purchase_order_approval",
        position: { x: 300, y: 0 },
        data: { label: "Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "purchase_invoice",
        position: { x: 600, y: 100 },
        data: { label: "Purchase Invoice" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "payment",
        position: { x: 600, y: 100 },
        data: { label: "Payment" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },

]