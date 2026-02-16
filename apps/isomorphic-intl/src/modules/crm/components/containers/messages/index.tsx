"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"

import { useCurrentUser } from "@/hooks/auth/use-auth"
import {
  useCreateMessage,
  useMessageDetailsList,
  useMessageList,
} from "@/modules/crm/hooks/use-message"
import { pusherClient } from "@/utils/pusher"

import Conversation from "./conversation"
import MessageList from "./message-list"

export default function MessageContainer() {
  const { data:log, isLoading } = useMessageList()
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const { mutateAsync: createMessage } = useCreateMessage()
  const [messages, setMessages] = useState<any[]>([])
  const searchParams = useSearchParams()
  const tempCustomerId = searchParams.get("customerId")
  const [customerId, setCustomerId] = useState<string>(tempCustomerId ?? "")
  const messageList = log?.data || []
  const { user } = useCurrentUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: details,
    isLoading: isDetailsLoading,
    refetch: fetchMessageDetails,
  } = useMessageDetailsList({
    id: selectedContact?.id ?? 0,
    page: currentPage,
    pageSize: 10,
  })

  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const loadMoreMessages = () => {
    if (isLoadingMore || !selectedContact?.id) return
    setIsLoadingMore(true)
    fetchMessageDetails()
      .finally(() => setIsLoadingMore(false))
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop === 0;
    if (top) {
      loadMoreMessages();
    }
  };
  
  useEffect(() => {
    const channel = pusherClient.subscribe('chat-channel')
    channel.bind('new-message', (data: { message: string, sender: string, receiver: string, createdAt: string }) => {
      if (selectedContact?.createdBy == user?.email || selectedContact?.customerId == user?.id) {
        // console.log("New message received:", data)
        setSelectedContact((prevContact: any) => ({
          ...prevContact,
          messageDetails: prevContact.messageDetails ? [
            ...prevContact.messageDetails,
            {
              messageContent: data.message,
              createdBy: user?.email,
              sender: data.sender,
              createdAt: new Date().toISOString(),
              messageId: selectedContact.id
            },
          ]:[{
            messageContent: data.message,
            createdBy: user?.email,
            sender: data.sender,
            createdAt: new Date().toISOString(),
            messageId: selectedContact.id
          }],
        }))
      }
    })
    return () => {
      pusherClient.unsubscribe('chat-channel')
    }
  }, [selectedContact, user])

  // console.log("messageList", messageList)
  // console.log("selectedContact", selectedContact)

  useEffect(() => {
    if (details?.data && selectedContact) {
      setSelectedContact((prevContact: any) => {
        const existingMessages = prevContact?.messageDetails || []
        const newMessages = details.data.filter(
          (newMsg: any) =>
            !existingMessages.some(
              (existingMsg: any) =>
                existingMsg.id === newMsg.id && 
                existingMsg.createdAt === newMsg.createdAt
            )
        )
        if (newMessages.length > 0) {
          const sortedMessages = [...existingMessages, ...newMessages].sort(
            (a, b) => a.shortOrder - b.shortOrder
          );
          return {
            ...prevContact,
            messageDetails: sortedMessages,
          }
        }
        return prevContact
      })
    }
  }, [details])

  useEffect(() => {
    if (selectedContact) {
      setMessages(selectedContact.messageDetails || [])
    }
  }, [selectedContact])

  useEffect(() => {
    if (customerId && messageList) {
      const contact = messageList.find((item) => item.customerId == customerId && item.createdBy == user?.email)
      console.log("contact", contact)
      if (contact) {
        setSelectedContact(contact)
      } else {
        createMessage({
          Name: user?.name,
          CustomerId: customerId,
          UserId: user?.id,
          Online: true,
          createdAt: new Date().toISOString(),
        })
      }
    }
  }, [customerId, messageList, user])

  useEffect(() => {
    if (selectedContact?.id) {
      fetchMessageDetails()
    }
  }, [selectedContact?.id, fetchMessageDetails])

  return (
    <div className="card-shadow !rounded-2xl mb-9 grid grid-cols-5">
      <MessageList
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        isLoading={isLoading}
        data={messageList}
        setCustomerId={setCustomerId}
      />
      <Conversation
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        messages={messages}
        setMessages={setMessages}
        handleScroll={handleScroll}
        isLoadingMore={isLoadingMore}
        messagesEndRef={messagesEndRef}
        isDetailsLoading={isDetailsLoading}
      />
    </div>
  )
}
