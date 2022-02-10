import { RequestStatus } from "shared/types"
import styled from "styled-components/macro"

interface Props {
  requestStatus: RequestStatus
  isStarted: boolean
}

export const ButtonWrapper = styled.button<Props>`
  color: var(--c-extra-gray);

  padding: 0px;
  display: block;
  background-color: transparent;
  position: relative;
  border-radius: 50%;
  transition-property: color, transform;
  transition-duration: 0.3s;
  transition-timing-function: linear, ease-out;
  will-change: color, transform;
  z-index: 1;

  /* NOTE: pseudo-element for opaque button border with dinamic color */
  &:after {
    box-shadow: ${({ isStarted }) =>
      `0 0 0 ${isStarted ? "0.5rem" : "1rem"} currentcolor`};
    opacity: ${({ isStarted }) => (isStarted ? 0.3 : 0.6)};
    transition: box-shadow 0.3s ease-in;
    transform: scale(1);

    display: block;
    position: absolute;
    top: 0;
    content: "";
    width: 100%;
    height: 100%;
    color: inherit;
    border-radius: 50%;
  }
`
