import { Edge } from "@xyflow/react";

export const SupplierRelationshipDocInitialEdges = [
    { id: "supplier->evaluation", type: "supplier_relationship-edge", source: "supplier", target: "evaluation", animated: true },
    { id: "supplier->risk_assessment", type: "supplier_relationship-edge", source: "supplier", target: "risk_assessment", animated: true },
] satisfies Edge[];