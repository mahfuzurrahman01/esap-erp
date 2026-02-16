import { Edge } from "@xyflow/react";

export const AssetDocInitialEdges = [
    { id: "asset->asset_location", type: "fms-edge", source: "asset", target: "asset_location", animated: true },
    { id: "asset->asset_category", type: "fms-edge", source: "asset", target: "asset_category", animated: true },
    { id: "asset_location->asset_movement", type: "fms-edge", source: "asset_location", target: "asset_movement", animated: true },
    { id: "asset_category->asset_maintenance", type: "fms-edge", source: "asset_category", target: "asset_maintenance", animated: true },
    { id: "asset_maintenance->asset_repair", type: "fms-edge", source: "asset_maintenance", target: "asset_repair", animated: true },
    { id: "asset_movement->asset_depreciation", type: "fms-edge", source: "asset_movement", target: "asset_depreciation", animated: true },
] satisfies Edge[]; 