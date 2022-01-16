import styled from "styled-components/macro"
import { MAX_SPIRAL_VALUE } from "./fib-spiral.constants"

interface StyledProps {
  progress: number
}

export const Wrapper = styled.div<StyledProps>`
  & .progress-path {
    stroke-dasharray: ${MAX_SPIRAL_VALUE};
    stroke-dashoffset: ${({ progress }) => progress};
    will-change: stroke-dashoffset, stroke-dasharray, stroke, color;
    transition-property: stroke-dashoffset, stroke-dasharray, stroke, color;
    transition-duration: 1s;
    transition-timing-function: linear;
    color: ${({ color }) => color};
  }
`
