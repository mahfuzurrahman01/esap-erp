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

import { accountingManagementWorkflow } from "./activity-flow/accounting-management"
import { edgeTypes } from "./feature-doc/edges"
import { AccountingDocInitialEdges } from "./feature-doc/edges/accounting-edge"
import { nodeTypes } from "./feature-doc/nodes"
import { AccountingDocInitialNodes } from "./feature-doc/nodes/accounting-doc-node"

export default function AccountingOverflow() {
    const t = useTranslations("common")
    const [nodes, , onNodesChange] = useNodesState(AccountingDocInitialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(AccountingDocInitialEdges)

    const onConnect: OnConnect = useCallback(
        (connection: any) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    )

    return (
        <div className="space-y-6">
            <Title as="h2" className="text-2xl font-bold text-title">
                Accounting Management Overflow
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
            {/* <DocumentWorkflowActivity activities={accountingManagementWorkflow} /> */}
        </div>
    )
} 