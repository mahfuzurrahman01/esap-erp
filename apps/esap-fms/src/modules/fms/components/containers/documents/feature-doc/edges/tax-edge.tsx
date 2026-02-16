import { Edge } from "@xyflow/react";

export const TaxDocInitialEdges = [
    { id: "tax_category->tax_template", type: "fms-edge", source: "tax_category", target: "tax_template", animated: true },
    { id: "tax_template->tax_rule", type: "fms-edge", source: "tax_template", target: "tax_rule", animated: true },
] satisfies Edge[]; 