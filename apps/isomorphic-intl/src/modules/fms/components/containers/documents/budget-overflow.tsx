"use client"

import { useCallback } from "react"

import {
  Background,
  Controls,
  OnConnect,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import { ReactFlow } from "@xyflow/react"
import { useTranslations } from "next-intl"
import { Title } from "rizzui/typography"

// import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity"

import { budgetManagementWorkflow } from "./activity-flow/budget"
import { edgeTypes } from "./feature-doc/edges"
import { BudgetDocInitialEdges } from "./feature-doc/edges/budget-edge"
import { nodeTypes } from "./feature-doc/nodes"
import { BudgetDocInitialNodes } from "./feature-doc/nodes/budget-doc-node"

export default function BudgetOverflow() {
  const t = useTranslations("common")
  const [nodes, , onNodesChange] = useNodesState(BudgetDocInitialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(BudgetDocInitialEdges)

  const onConnect: OnConnect = useCallback(
    (connection: any) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )

  return (
    <div className="space-y-6">
      <Title as="h2" className="text-2xl font-bold text-title">
        Budget Management Overflow
      </Title>
      <div style={{ width: "100%", height: "500px" }} className="mt-10">
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
      {/* <DocumentWorkflowActivity activities={budgetManagementWorkflow} /> */}
    </div>
  )
}
