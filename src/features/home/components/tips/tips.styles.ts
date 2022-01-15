import styled from "styled-components/macro"

export const Wrapper = styled.span`
  font-size: 2rem;
  color: var(--c-extra-gray);
  margin-bottom: 0;
  cursor: default;
  margin-top: 3rem;
`

interface Props {
  stage: number
}

export const StageWrapper = styled.span<Props>`
  margin: 0;
`
