import { Edge } from "@xyflow/react";

export const LogisticAndTransportDocInitialEdges = [
    { id: "shipment->freight", type: "logistic-and-transport-edge", source: "shipment", target: "freight", animated: true },
    { id: "shipment->received_approval", type: "logistic-and-transport-edge", source: "shipment", target: "received_approval", animated: true },
    { id: "shipment->return_process", type: "logistic-and-transport-edge", source: "shipment", target: "return_process", animated: true },
    { id: "return_process->return_approval", type: "logistic-and-transport-edge", source: "return_process", target: "return_approval", animated: true },
    { id: "return_approval->update_stock", type: "logistic-and-transport-edge", source: "return_approval", target: "update_stock", animated: true },
] satisfies Edge[];