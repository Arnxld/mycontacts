import { Container } from "./styles";

import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'
import { useEffect } from "react";

export default function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {

    const timeoutId = setTimeout(() => onRemoveMessage(message.id), message.duration || 2000)

    return () => {
      clearTimeout(timeoutId)
    }

  }, [message])

  function handleRemoveToast() {
    onRemoveMessage(message.id)
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type == "danger" && <img src={xCircleIcon} alt="X" />}
      {message.type == "success" && <img src={checkCircleIcon} alt="check" />}
      <strong>{message.text}</strong>
    </Container>
  )
}