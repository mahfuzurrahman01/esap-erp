"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity";
import { BOM_DOC_DATA, MATERIAL_AVAILABILITY_DOC_DATA, WORK_ORDER_DOC_DATA } from "@/modules/scm/data/json/production-control-doc-data";
import { Controls } from "@xyflow/react";
import { MiniMap } from "@xyflow/react";
import { Background } from "@xyflow/react";
import { ReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { addEdge, OnConnect, useEdgesState, useNodesState } from "@xyflow/react";
import { ProductionControlDocInitialNodes } from "./nodes/production-control-nodes";
import { ProductionControlDocInitialEdges } from "./edges/production-control-edge";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";




export default function ProductionControlFeature() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(ProductionControlDocInitialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(ProductionControlDocInitialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );

    return (
        <div>
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
            <div>
                <Text className="text-2xl font-bold text-title">{t("text-BOM")}</Text>
                <DocumentWorkflowActivity activities={BOM_DOC_DATA} />
            </div>
            <div>
                <Text className="text-2xl font-bold text-title">{t("text-Material Availability")}</Text>
                <DocumentWorkflowActivity activities={MATERIAL_AVAILABILITY_DOC_DATA} />
            </div>
            <div>
                <Text className="text-2xl font-bold text-title">{t("text-Work Order")}</Text>
                <DocumentWorkflowActivity activities={WORK_ORDER_DOC_DATA} />
            </div>
        </div>
    )
}
