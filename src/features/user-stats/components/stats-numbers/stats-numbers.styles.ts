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

  @media screen and (hover: hover) {
    font-size: 4rem;
  }

  @media screen and (hover: none) and (orientation: landscape) {
    font-size: 2rem;
  }
`
