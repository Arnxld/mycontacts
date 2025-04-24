import Spinner from "../Spinner";
import { StyledButton } from "./styles";

export default function Button({ children, isLoading=false, type='button', disabled=false, danger, onClick=undefined }) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading} danger={danger} onClick={onClick}>
      {!isLoading && children}
      {isLoading && <Spinner size={16}/>}

    </StyledButton>
  )
}