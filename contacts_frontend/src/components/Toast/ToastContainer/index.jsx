import { useCallback, useEffect, useState } from "react"
import { Container } from "./styles"

import { toastEventManager } from "../../../utils/toast"
import ToastMessage from "../ToastMessage"

export default function ToastContainer() {
  const [messages, setMessages]= useState([])

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration}
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () =>
      toastEventManager.removeListener('addtoast', handleAddToast)
  }, [])

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id
    ))
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          id={message.id}
          type={message.type}
          text={message.text}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  )
}