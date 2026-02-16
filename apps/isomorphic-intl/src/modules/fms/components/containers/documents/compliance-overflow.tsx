"use client"

import { useCallback } from "react"
import {
    Background,
    Controls,
    OnConnect,
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
} from "@xyflow/react"
import { useTranslations } from "next-intl"
import { Title, Text } from "rizzui/typography"

import { complianceReportingWorkflow } from "./activity-flow/compliance-reporting"
import { edgeTypes } from "./feature-doc/edges"
import { ComplianceDocInitialEdges } from "./feature-doc/edges/compliance-edge"
import { nodeTypes } from "./feature-doc/nodes"
import { ComplianceDocInitialNodes } from "./feature-doc/nodes/compliance-doc-node"
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity"

export default function ComplianceOverflow() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(ComplianceDocInitialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(ComplianceDocInitialEdges)

    const onConnect: OnConnect = useCallback(
        (connection: any) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    )

    return (
        <div className="space-y-6">
            <Title as="h2" className="text-2xl font-bold text-title">
                Compliance & Reporting
            </Title>

            <Text>
                Delivers accurate and timely reports for financial analysis, audits, and regulatory compliance.
            </Text>

            <div style={{ width: "100%", height: "800px" }} className="mt-10">
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    edgeTypes={edgeTypes}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView>
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>

            <DocumentWorkflowActivity activities={complianceReportingWorkflow} />
        </div>
    )
} 