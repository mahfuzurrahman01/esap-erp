import * as React from "react"

export default function CircleIconPurple(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="137"
      height="101"
      fill="none"
      viewBox="0 0 137 101"
      style={{ background: "transparent" }}
      {...props}>
      <g filter="url(#filter0_d_7285_203684)">
        <circle
          cx="62.75"
          cy="40.5"
          r="30"
          fill="#8E33FF"
          fillOpacity="0.08"></circle>
        <path
          fill="#8C4BF6"
          d="M85.889 53.86c1.57.905 3.595.373 4.324-1.286a30 30 0 0 0-23.415-41.8c-1.796-.244-3.308 1.205-3.355 3.017s1.392 3.295 3.179 3.594a23.438 23.438 0 0 1 17.862 31.886c-.678 1.68-.165 3.682 1.405 4.588M55.98 39.14a1 1 0 0 0 1.41.13l4.36-3.63V47.5a1 1 0 0 0 2 0V35.64l4.36 3.63a1 1 0 1 0 1.28-1.54l-6-5-.15-.09-.13-.07a1 1 0 0 0-.72 0l-.13.07-.15.09-6 5a.997.997 0 0 0-.13 1.41"></path>
      </g>
      <defs>
        <filter
          id="filter0_d_7285_203684"
          width="148"
          height="148"
          x="-11.25"
          y="0.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
          <feOffset dy="34"></feOffset>
          <feGaussianBlur stdDeviation="22"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0.54902 0 0 0 0 0.294118 0 0 0 0 0.964706 0 0 0 0.3 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7285_203684"></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7285_203684"
            result="shape"></feBlend>
        </filter>
      </defs>
    </svg>
  )
}
