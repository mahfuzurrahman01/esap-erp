// messages.tsx

export const messages: {
  id: string
  name: string
  message: string
  online: boolean
  datetime: string
  customerId?: string
  supplierId?: string
  userId?: string
}[] = [
  {
    id: "dsgvdbnn-r4tg5r",
    name: "Jayvion Simon",
    message: "You: How To Boost...",
    datetime: "3 days",
    online: false,
  },
  {
    id: "dsgvdbnn-r4tg6r",
    name: "Lucian Obrien",
    message: "How To Boost Traffic...",
    datetime: "1 hour",
    online: false,
  },
  {
    id: "dsgvdbnn-r4tg7r",
    name: "Deja Brady",
    message: "Internet Banner...",
    datetime: "10 hours",
    online: false,
  },
  {
    id: "dsgvdbnn-r4tg8r",
    name: "Harrison Stein",
    message: "Free Real Estate...",
    datetime: "3 days",
    online: true,
  },
]

export const messageDetails: {
  id: string
  messageId: string
  text: string
  sender: string
  datetime: string
}[] = [
  {
    id: "1dsgvdbnn-r4tg0r",
    messageId: "dsgvdbnn-r4tg5r",
    text: "Hello! How are you?",
    sender: "contact",
    datetime: "4:02 PM",
  },
  {
    id: "2dsgvdbnn-r4tg0r",
    messageId: "dsgvdbnn-r4tg5r",
    text: "I'm fine, thanks! How about you?",
    sender: "user",
    datetime: "4:03 PM",
  },
  {
    id: "3dsgvdbnn-r4tg0r",
    messageId: "dsgvdbnn-r4tg6r",
    text: "How's the project going?",
    sender: "contact",
    datetime: "10:02 AM",
  },
  {
    id: "4dsgvdbnn-r4tg0r",
    messageId: "dsgvdbnn-r4tg6r",
    text: "It's progressing well!",
    sender: "user",
    datetime: "10:05 AM",
  },
  {
    id: "5dsgvdbnn-r4tg0r",
    messageId: "dsgvdbnn-r4tg7r",
    text: "Do you need help with the report?",
    sender: "contact",
    datetime: "1:00 PM",
  },
  {
    id: "6dsgvdbnn-r4tg0r",
    messageId: "dsgvdbnn-r4tg7r",
    text: "Yes, that would be great!",
    sender: "user",
    datetime: "1:10 PM",
  },
  {
    id: "7dsgvdbnn-r4tg0r",
    messageId: "dsgvdbnn-r4tg8r",
    text: "Meeting is rescheduled to tomorrow.",
    sender: "contact",
    datetime: "8:30 AM",
  },
  {
    id: "8dsgvdbnn-r4tg0r",
    messageId: "dsgvdbnn-r4tg8r",
    text: "Got it, thanks!",
    sender: "user",
    datetime: "8:35 AM",
  },
]
