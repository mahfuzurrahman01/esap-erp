import * as React from "react"

export default function MarkAsReadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    {...props}>
    <path
      fill="currentColor"
      d="M1.146 9.27 3.25 6 1.146 2.729q-.542-.834-.063-1.698.48-.865 1.48-.864H9.5q.417 0 .782.187.364.188.593.52l2.938 4.168q.312.436.312.958 0 .521-.312.958l-2.938 4.167q-.229.334-.593.52a1.7 1.7 0 0 1-.782.188H2.562q-1 0-1.479-.865-.48-.864.063-1.697"></path>
    </svg>
  )
}
