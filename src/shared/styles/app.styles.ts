import styled from "styled-components/macro"
import { TABLET_MIN_WIDTH } from "shared/constants"

export const AppWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;

  @media screen and (max-width: ${TABLET_MIN_WIDTH}) {
    & {
      padding: 0 4rem;
    }
  }
`

export const SwipeableView = styled.div`
  height: 100%;
  overflow: hidden;
`

export const StyledButton = styled.button`
  background-color: var(--c-darken-gray);
  font-size: inherit;
  color: inherit;
  cursor: pointer;
`
