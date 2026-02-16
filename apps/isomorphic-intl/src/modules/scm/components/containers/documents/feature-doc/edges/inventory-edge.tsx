import { Edge } from "@xyflow/react";

export const InventoryDocInitialEdges = [
    { id: "product->stock_overview", type: "inventory-edge", source: "product", target: "stock_overview", animated: true },
    { id: "stock_overview->stock_replenishment", type: "inventory-edge", source: "stock_overview", target: "stock_replenishment", animated: true },
    { id: "stock_replenishment->requisition", type: "inventory-edge", source: "stock_replenishment", target: "requisition", animated: true },
    { id: "stock_overview->stock_transfer", type: "inventory-edge", source: "stock_overview", target: "stock_transfer", animated: true },
    { id: "stock_transfer->shipment", type: "inventory-edge", source: "stock_transfer", target: "shipment", animated: true },
] satisfies Edge[];