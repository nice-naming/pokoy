import styled from "styled-components"

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "date date"
    "average total";
  grid-gap: 2rem;
  justify-items: flex-start;

  color: var(--c-extra-gray);
  margin-bottom: 2rem;
  cursor: default;
  user-select: none;
`
