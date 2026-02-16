"use client"

import { type Node, type NodeTypes, type BuiltInNode } from "@xyflow/react";
import { PositionLoggerNode } from "../../../../base/position-logger-nodes";
import { ProcurementOperationPositionLoggerNode } from "@/modules/scm/components/base/procurement-operation-position-logger-nodes";
export type PositionLoggerNode = Node<
    {
        label?: string;
    },
    "position-logger" | "procurement-operation-position-logger"
>;

export type AppNode = BuiltInNode | PositionLoggerNode;


export const nodeTypes = {
    "position-logger": PositionLoggerNode,
    "procurement-operation-position-logger": ProcurementOperationPositionLoggerNode,
    // Add any of your custom nodes here!
} satisfies NodeTypes;
