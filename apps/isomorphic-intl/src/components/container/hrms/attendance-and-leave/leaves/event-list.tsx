import Image from "next/image"

import { useTranslations } from "next-intl"

import { formatDate } from "@/utils/format-date"

type Props = {
  events: {
    dateFrom: string
    dateTo: string
    title: string
  }[]
}

const EventList = ({ events }: Props) => {
  const t = useTranslations("common")
  return (
    <div className="card-shadow rounded-2xl">
      <div className="5 divider-color typography-primary border-b px-5 py-2 text-lg font-semibold">
        {t("text-events")}
      </div>
      {events.map((event, index) => (
        <EventItem key={index} event={event} />
      ))}
    </div>
  )
}

export default EventList

type EventItemProps = {
  event: {
    dateFrom: string
    dateTo: string
    title: string
  }
}
const EventItem = ({ event }: EventItemProps) => {
  return (
    <div className="divider-color flex items-center gap-4 border-b border-dashed px-5 py-4 last-of-type:border-b-0">
      <div className="rounded-full bg-gray-500/20 p-2">
        <Image src={"/icons/event.svg"} alt="event" width={40} height={40} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="typography-primary text-sm font-semibold">
          {formatDate(event.dateFrom)} - {formatDate(event.dateTo)}
        </div>
        <p className="text-xs font-semibold">{event.title}</p>
      </div>
    </div>
  )
}
