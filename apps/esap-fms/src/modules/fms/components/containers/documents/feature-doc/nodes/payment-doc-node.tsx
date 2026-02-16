import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const PaymentDocInitialNodes: AppNode[] = [
    {
        id: "payment_entry",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Payment Entry" },
        sourcePosition: Position.Right,
    },
    {
        id: "payment_request",
        position: { x: 300, y: 0 },
        data: { label: "Payment Request" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "mode_of_payment",
        position: { x: 300, y: 100 },
        data: { label: "Mode Of Payment" },
        targetPosition: Position.Left,
    }
]; 