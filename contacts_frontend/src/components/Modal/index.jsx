import { Overlay, Container, Footer } from "./styles"
import {createPortal} from 'react-dom'

import Button from '../Button'

export default function Modal({
  cancelLabel='Cancelar',
  confirmLabel='Confirmar',
  danger,
  title,
  children,
  onCancel,
  onConfirm,
  visible,
  isLoading=false
}) {
  if (!visible) {
    return
  }

  return createPortal(
    <Overlay>
      <Container danger={$danger}>
        <h1>{title}</h1>

        <div className="modal-body">
          {children}
        </div>

        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </button>
          <Button type="button" onClick={onConfirm} danger={danger} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  )
}

