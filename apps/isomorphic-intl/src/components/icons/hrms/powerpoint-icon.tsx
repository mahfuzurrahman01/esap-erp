export default function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
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
          fill="#F56B36"
          d="M27.972 0a2 2 0 0 1 1.414.585l14.428 14.417a2 2 0 0 1 .586 1.415V42.4c0 3.093-2.557 5.6-5.712 5.6H9.312C6.157 48 3.6 45.493 3.6 42.4V5.6C3.6 2.507 6.157 0 9.312 0z"></path>
        <g filter="url(#filter0_d_7615_53304)">
          <path
            fill="#fff"
            fillOpacity="0.24"
            d="M42.355 14.734a.5.5 0 0 1-.355.852h-7.2c-3.093 0-5.883-2.72-5.883-5.736V2.4a.5.5 0 0 1 .855-.352z"
            shapeRendering="crispEdges"></path>
        </g>
        <path
          fill="#fff"
          d="M19.792 20.422a7.792 7.792 0 1 0 0 15.585 7.795 7.795 0 0 0 7.795-7.795h-7.795z"
          opacity="0.48"></path>
        <path
          fill="#fff"
          d="M21.006 19.203v7.794h7.792a7.79 7.79 0 0 0-7.792-7.794"></path>
      </g>
      <defs>
        <filter
          id="filter0_d_7615_53304"
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
            result="effect1_dropShadow_7615_53304"></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7615_53304"
            result="shape"></feBlend>
        </filter>
      </defs>
    </svg>
  )
}
