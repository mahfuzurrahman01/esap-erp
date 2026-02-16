import React, { SVGProps } from "react"

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      role="img"
      className="iconify iconify--eva mnl__icon__root MuiBox-root css-cnvj7y"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
      <circle cx="12" cy="5" r="2" fill="currentColor"></circle>
      <circle cx="12" cy="19" r="2" fill="currentColor"></circle>
    </svg>
  )
}
