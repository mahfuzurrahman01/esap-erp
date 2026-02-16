import { NextResponse } from "next/server"

import Pusher from "pusher"

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
})

export async function POST(request: Request) {
  const { message, sender, receiver, createdAt }: any = await request.json()

  await pusher.trigger("chat-channel", "new-message", {
    message,
    sender,
    receiver,
    createdAt
  })

  return NextResponse.json({ success: true })
}
