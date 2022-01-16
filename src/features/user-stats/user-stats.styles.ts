import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const StyledStatNumber = styled.span`
  font-size: 3rem;
  line-height: 1;
  color: var(--c-foreground);

  @media screen and (min-width: ${TABLET_MIN_WIDTH}) {
    font-size: 6rem;
  }
`

export const StyledStat = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`
