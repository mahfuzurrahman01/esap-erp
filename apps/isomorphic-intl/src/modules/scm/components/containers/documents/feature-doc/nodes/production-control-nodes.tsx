import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const ProductionControlDocInitialNodes: AppNode[] = [
    {
        id: "bill_of_material",
        type: "input",
        position: { x: 0, y: 0 },
        data: { label: "Bill of Material" },
        sourcePosition: Position.Right,
    },
    {
        id: "bill_of_material_version",
        position: { x: 300, y: -100 },
        data: { label: "Bill of Material Version" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "bill_of_material_approval",
        position: { x: 300, y: 0 },
        data: { label: "Bill of Material Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "material_availability",
        position: { x: 600, y: -80 },
        data: { label: "Material Availability" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "material_availability_approval",
        position: { x: 900, y: -80 },
        data: { label: "Material Availability Approval" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "requisition",
        position: { x: 1200, y: -80 },
        data: { label: "Requisition" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "work_order",
        position: { x: 600, y: 100 },
        data: { label: "Work Order" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
];