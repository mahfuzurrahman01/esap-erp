import React from "react"
import type { SVGProps } from "react"

export function ProgramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M14.217 3.5a5.17 5.17 0 0 0-4.434 0L3.092 6.635c-1.076.504-1.357 1.927-.842 2.91V14.5a.75.75 0 1 0 1.5 0v-3.828l6.033 2.827a5.17 5.17 0 0 0 4.434 0l6.69-3.136c1.457-.683 1.457-3.045 0-3.727z"></path>
      <path
        fill="currentColor"
        d="M5 11.258 9.783 13.5a5.17 5.17 0 0 0 4.434 0L19 11.258v5.367c0 1.008-.503 1.952-1.385 2.44C16.146 19.88 13.796 21 12 21s-4.146-1.121-5.615-1.935C5.504 18.577 5 17.633 5 16.625z"
        opacity="0.3"></path>
    </svg>
  )
}
