import React from "react"

import cn from "@core/utils/class-names"

type Props = React.SVGProps<SVGSVGElement>

export const CameraIcon = ({ className, ...props }: Props) => (
  <svg
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-8 w-8", className)}
    {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.5 14.167a1 1 0 011 1v1.666h1.667a1 1 0 010 2H17.5V20.5a1 1 0 01-2 0v-1.667h-1.667a1 1 0 010-2H15.5v-1.666a1 1 0 011-1z"
      clipRule="evenodd"></path>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.537 28.5h5.926c4.161 0 6.242 0 7.737-.98a5.877 5.877 0 001.635-1.605c.998-1.467.998-3.51.998-7.596 0-4.087 0-6.13-.998-7.596A5.877 5.877 0 0027.2 9.117c-.96-.63-2.163-.856-4.004-.936-.879 0-1.635-.653-1.807-1.5a2.752 2.752 0 00-2.71-2.18H14.32c-1.317 0-2.452.912-2.71 2.18-.172.847-.928 1.5-1.807 1.5-1.84.08-3.043.307-4.004.936-.645.423-1.2.969-1.633 1.606-1 1.466-1 3.51-1 7.596 0 4.085 0 6.128.998 7.596.432.634.987 1.18 1.635 1.605 1.495.98 3.576.98 7.737.98zm8.296-10.667a5.333 5.333 0 11-10.666 0 5.333 5.333 0 0110.666 0zm2.667-5a1 1 0 000 2h1.333a1 1 0 000-2H24.5z"
      clipRule="evenodd"></path>
  </svg>
)
