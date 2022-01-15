import styled from "styled-components"

export const StyledCountdown = styled.span`
  margin: 0;
  font-family: monospace;
  font-size: 4rem;
  cursor: help;
  color: var(--c-foreground);

  /* TODO: add breakpoint to css vars */
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`
