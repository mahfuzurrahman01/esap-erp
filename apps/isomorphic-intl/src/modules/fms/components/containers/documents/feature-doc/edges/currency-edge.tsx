import { Edge } from "@xyflow/react";

export const CurrencyDocInitialEdges = [
    { id: "currency->currency_exchange", type: "fms-edge", source: "currency", target: "currency_exchange", animated: true },
] satisfies Edge[]; 