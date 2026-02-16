"use client"

import Image from "next/image"

import avatar from "@public/auth/avatar.webp"

import { useCurrentUser } from "@/hooks/auth/use-auth"

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 18) return "Good Afternoon"
  return "Good Evening"
}

export default function Intro() {
  const { user } = useCurrentUser()
  
  return (
    <div className="col-span-full flex items-center gap-4">
      <Image
        src={user?.image || avatar}
        alt="user"
        width={96}
        height={96}
        className="rounded-full"
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold @4xl:text-5xl">
          Hello <span className="text-red">{user?.name}</span>,{" "}
          {getTimeBasedGreeting()!}
        </h1>
        <p className="font-bold text-gray-500 @4xl:text-xl">
          Here is your dashboard overview
        </p>
      </div>
    </div>
  )
}
