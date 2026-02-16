"use client"

import { useCallback, useMemo, useState } from "react"

import cn from "@core/utils/class-names"
import dayjs from "dayjs"
import { Calendar, dayjsLocalizer } from "react-big-calendar"

import { useColorPresetName } from "@/layouts/settings/use-theme-color"
import { CalendarEvent } from "@/modules/crm/types/meeting"

import MeetingDrawerView from "./drawer-view"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useRouter } from "next/navigation"
import { routes } from "@/config/routes"
import { useMeetingList } from "@/modules/crm/hooks/use-meeting"
import CustomToolbar from "./calendar-toolbar"
import { calendarBorderClassName, calendarDayBgClassName, calendarHeaderClassName, calendarTextClassName, calendarToolbarClassName, rtcEventClassName, rtcEventContentClassName } from "./meeting-css"

const localizer = dayjsLocalizer(dayjs)

export default function EventCalendarView() {
  const router = useRouter()
  const { data } = useMeetingList()
  const { openDrawer } = useDrawer()
  const events = useMemo(
    () =>
      data?.data.filter((meeting: any) => meeting.title).map((meeting: any) => ({
        start: dayjs(meeting.meetingDate).toDate(),
        end: dayjs(meeting.meetingDate).toDate(),
        title: meeting?.title,
        id: meeting?.id
      })),
    [data]
  )
  const { colorPresetName } = useColorPresetName()
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<any>("month")

  const handleSelectSlot =  ({ start, end }: { start: Date; end: Date }) => {
    const startDate = start.toISOString();
    router.push(`${routes.crm.createMeeting}?meetingTime=${startDate}`);
  }

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      openDrawer({
        view: <MeetingDrawerView id={event.id!} />,
        placement: "right",
        containerClassName: "lg:min-w-[500px] dropdown-gr",
      })
    },
    [openDrawer]
  )

  const { views, scrollToTime, formats } = useMemo(
    () => ({
      views: {
        month: true,
        week: true,
        day: true,
        agenda: true,
      },
      scrollToTime: new Date(2023, 10, 27, 6),
      formats: {
        dateFormat: "D",
        weekdayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, "ddd", culture),
        dayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, "ddd M/D", culture),
        timeGutterFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, "hh A", culture),
      },
    }),
    []
  )
  
  return (
    <Calendar
      localizer={localizer}
      events={events}
      views={views}
      onNavigate={(newDate) => setDate(newDate)}
      date={date}
      view={view}
      onView={(newView) => setView(newView)}
      formats={formats}
      startAccessor="start"
      components={{
        toolbar: CustomToolbar,
      }}
      endAccessor="end"
      dayLayoutAlgorithm="no-overlap"
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      selectable
      scrollToTime={scrollToTime}
      className={cn(
        "h-[77vh]",
        calendarToolbarClassName,
        calendarTextClassName,
        calendarHeaderClassName,
        calendarDayBgClassName,
        calendarBorderClassName,
        rtcEventContentClassName,
        colorPresetName === "black" && rtcEventClassName,
        "meeting-calendar crm-event-calendar"
      )}
    />
  )
}
