import { Edge } from "@xyflow/react";

export const PaymentDocInitialEdges = [
    { id: "payment_entry->payment_request", type: "fms-edge", source: "payment_entry", target: "payment_request", animated: true },
    { id: "payment_entry->mode_of_payment", type: "fms-edge", source: "payment_entry", target: "mode_of_payment", animated: true },
] satisfies Edge[]; 