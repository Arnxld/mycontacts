import { Overlay, Container, Footer } from "./styles"
import {createPortal} from 'react-dom'

import Button from '../Button'

export default function Modal({ $danger=false }) {
  return createPortal(
    <Overlay>
      <Container danger={$danger}>
        <h1>titulo do modal</h1>
        <p>
          corpo do modal
        </p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')

  )




}

