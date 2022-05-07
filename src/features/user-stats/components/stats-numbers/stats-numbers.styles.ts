import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: grid;
  font-size: 2rem;
  grid-template-areas:
    "date date"
    "average total";
  grid-gap: 2rem;
  justify-items: flex-start;

  color: var(--c-gray);
  margin-bottom: 2rem;
  cursor: default;
  user-select: none;

  @media screen and (min-width: ${TABLET_MIN_WIDTH}) {
    font-size: 4rem;
  }

  @media screen and (orientation: landscape) {
    font-size: 2rem;
  }
`
