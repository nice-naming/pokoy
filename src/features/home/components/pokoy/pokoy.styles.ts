import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: grid;
  max-height: 100%;
  height: 100%;
  grid-template-rows: 1fr auto min-content 1fr;
  grid-template-areas:
    "countdown"
    "spiral"
    "tips"
    "updater";
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @media screen and (orientation: landscape) and (hover: none) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 2rem;
    column-gap: 4rem;
    grid-template-areas:
      "countdown spiral"
      "tips spiral";
  }
`

export const TopTextWrapper = styled.p`
  grid-area: countdown;
  margin: 3rem 0;
  margin-top: 6rem;
  align-self: flex-end;

  @media screen and (hover: none) and (orientation: landscape) {
    margin: 0;
    align-self: flex-end;
    justify-self: center;
  }
`

export const BottomTextWrapper = styled.p`
  grid-area: tips;
  margin: 0;
  margin-top: 3rem;
  /* margin: 3rem 0; */
  /* margin-bottom: 6rem; */

  @media screen and (hover: none) and (orientation: landscape) {
    margin: 0;
    align-self: flex-start;
    justify-self: center;
  }
`
