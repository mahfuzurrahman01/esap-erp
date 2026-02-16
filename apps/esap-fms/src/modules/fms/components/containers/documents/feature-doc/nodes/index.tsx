"use client"

import { type BuiltInNode, type Node, type NodeTypes } from "@xyflow/react"

import { PositionLoggerNode } from "@/modules/fms/components/base/position-logger-nodes"

export type PositionLoggerNode = Node<
  {
    label?: string
  },
  "position-logger"
>

export type AppNode = BuiltInNode | PositionLoggerNode

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes
