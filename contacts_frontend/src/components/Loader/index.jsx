import { createPortal } from "react-dom";

import { Overlay } from "./styles";

import Spinner from '../Spinner'

export default function Loader({ isLoading }) {
  if(!isLoading) {
    return null
  }

  return createPortal(
    <Overlay>
      <Spinner size={90}/>
    </Overlay>
    ,
    document.getElementById('loader-root')
  )
}
