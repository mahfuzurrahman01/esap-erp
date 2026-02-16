import { Edge } from "@xyflow/react";

export const SupplierDocInitialEdges = [
    { id: "supplier->contract", type: "supplier-edge", source: "supplier", target: "contract", animated: true },
    { id: "supplier->evaluation", type: "supplier-edge", source: "supplier", target: "evaluation", animated: true },
    { id: "contract->contract_renewal", type: "supplier-edge", source: "contract", target: "contract_renewal", animated: true },
    { id: "contract->service_level_agreement", type: "supplier-edge", source: "contract", target: "service_level_agreement", animated: true },
    { id: "supplier->requisition", type: "supplier-edge", source: "supplier", target: "requisition", animated: true },
    { id: "requisition->requisition_approval", type: "supplier-edge", source: "requisition", target: "requisition_approval", animated: true },
    { id: "requisition_approval->purchase_order", type: "supplier-edge", source: "requisition_approval", target: "purchase_order", animated: true },
    { id: "purchase_order->purchase_order_approval", type: "supplier-edge", source: "purchase_order", target: "purchase_order_approval", animated: true },
    { id: "purchase_order_approval->purchase_invoice", type: "supplier-edge", source: "purchase_order_approval", target: "purchase_invoice", animated: true },
    { id: "purchase_invoice->payment", type: "supplier-edge", source: "purchase_invoice", target: "payment", animated: true },
] satisfies Edge[];