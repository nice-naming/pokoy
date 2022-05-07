import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20vh 0;

  @media screen and (orientation: landscape) {
    padding: 4rem 0;
  }

  @media screen and (pointer: fine) {
    padding: 18rem 0;
  }
`

export const StyledStatNumber = styled.span`
  font-size: 1.5em;
  line-height: 1;
  color: var(--c-foreground);

  @media screen and (pointer: fine) {
    font-size: 3em;
  }
`

export const StyledStat = styled.span`
  display: flex;
  font-size: 0.8em;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media screen and (pointer: fine) {
    font-size: 1em;
  }
`
