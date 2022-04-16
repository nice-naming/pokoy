import styled from "styled-components/macro"
import {
  INIT_STROKE_DASHARRAY,
  MAX_SPIRAL_VALUE,
  START_SPIRAL_OFFSET,
} from "./fib-spiral.constants"

interface StyledProps {
  progress: number
}

export const StyledSvg = styled.svg<StyledProps>`
  transform: ${({ progress }) => {
    const progressPercent = progress / MAX_SPIRAL_VALUE
    return `rotate(${progressPercent}turn)`
  }};
  transform-origin: 50% 50%;
  transition: transform 1s linear;
  width: 100%;
  aspect-ratio: 1;
  display: block;
`

interface StyledSpiralPathProps {
  offset: number
  isEmpty: boolean
}

export const StyledSpiralPath = styled.path<StyledSpiralPathProps>`
  filter: ${({ color }) => `drop-shadow(0 0 8px ${color})`};
  stroke-width: ${({ offset }) => {
    const isStarted = offset > START_SPIRAL_OFFSET
    return isStarted ? "1rem" : "0rem"
  }};
  opacity: ${({ isEmpty }) => (isEmpty ? 0 : 1)};
  stroke-dashoffset: ${({ offset }) => offset};
  color: ${({ color }) => color};
  stroke-dasharray: ${INIT_STROKE_DASHARRAY};

  will-change: stroke-dasharray, stroke-dashoffset, opacity, color;
  transition: stroke-dashoffset 1s linear, stroke-width 2s linear,
    opacity 0.15s ease-out, color 3s ease-in 0.5s;
`
