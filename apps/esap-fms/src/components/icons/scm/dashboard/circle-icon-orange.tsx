import * as React from "react";

export default function CircleIconOrange(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="137"
      height="101"
      fill="none"
      viewBox="0 0 137 101"
      style={{ background: "transparent" }}
      {...props}>
    <g filter="url(#filter0_d_7285_204012)">
      <circle
        cx="62.75"
        cy="40.5"
        r="30"
        fill="#FF5630"
        fillOpacity="0.08"
      ></circle>
      <path
        fill="#FF5630"
        d="M43.857 21.607c-1.281-1.281-3.375-1.291-4.51.122a30 30 0 1 0 26.678-11.05c-1.801-.198-3.275 1.29-3.275 3.102 0 1.813 1.476 3.258 3.271 3.511a23.436 23.436 0 1 1-21.994 9.11c1.09-1.447 1.112-3.513-.17-4.795"
      ></path>
      <path
        fill="#FF5630"
        d="M55.98 39.14a1 1 0 0 0 1.41.13l4.36-3.63V47.5a1 1 0 0 0 2 0V35.64l4.36 3.63a1 1 0 0 0 1.596-.473 1 1 0 0 0-.316-1.067l-6-5-.15-.09-.13-.07a1 1 0 0 0-.72 0l-.13.07-.15.09-6 5a1 1 0 0 0-.13 1.41"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_d_7285_204012"
        width="148"
        height="148"
        x="-11.25"
        y="0.5"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="34"></feOffset>
        <feGaussianBlur stdDeviation="22"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.975 0 0 0 0 0.310991 0 0 0 0 0.161687 0 0 0 0.3 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_7285_204012"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_7285_204012"
          result="shape"
        ></feBlend>
        </filter>
      </defs>
    </svg>
  )
}
