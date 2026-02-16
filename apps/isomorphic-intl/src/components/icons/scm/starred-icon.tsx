import * as React from "react"

export default function StarredIcon(props: React.SVGProps<SVGSVGElement>) {
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
      d="M13.633 16.5a.83.83 0 0 1-.383-.092L9 14.183l-4.25 2.225a.835.835 0 0 1-1.208-.883l.833-4.692L.942 7.5a.83.83 0 0 1-.209-.833.83.83 0 0 1 .675-.567l4.75-.692L8.25 1.133a.833.833 0 0 1 1.5 0L11.867 5.4l4.75.692a.83.83 0 0 1 .675.566.83.83 0 0 1-.209.834l-3.433 3.333.833 4.692a.83.83 0 0 1-.333.833.83.83 0 0 1-.517.15"></path>
    </svg>
  )
}
