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

import { taxManagementWorkflow } from "./activity-flow/tax-management"
import { edgeTypes } from "./feature-doc/edges"
import { TaxDocInitialEdges } from "./feature-doc/edges/tax-edge"
import { nodeTypes } from "./feature-doc/nodes"
import { TaxDocInitialNodes } from "./feature-doc/nodes/tax-doc-node"

export default function TaxOverflow() {
  const t = useTranslations("common")
  const [nodes, , onNodesChange] = useNodesState(TaxDocInitialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(TaxDocInitialEdges)

  const onConnect: OnConnect = useCallback(
    (connection: any) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )

  return (
    <div className="space-y-6">
      <Title as="h2" className="text-2xl font-bold text-title">
        Tax Management Overflow
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
      {/* <DocumentWorkflowActivity activities={taxManagementWorkflow} /> */}
    </div>
  )
} 