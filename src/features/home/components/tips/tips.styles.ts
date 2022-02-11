import styled from "styled-components/macro"

export const Wrapper = styled.span`
  color: var(--c-gray);
  cursor: default;
  margin-bottom: 0;
  margin-top: 3rem;

  display: grid;
  grid-template-areas: "current t next";
  grid-gap: 2rem;
  justify-items: center;
  justify-content: center;
  align-items: center;
`

export const StyledTip = styled.span`
  line-height: 3;
`

export const StageWrapper = styled.div`
  grid-template-areas:
    "number description"
    "number description";
  grid-template-columns: min-content auto;
  grid-column-gap: 1rem;
  display: grid;
  width: 100%;
  font-size: 2rem;
  line-height: 1.5;
  text-align: left;
  align-items: center;
`

export const StageNumber = styled.span`
  grid-row: 1 / 3;
  grid-area: number;
  font-size: 5rem;
  line-height: 1;
`

export const StyledUnits = styled.span`
  align-self: end;
`

export const StyledDesc = styled.span`
  align-self: start;
`
