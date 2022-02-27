import styled from "styled-components/macro"

export const SwipeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  background-color: transparent;
  color: var(--c-extra-gray);
  transition: none;
  padding: 1rem 2rem;
  margin: 1rem;
  transform: translateX(-50%);
  margin-bottom: 7rem;
  border-radius: 3rem;
  transition: transform ease-out 0.1s;

  &:active {
    transform: translateX(-50%) scale(0.9);
  }
`

interface Props {
  isActive: boolean
}

export const Circle = styled.span<Props>`
  aspect-ratio: 1;
  width: 1.5rem;
  border-radius: 50%;
  margin: 1rem;
  display: block;
  border: 0.25rem solid var(--c-extra-gray);
  background-color: ${({ isActive }) =>
    isActive ? "var(--c-foreground)" : "transparent"};
`
