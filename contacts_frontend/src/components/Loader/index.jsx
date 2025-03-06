import { Overlay } from "./styles";
import { createPortal } from "react-dom";

export default function Loader() {
  return createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>
    ,
    document.getElementById('loader-root')
  )
}
