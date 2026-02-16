import React from "react"
import type { SVGProps } from "react"

export function DuoIconsBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="currentColor"
        d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z"
        className="duoicon-secondary-layer"
        opacity={0.3}></path>
      <path
        fill="currentColor"
        d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2"
        className="duoicon-primary-layer"></path>
    </svg>
  )
}
