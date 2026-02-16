import { Position } from "@xyflow/react";
import { AppNode } from ".";

export const AssetDocInitialNodes: AppNode[] = [
    {
        id: "asset",
        type: "input",
        position: { x: 0, y: 50 },
        data: { label: "Asset" },
        sourcePosition: Position.Right,
    },
    {
        id: "asset_location",
        position: { x: 300, y: 0 },
        data: { label: "Asset Location" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "asset_category",
        position: { x: 300, y: 100 },
        data: { label: "Asset Category" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "asset_movement",
        position: { x: 600, y: 0 },
        data: { label: "Asset Movement" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "asset_maintenance",
        position: { x: 600, y: 100 },
        data: { label: "Asset Maintenance" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "asset_repair",
        position: { x: 900, y: 100 },
        data: { label: "Asset Repair" },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: "asset_depreciation",
        position: { x: 900, y: 0 },
        data: { label: "Asset Depreciation" },
        targetPosition: Position.Left,
    },
]; 