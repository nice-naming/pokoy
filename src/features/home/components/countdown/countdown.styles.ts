import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components"

export const StyledCountdown = styled.span`
  margin: 0;
  font-family: var(--font-mono);
  font-size: 6rem;
  line-height: 1;
  cursor: help;
  color: var(--c-foreground);

  /* TODO: add breakpoint to css vars */
  @media screen and (max-width: ${TABLET_MIN_WIDTH}) {
    margin: 0;
  }
`
