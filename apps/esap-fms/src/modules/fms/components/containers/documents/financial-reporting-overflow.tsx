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

// import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity"

import { financialReportingWorkflow } from "./activity-flow/financial-reporting"
import { edgeTypes } from "./feature-doc/edges"
import { FinancialReportingDocInitialEdges } from "./feature-doc/edges/financial-reporting-edge"
import { nodeTypes } from "./feature-doc/nodes"
import { FinancialReportingDocInitialNodes } from "./feature-doc/nodes/financial-reporting-doc-node"

export default function FinancialReportingOverflow() {
  const t = useTranslations("common")
  const [nodes, , onNodesChange] = useNodesState(FinancialReportingDocInitialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(FinancialReportingDocInitialEdges)

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
      {/* <DocumentWorkflowActivity activities={financialReportingWorkflow} /> */}
    </div>
  )
} 