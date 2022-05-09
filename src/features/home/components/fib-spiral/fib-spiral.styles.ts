import styled, { keyframes, css } from "styled-components/macro"
import {
  INIT_STROKE_DASHARRAY,
  START_SPIRAL_OFFSET,
} from "./fib-spiral.constants"

const spinning = keyframes`
  0% {
    transporm: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const animationMixin = (props: any) => {
  return css`
    ${props.progress > 0 ? spinning : "none"};
  `
}

interface StyledProps {
  progress: number
}

export const StyledSvg = styled.svg<StyledProps>`
  animation-name: ${animationMixin};
  animation-duration: 60s;
  /* animation-timing-function: cubic-bezier(.4,.4,.5,.8); */
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
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

  will-change: stroke-dashoffset;
  transition: //
    stroke-dashoffset 1s linear,
    //
    stroke-width 2s linear,
    //
    opacity 0.15s ease-out,
    //
    color 3s ease-in 0.5s;
`

interface StyledSpiralBackgroundProps {
  stillLoading: boolean
}

export const StyledSpiralBackground = styled.path<StyledSpiralBackgroundProps>`
  stroke: ${({ stillLoading }) => (stillLoading ? "white" : "var(--c-spiral)")};
  stroke-width: ${({ stillLoading }) => (stillLoading ? "3rem" : "1rem")};
  transform: ${({ stillLoading }) =>
    stillLoading ? "translateY(3rem)" : "translateX(0)"};
  transition: all 0.5s ease-out;
`
