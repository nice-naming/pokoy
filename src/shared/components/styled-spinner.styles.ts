import styled, { keyframes } from "styled-components"

const spinner = keyframes`
  0% { transform: rotate(0); border-bottom-color: var(--c-background); }
  33%,  66% { border-bottom-color: var(--c-foreground) }
  100% { transform: rotate(3600deg); border-bottom-color: var(--c-background); }
`

export const StyledSpinner = styled.div`
  width: 100%;
  min-width: 25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  background-color: var(--c-darken-gray);
  position: relative;

  &::after {
    content: "";
    display: block;

    animation: ${spinner} 13s linear infinite;

    width: 50%;
    aspect-ratio: 1;

    border-radius: 50%;
    border-width: 1.5rem;
    border-style: solid;
    border-color: var(--c-background);
  }
`
