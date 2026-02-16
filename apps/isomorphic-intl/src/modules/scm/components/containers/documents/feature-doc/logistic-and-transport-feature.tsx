"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity";
import { FREIGHT_DOC_DATA, RETURN_PROCESS_DOC_DATA, SHIPMENT_DOC_DATA } from "@/modules/scm/data/json/logistic-and-transportaion-doc-data";
import { addEdge, Controls, Background, MiniMap, OnConnect, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { LogisticAndTransportDocInitialNodes } from "./nodes/logistic-and-transport-nodes";
import { LogisticAndTransportDocInitialEdges } from "./edges/logistic-and-transport-edges";
import { useCallback } from "react";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";




export default function LogisticAndTransportFeature() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(LogisticAndTransportDocInitialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(LogisticAndTransportDocInitialEdges);
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
                <Text className="text-2xl font-bold text-title">{t("text-shipment")}</Text>
                <DocumentWorkflowActivity activities={SHIPMENT_DOC_DATA} />
            </div>
            <div>
                <Text className="text-2xl font-bold text-title">{t("text-freight")}</Text>
                <DocumentWorkflowActivity activities={FREIGHT_DOC_DATA} />
            </div>
            <div>
                <Text className="text-2xl font-bold text-title">{t("text-return-process")}</Text>
                <DocumentWorkflowActivity activities={RETURN_PROCESS_DOC_DATA} />
            </div>
        </div>
    )
}
