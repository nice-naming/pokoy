import styled from "styled-components/macro"
import {
  INIT_STROKE_DASHARRAY,
  START_SPIRAL_OFFSET,
} from "./fib-spiral.constants"

interface StyledProps {
  offset: number
}

export const Wrapper = styled.div<StyledProps>`
  width: 100%;

  & > svg {
    width: 100%;
    aspect-ratio: 1;
    display: block;
  }

  & .spiral-path {
    filter: ${({ color }) => `drop-shadow(0 0 8px ${color})`};
    stroke-width: ${({ offset }) =>
      offset > START_SPIRAL_OFFSET ? "1rem" : "0rem"};
    stroke-dashoffset: ${({ offset }) => offset};
    color: ${({ color }) => color};
    stroke-dasharray: ${INIT_STROKE_DASHARRAY};
    opacity: 1;
    will-change: stroke-dashoffset, stroke-dasharray, stroke, color, opacity;
    transition-property: stroke-dashoffset, stroke-width, stroke, opacity;
    transition-duration: 1s, 2s, 3s, 0.2s;
    transition-timing-function: linear, linear, linear, ease-in;
  }

  & .spiral-path-empty {
    opacity: 0;
  }
`
