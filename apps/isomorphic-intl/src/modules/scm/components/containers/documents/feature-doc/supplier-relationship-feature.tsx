"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity";
import { SUPPLIER_RELATIONSHIP_DOC_DATA } from "@/modules/scm/data/json/supplier-relationship-doc-data";
import { Controls } from "@xyflow/react";
import { MiniMap } from "@xyflow/react";
import { Background } from "@xyflow/react";
import { addEdge, OnConnect, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { SupplierRelationshipDocInitialNodes } from "./nodes/supplier-relationship-nodes";
import { SupplierRelationshipDocInitialEdges } from "./edges/supplier-relationship-edge";
import { useCallback } from "react";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";




export default function SupplierRelationshipFeature() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(SupplierRelationshipDocInitialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(SupplierRelationshipDocInitialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );
    return (
        <div>
            <Text className="text-2xl font-bold text-title">{t("text-supplier-relationship")}</Text>
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
            <DocumentWorkflowActivity activities={SUPPLIER_RELATIONSHIP_DOC_DATA} />
        </div>
    )
}
