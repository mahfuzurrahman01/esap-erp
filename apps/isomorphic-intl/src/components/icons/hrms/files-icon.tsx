import React from "react"
import type { SVGProps } from "react"

export function FolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48">
      <g opacity="0.98">
        <path
          fill="#E94848"
          d="M27.972 0a2 2 0 0 1 1.414.585l14.428 14.417a2 2 0 0 1 .586 1.415V42.4c0 3.093-2.557 5.6-5.712 5.6H9.312C6.157 48 3.6 45.493 3.6 42.4V5.6C3.6 2.507 6.157 0 9.312 0z"></path>
        <g filter="url(#filter0_d_7462_79339)">
          <path
            fill="#fff"
            fillOpacity="0.24"
            d="M42.355 14.734a.5.5 0 0 1-.355.852h-7.2c-3.093 0-5.883-2.72-5.883-5.736V2.4a.5.5 0 0 1 .855-.352z"
            shapeRendering="crispEdges"></path>
        </g>
        <path
          fill="#fff"
          d="M19.28 19.188a1.875 1.875 0 0 0-1.867 1.866c0 1.274.708 2.854 1.453 4.34-.582 1.823-1.243 3.777-2.088 5.425-1.73.679-3.273 1.183-4.2 1.931l-.041.047a1.875 1.875 0 0 0 1.33 3.19c.5 0 .981-.186 1.33-.542l.035-.03c.682-.814 1.487-2.293 2.205-3.645 1.653-.65 3.385-1.312 5.057-1.71 1.22.984 2.986 1.634 4.44 1.634a1.875 1.875 0 0 0 1.866-1.866 1.875 1.875 0 0 0-1.867-1.867c-1.165 0-2.858.416-4.153.852a13.8 13.8 0 0 1-2.707-3.524c.495-1.525 1.074-3.051 1.074-4.235a1.875 1.875 0 0 0-1.867-1.866m0 1.12c.419 0 .747.327.747.746 0 .56-.3 1.592-.648 2.701-.464-1.079-.846-2.114-.846-2.7 0-.42.328-.747.747-.747m.32 6.387a15 15 0 0 0 1.938 2.462c-1.108.302-2.189.69-3.256 1.096.516-1.163.928-2.37 1.319-3.558m7.333 2.386c.42 0 .747.328.747.747a.74.74 0 0 1-.747.746c-.84 0-2.036-.38-2.992-.91 1.097-.31 2.294-.583 2.992-.583m-11.141 3.342c-.525.937-1.047 1.812-1.412 2.252a.7.7 0 0 1-.513.193.74.74 0 0 1-.747-.747c0-.197.084-.393.198-.52.438-.338 1.39-.744 2.474-1.178"></path>
      </g>
      <defs>
        <filter
          id="filter0_d_7462_79339"
          width="17.584"
          height="17.688"
          x="26.917"
          y="1.898"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="2"></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7462_79339"></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7462_79339"
            result="shape"></feBlend>
        </filter>
      </defs>
    </svg>
  )
}
