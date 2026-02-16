"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity";
import { COMPLIANCE_DOC_DATA, RISK_DOC_DATA } from "@/modules/scm/data/json/compliance-and-risk-doc-data";
import { addEdge, Controls, MiniMap, Background, OnConnect, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { ComplianceAndRiskDocInitialNodes } from "./nodes/compliance-and-risk-nodes";
import { ComplianceAndRiskDocInitialEdges } from "./edges/compliance-and-risk-edge";
import { useCallback } from "react";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";




export default function ComplianceAndRiskFeature() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(ComplianceAndRiskDocInitialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(ComplianceAndRiskDocInitialEdges);
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
                <Text className="text-2xl font-bold text-title">{t("text-compliance")}</Text>
                <DocumentWorkflowActivity activities={COMPLIANCE_DOC_DATA} />
            </div>
            <div>
                <Text className="text-2xl font-bold text-title">{t("text-risk")}</Text>
                <DocumentWorkflowActivity activities={RISK_DOC_DATA} />
            </div>
        </div>
    )
}
