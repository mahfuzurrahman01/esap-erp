export default function AssetsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="currentColor"
        d="M6 21a2.653 2.653 0 0 1-3-3V6a2.652 2.652 0 0 1 3-3h8a2.652 2.652 0 0 1 3 3v13a2 2 0 0 0 2 2z"
        opacity="0.3"></path>
      <path
        fill="currentColor"
        d="M17 10h2.5a1.5 1.5 0 0 1 1.5 1.5V19a2.015 2.015 0 0 1-2 2 2.006 2.006 0 0 1-2-2zM13 14.75H7a.75.75 0 1 1 0-1.5h6a.75.75 0 1 1 0 1.5M13 11.75H7a.75.75 0 1 1 0-1.5h6a.75.75 0 0 1 0 1.5M10 17.75H7a.75.75 0 1 1 0-1.5h3a.75.75 0 1 1 0 1.5"></path>
      <rect width="4" height="4" x="6" y="5" fill="currentColor" rx="1"></rect>
    </svg>
  )
}
