import * as React from "react"

const BackgroundSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1920"
    height="696"
    fill="none"
    viewBox="0 0 1920 696"
    {...props}>
    <path
      fill="url(#paint0_linear_7366_190371)"
      d="M1545 494c-117.2-57.2-647.5-23.833-898 0-160.4 57.2-513.833 35.167-670.5 17v-827H133c220 2.333 664.8 5.6 684 0 24-7 1082-57.5 1167-57.5S2089.5 453 2082.5 494s-207.5 20.5-153 129.5c43.6 87.2-47.5 77-98.5 61-46.5-39.667-168.8-133.3-286-190.5"></path>
    <defs>
      <linearGradient
        id="paint0_linear_7366_190371"
        x1="1240"
        x2="1115"
        y1="9.5"
        y2="436"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#F8E2EE"></stop>
        <stop offset="1" stopColor="#F8B1DE"></stop>
      </linearGradient>
    </defs>
  </svg>
)

export default BackgroundSvg
