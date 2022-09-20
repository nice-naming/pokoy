import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const SignInButton = styled.button`
  display: flex;
  background-color: var(--c-blue);
  margin: 1rem;
  padding: 1rem 4rem;
  align-items: center;
  justify-content: center;
  background-color: var(--c-darken-gray);
  border: 0.5rem solid var(--c-gray);
  width: 60%;
  color: var(--c-foreground);
  white-space: nowrap;

  &:before {
    border-radius: 50%;
  }

  svg {
    margin: 0 1rem;
    width: 3rem;
    aspect-ratio: 1;
    color: var(--c-foreground);
  }
`

export const StyledInfo = styled.span`
  margin: 0 0.5rem;
  color: var(--c-gray);
`
