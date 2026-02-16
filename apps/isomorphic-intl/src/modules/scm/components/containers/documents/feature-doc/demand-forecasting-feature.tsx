"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity";
import { DEMAND_FORECAST_DOC_DATA } from "@/modules/scm/data/json/demand-forecast-doc-data";
import { addEdge, Background, Controls, MiniMap, ReactFlow, useEdgesState } from "@xyflow/react";
import { useCallback } from "react";

import { DemandForecastDocInitialNodes } from "./nodes/demand-forecast-nodes";
import { DemandForecastDocInitialEdges } from "./edges/demand-forecast-edge";
import { OnConnect, useNodesState } from "@xyflow/react";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";




export default function DemandForecastingFeature() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(DemandForecastDocInitialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(DemandForecastDocInitialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );
    return (
        <div>
            <Text className="text-2xl font-bold text-title">{t("text-demand-forecasting")}</Text>
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
            <DocumentWorkflowActivity activities={DEMAND_FORECAST_DOC_DATA} />
        </div>
    )
}
