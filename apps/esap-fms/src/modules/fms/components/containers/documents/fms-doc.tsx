"use client"

import { useCallback } from "react"

import {
  Background,
  Controls,
  MiniMap,
  OnConnect,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import { useTranslations } from "next-intl"
import { Text } from "rizzui/typography"

import { edgeTypes } from "./feature-doc/edges"
import { FMSDocInitialEdges } from "./feature-doc/edges/fms-edge"
import { nodeTypes } from "./feature-doc/nodes"
import { FMSDocInitialNodes } from "./feature-doc/nodes/fms-doc-node"
import FMSManagementOverflow from "./fms-management-overflow"

export default function FMSDoc() {
  const t = useTranslations("common")
  const [nodes, , onNodesChange] = useNodesState(FMSDocInitialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(FMSDocInitialEdges)

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )

  return (
    <div>
      <Text className="text-2xl font-bold text-title">
        {t("text-financial-management")}
      </Text>
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
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <FMSManagementOverflow />
    </div>
  )
}
