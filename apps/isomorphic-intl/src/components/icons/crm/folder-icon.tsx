import React from "react"
import type { SVGProps } from "react"

export function FolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 20 20"
      transform="scale(0.8)"
      {...props}>
      <path
        fill="currentColor"
        d="M0 4.95c0-.883 0-1.324.07-1.692A4 4 0 0 1 3.257.07C3.626 0 4.068 0 4.95 0c.386 0 .58 0 .766.017a4 4 0 0 1 2.18.904c.144.119.28.255.554.529L9 2c.816.816 1.224 1.224 1.712 1.495a4 4 0 0 0 .848.352C12.098 4 12.675 4 13.828 4h.374c2.632 0 3.949 0 4.804.77q.12.105.224.224c.77.855.77 2.172.77 4.804V12c0 3.771 0 5.657-1.172 6.828S15.771 20 12 20H8c-3.771 0-5.657 0-6.828-1.172S0 15.771 0 12z"
        opacity="0.3"></path>
      <path
        fill="currentColor"
        d="M18 4.238c0-.298-.005-.475-.025-.63a3 3 0 0 0-2.583-2.582C15.197 1 14.965 1 14.5 1H7.988c.116.104.247.234.462.45L9 2c.816.816 1.224 1.224 1.712 1.495q.405.226.85.352C12.097 4 12.674 4 13.828 4h.373c1.78 0 2.957 0 3.798.238"></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.25 8a.75.75 0 0 1 .75-.75h5a.75.75 0 1 1 0 1.5h-5a.75.75 0 0 1-.75-.75"
        clipRule="evenodd"></path>
    </svg>
  )
}
