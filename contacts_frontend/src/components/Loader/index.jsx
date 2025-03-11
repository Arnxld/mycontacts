import { Overlay } from "./styles";
import { createPortal } from "react-dom";

export default function Loader({ isLoading }) {
  if(!isLoading) {
    return null
  }

  return createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>
    ,
    document.getElementById('loader-root')
  )
}
