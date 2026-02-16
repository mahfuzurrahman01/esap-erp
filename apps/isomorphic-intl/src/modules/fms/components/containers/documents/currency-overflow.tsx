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

import { currencyManagementWorkflow } from "./activity-flow/currency-management"
import { edgeTypes } from "./feature-doc/edges"
import { CurrencyDocInitialEdges } from "./feature-doc/edges/currency-edge"
import { nodeTypes } from "./feature-doc/nodes"
import { CurrencyDocInitialNodes } from "./feature-doc/nodes/currency-doc-node"

export default function CurrencyOverflow() {
  const t = useTranslations("common")
  const [nodes, , onNodesChange] = useNodesState(CurrencyDocInitialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(CurrencyDocInitialEdges)

  const onConnect: OnConnect = useCallback(
    (connection: any) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )

  return (
    <div className="space-y-6">
      <Title as="h2" className="text-2xl font-bold text-title">
        Currency Management Overflow
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
      {/* <DocumentWorkflowActivity activities={currencyManagementWorkflow} /> */}
    </div>
  )
} 