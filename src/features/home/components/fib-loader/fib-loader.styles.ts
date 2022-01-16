import styled, { keyframes } from "styled-components/macro"

const spinning = keyframes`
  from {
    opacity: 0;
    transform: rotate(0deg);
    box-shadow: 0 0 0 0 var(--c-gray);
  }
  
  100% {
    opacity: 1;
    transform: rotate(-360deg);
    box-shadow: 0 0 0 1rem var(--c-gray);
  }
`

interface Props {
  stillLoading: boolean
}

export const Wrapper = styled.div<Props>`
  /* NOTE: opacity transition for fading off after appearance in animation */
  opacity: ${({ stillLoading }) => (stillLoading ? 1 : 0)};
  z-index: ${({ stillLoading }) => (stillLoading ? 2 : 0)};
  display: flex;
  transition: opacity 0.5s;
  will-change: opacity, z-index;
  background-color: var(--c-background);

  align-items: center;
  justify-content: center;

  overflow: hidden;
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 1rem;

  & .progress-spiral {
    animation-name: ${spinning};
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;

    background: var(--c-background);
    border-radius: 50%;
    padding: 0px;
  }
`
