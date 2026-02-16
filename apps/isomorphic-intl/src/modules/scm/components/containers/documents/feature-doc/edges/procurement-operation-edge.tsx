import { Edge } from "@xyflow/react";

export const procurementOperationEdges = [
    { id: "requisition->requisition_approval", type: "procurement-operation-edge", source: "requisition", target: "requisition_approval", animated: true },
    { id: "requisition_approval->purchase_order", type: "procurement-operation-edge", source: "requisition_approval", target: "purchase_order", animated: true },
    { id: "purchase_order->purchase_order_approval", type: "procurement-operation-edge", source: "purchase_order", target: "purchase_order_approval", animated: true },
    { id: "approval->purchase_invoice", type: "procurement-operation-edge", source: "approval", target: "purchase_invoice", animated: true },
    { id: "purchase_invoice->payment", type: "procurement-operation-edge", source: "purchase_invoice", target: "payment", animated: true },
] satisfies Edge[];