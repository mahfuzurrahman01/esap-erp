import { Edge } from "@xyflow/react";

export const ProductionControlDocInitialEdges = [
    { id: "bill_of_material->bill_of_material_version", type: "production-control-edge", source: "bill_of_material", target: "bill_of_material_version", animated: true },
    { id: "bill_of_material->bill_of_material_approval", type: "production-control-edge", source: "bill_of_material", target: "bill_of_material_approval", animated: true },
    { id: "bill_of_material_approval->material_availability", type: "production-control-edge", source: "bill_of_material_approval", target: "material_availability", animated: true },
    { id: "material_availability->material_availability_approval", type: "production-control-edge", source: "material_availability", target: "material_availability_approval", animated: true },
    {
        id: "material_availability_approval->requisition",
        type: "production-control-edge",
        source: "material_availability_approval",
        target: "requisition",
        animated: true,
    },
    {
        id: "bill_of_material_approval->work_order",
        type: "production-control-edge",
        source: "bill_of_material_approval",
        target: "work_order",
        animated: true,
    },
] satisfies Edge[];