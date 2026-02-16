export default function FreightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.435 3.085a1 1 0 1 0-.703 1.873l2.486.932 3.972 7.944a2.14 2.14 0 0 1 1.789-.894L5.831 4.645a1 1 0 0 0-.543-.49zm8.741 10.254a2.14 2.14 0 0 1 .894 1.789l6.155-3.078a1 1 0 0 0-.894-1.789z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M12.45 14.643a1.975 1.975 0 1 1-3.95 0 1.975 1.975 0 0 1 3.95 0Z"
      ></path>
      <rect
        width="7.5"
        height="7.5"
        x="7.75"
        y="4.666"
        fill="currentColor"
        rx="1"
        transform="rotate(-27 7.75 4.666)"
      ></rect>
    </svg>
  )
}
