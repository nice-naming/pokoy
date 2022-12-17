import { StyledButton } from "shared/styles/app.styles"
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
    padding: 15rem 0;
  }
`
export const StyledStat = styled.span`
  display: flex;
  font-size: 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media screen and (hover: hover) {
    font-size: 2rem;
  }
`

export const StyledStatNumber = styled.span`
  font-size: 3rem;
  line-height: 1;
  color: var(--c-foreground);

  @media screen and (hover: hover) {
    font-size: 5rem;
  }
`

export const StyledDateRangeButton = styled(StyledButton)`
  font-size: 2rem;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 0.5rem 2rem;
  width: 50%;
  color: var(--c-foreground);
  border: 0.25rem solid var(--c-dark-gray);

  &::after {
    display: none;
  }
`
