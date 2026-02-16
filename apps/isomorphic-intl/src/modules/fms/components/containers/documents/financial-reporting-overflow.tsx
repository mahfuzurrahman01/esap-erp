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
import { Title } from "rizzui/typography"

import { financialReportingWorkflow } from "./activity-flow/financial-reporting"
import { edgeTypes } from "./feature-doc/edges"
import { nodeTypes } from "./feature-doc/nodes"
import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity"
import { ComplianceDocInitialEdges } from "./feature-doc/edges/compliance-edge"
import { ComplianceDocInitialNodes } from "./feature-doc/nodes/compliance-doc-node"

export default function FinancialReportingOverflow() {
  const t = useTranslations("common")
  const [nodes, , onNodesChange] = useNodesState(ComplianceDocInitialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(ComplianceDocInitialEdges)

  const onConnect: OnConnect = useCallback(
    (connection: any) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )

  return (
    <div className="space-y-6">
      <Title as="h2" className="text-2xl font-bold text-title">
        Financial Reporting Overflow
      </Title>
      <div style={{ width: "100%", height: "700px" }} className="mt-10">
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
      <DocumentWorkflowActivity activities={financialReportingWorkflow} />
    </div>
  )
} 