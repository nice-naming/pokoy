import { REQUEST_STATUS_TO_COLOR_MAP } from "shared/constants"
import { RequestStatus } from "shared/types"
import styled from "styled-components/macro"

interface Props {
  requestStatus: RequestStatus
  isStarted: boolean
}

export const ButtonWrapper = styled.button<Props>`
  color: ${({ requestStatus }) =>
    REQUEST_STATUS_TO_COLOR_MAP.get(requestStatus)};
  color: ${({ isStarted }) => isStarted && "var(--c-blue)"};

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
    box-shadow: 0 0 0 1rem currentcolor;
    transform: scale(1);

    display: block;
    position: absolute;
    top: 0;
    content: "";
    width: 100%;
    height: 100%;
    color: inherit;
    opacity: 0.3;
    border-radius: 50%;
  }
`
