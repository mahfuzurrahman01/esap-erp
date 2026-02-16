"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, OnConnect, addEdge, MiniMap } from '@xyflow/react';
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import { useCallback } from "react";
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity";
import { supplierDocumentActivities } from "@/modules/scm/data/json/supplier-document";
import { SupplierDocInitialNodes } from "./nodes/supplier-doc-node";
import { SupplierDocInitialEdges } from "./edges/supplier-edge";




export default function SupplierDoc() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(SupplierDocInitialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(SupplierDocInitialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );
    return (
        <div>
            <Text className="text-2xl font-bold text-title">{t("text-supplier-collaboration")}</Text>
            {/* <div style={{ width: '100%', height: '500px' }} className="mt-10">
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
            </div> */}
            <DocumentWorkflowActivity activities={supplierDocumentActivities} />
        </div>
    )
}
