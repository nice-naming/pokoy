import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  /* // TODO: extract breakpoints to constants */
  @media screen and (min-width: ${TABLET_MIN_WIDTH}) {
    .bottom-text {
      font-size: 4rem;
    }
  }
`

export const TopTextWrapper = styled.p`
  margin: 0;
  margin-bottom: 1.5em;
`
