"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, OnConnect, addEdge, MiniMap } from '@xyflow/react';
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import { useCallback } from "react";
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity";
import { stockOperationWorkflow } from "@/modules/scm/data/json/stock-doc";
import { InventoryDocInitialNodes } from "./nodes/inventory-node";
import { InventoryDocInitialEdges } from "./edges/inventory-edge";


export default function InventoryOperation() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(InventoryDocInitialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(InventoryDocInitialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );
    return (
        <div>
            <Text className="text-2xl font-bold text-title">{t("text-inventory")}</Text>
            <div style={{ width: '100%', height: '500px' }} className="mt-10">
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    edgeTypes={edgeTypes}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                >
                    <Background />
                    <MiniMap />
                    <Controls />
                </ReactFlow>
            </div>
            <DocumentWorkflowActivity activities={stockOperationWorkflow} />
        </div>
    )
}
