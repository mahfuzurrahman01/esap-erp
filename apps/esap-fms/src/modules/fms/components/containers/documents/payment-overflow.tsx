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

import { paymentManagementWorkflow } from "./activity-flow/payment-management"
import { edgeTypes } from "./feature-doc/edges"
import { PaymentDocInitialEdges } from "./feature-doc/edges/payment-edge"
import { nodeTypes } from "./feature-doc/nodes"
import { PaymentDocInitialNodes } from "./feature-doc/nodes/payment-doc-node"

export default function PaymentOverflow() {
  const t = useTranslations("common")
  const [nodes, , onNodesChange] = useNodesState(PaymentDocInitialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(PaymentDocInitialEdges)

  const onConnect: OnConnect = useCallback(
    (connection: any) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )

  return (
    <div className="space-y-6">
      <Title as="h2" className="text-2xl font-bold text-title">
        Payment Management Overflow
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
      {/* <DocumentWorkflowActivity activities={paymentManagementWorkflow} /> */}
    </div>
  )
} 