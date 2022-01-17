import styled from "styled-components/macro"
import { MAX_SPIRAL_VALUE, START_SPIRAL_OFFSET } from "./fib-spiral.constants"

interface StyledProps {
  offset: number
}

export const Wrapper = styled.div<StyledProps>`
  & .progress-path {
    stroke-width: ${({ offset }) =>
      offset > START_SPIRAL_OFFSET ? "1.5rem" : "0rem"};
    stroke-dashoffset: ${({ offset }) => offset};
    color: ${({ color }) => color};
    stroke-dasharray: ${MAX_SPIRAL_VALUE};
    will-change: stroke-dashoffset, stroke-dasharray, stroke, color;
    transition-property: stroke-dashoffset, stroke-width, stroke;
    transition-duration: 1s, 2s, 3s;
    transition-timing-function: linear;
  }
`
