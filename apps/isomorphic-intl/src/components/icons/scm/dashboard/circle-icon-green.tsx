import * as React from "react"

export default function CircleIconGreen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="137"
      height="101"
      fill="none"
      viewBox="0 0 137 101"
      style={{ background: "transparent" }}
      {...props}>
      <g filter="url(#filter0_d_7284_197173)">
        <circle
          cx="62.25"
          cy="40.5"
          r="30"
          fill="#00A76F"
          fillOpacity="0.08"></circle>
        <path
          fill="#5BE49B"
          d="M43.357 59.393c-1.281 1.281-1.291 3.375.122 4.51a30 30 0 1 0 22.046-53.224c-1.802-.198-3.275 1.29-3.275 3.102 0 1.813 1.476 3.258 3.27 3.511a23.438 23.438 0 1 1-17.367 41.931c-1.448-1.09-3.514-1.112-4.796.17"></path>
        <path
          fill="#5BE49B"
          d="M55.48 39.14a1 1 0 0 0 1.41.13l4.36-3.63V47.5a1 1 0 0 0 2 0V35.64l4.36 3.63a1 1 0 1 0 1.28-1.54l-6-5-.15-.09-.13-.07a1 1 0 0 0-.72 0l-.13.07-.15.09-6 5a.997.997 0 0 0-.13 1.41"></path>
      </g>
      <defs>
        <filter
          id="filter0_d_7284_197173"
          width="148"
          height="148"
          x="-11.75"
          y="0.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="34"></feOffset>
          <feGaussianBlur stdDeviation="22"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0.356863 0 0 0 0 0.894118 0 0 0 0 0.607843 0 0 0 0.4 0"></feColorMatrix>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7284_197173"></feBlend>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_7284_197173"
            result="shape"></feBlend>
        </filter>
      </defs>
    </svg>
  )
}
