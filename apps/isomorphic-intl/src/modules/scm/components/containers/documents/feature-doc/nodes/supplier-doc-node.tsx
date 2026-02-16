import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const SupplierDocInitialNodes: AppNode[] = [
    {
        id: "supplier",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Supplier" },
        sourcePosition: Position.Right,
    },
    {
        id: "contract",
        position: { x: 300, y: -100 },
        data: { label: "Contract" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "contract_renewal",
        position: { x: 600, y: -150 },
        data: { label: "Contract Renewal" },
        targetPosition: Position.Left,
        sourcePosition: Position.Left,
    },
    {
        id: "evaluation",
        position: { x: 300, y: 50 },
        data: { label: "Evaluation" },
        targetPosition: Position.Left,
    },
    {
        id: "service_level_agreement",
        position: { x: 600, y: -50 },
        data: { label: "Service Level Agreement (SLA) Monitoring" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "requisition",
        position: { x: 300, y: 200 },
        data: { label: "Requisition" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "requisition_approval",
        position: { x: 600, y: 200 },
        data: { label: "Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "purchase_order",
        position: { x: 900, y: 200 },
        data: { label: "Purchase Order" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "purchase_order_approval",
        position: { x: 1200, y: 200 },
        data: { label: "Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "purchase_invoice",
        position: { x: 1500, y: 200 },
        data: { label: "Purchase Invoice" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "payment",
        position: { x: 1800, y: 200 },
        data: { label: "Payment" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
];