import { StylesConfig } from "react-select"

export const calendarToolbarClassName =
  "[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 [@media(max-width:375px)]:[&_.rbc-btn-group:last-child_button]:!px-2.5 [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!bg-primary [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button:focus]:text-gray-900 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:text-gray-900 dark:[&_.rbc-toolbar_>_*:last-child_>_button:hover]:bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!bg-primary-dark [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:text-gray-900 [&_.rbc-toolbar]:py-4 [&_.rbc-toolbar_button]:border-0"

export const rtcEventClassName =
  "[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-event]:!text-white dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:focus]:!text-gray-0"

export const calendarTextClassName =
  "[&_.rbc-month-row]:text-black dark:[&_.rbc-month-row]:text-white [&_.rbc-date-cell]:text-black dark:[&_.rbc-date-cell]:text-white"

export const calendarHeaderClassName = `
  [&_[role="columnheader"]]:text-black dark:[&_[role="columnheader"]]:text-white
`

export const calendarBorderClassName = `
  [&_.rbc-event]:border-gray-200 
  [&_.rbc-time-view]:border-gray-200
  [&_.rbc-time-header-content]:border-gray-200
  [&_.rbc-time-content]:border-gray-200
  [&_.rbc-day-slot .rbc-time-slot + .rbc-time-slot]:border-gray-200
  [&_.rbc-timeslot-group]:border-gray-200
  [&_.rbc-time-slot]:border-gray-200
  [&_.rbc-month-row]:border-gray-200 
  [&_.rbc-header]:border-gray-200
  [&_.rbc-header]:bg-white
  [&_.rbc-day-bg]:border-gray-200
  [&_.rbc-btn-group]:border-gray-200 
  dark:[&_.rbc-event]:border-gray-700 
  dark:[&_.rbc-month-row]:border-gray-700 
  dark:[&_.rbc-header]:border-gray-700
  dark:[&_.rbc-header]:bg-gray-800
  dark:[&_.rbc-agenda-view]:bg-gray-800
  dark:[&_.rbc-day-bg]:border-gray-700
  dark:[&_.rbc-btn-group]:border-gray-700
  dark:[&_.rbc-time-view]:border-gray-700
  dark:[&_.rbc-time-header-content]:border-gray-700
  dark:[&_.rbc-time-content]:border-gray-700
  dark:[&_.rbc-day-slot .rbc-time-slot + .rbc-time-slot]:border-gray-700
  dark:[&_.rbc-timeslot-group]:border-gray-700
  dark:[&_.rbc-time-slot]:border-gray-700
`

export const rtcEventContentClassName = `
  [&_.rbc-event-content]:bg-[#e4ceff]
  dark:[&_.rbc-event-content]:bg-[#c2eadd] /* Dark Mode background */
  [&_.rbc-event]:bg-[#e4ceff]
  dark:[&_.rbc-event]:bg-[#c2eadd] /* Dark Mode event background */
  [&_.rbc-day-slot .rbc-background-event]:bg-[#e4ceff]
  dark:[&_.rbc-day-slot .rbc-background-event]:bg-[#c2eadd]
`

export const dropdownStyles: StylesConfig = {
  placeholder: (styles:any) => ({ ...styles, fontWeight: '200', color: '#bfc6ce' }),
  menuList: (base: any) => ({
    ...base,
    maxHeight: "160px",
    overflow: "auto",
  }),
}

export const calendarDayBgClassName = `dark:[&_.rbc-day-bg.rbc-off-range-bg]:bg-gray-900`