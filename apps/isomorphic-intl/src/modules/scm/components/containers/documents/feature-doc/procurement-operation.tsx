"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, OnConnect, addEdge, MiniMap } from '@xyflow/react';
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import { useCallback } from "react";
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity";
import { supplierDocumentActivities } from "@/modules/scm/data/json/supplier-document";
import { procurementOperationEdges } from "./edges/procurement-operation-edge";
import { procurementOperationNodes } from "./nodes/procurement-operation-doc-node";
import { procurementWorkflow } from "@/modules/scm/data/json/procurement-operation";




export default function ProcurementOperation() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(procurementOperationNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(procurementOperationEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );
    return (
        <div>
            <Text className="text-2xl font-bold text-title">{t("text-procurement-operation")}</Text>
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
            <DocumentWorkflowActivity activities={procurementWorkflow} />
        </div>
    )
}
