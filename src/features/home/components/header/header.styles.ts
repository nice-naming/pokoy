import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components/macro"

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--c-gray);
  font-size: 1.5rem;
  padding: 0 4rem;

  @media screen and (min-width: ${TABLET_MIN_WIDTH}) {
    padding: 0;
  }
`
