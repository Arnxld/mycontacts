import { Container } from "./styles";

import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'

export default function ToastMessage({ text, type="default" }) {
  return (
    <Container type={type}>
      {type == "danger" && <img src={xCircleIcon} alt="X" />}
      {type == "success" && <img src={checkCircleIcon} alt="check" />}
      <strong>{text}</strong>
    </Container>
  )
}