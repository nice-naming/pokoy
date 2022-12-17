import { StyledButton } from "shared/styles/app.styles"
import styled from "styled-components/macro"

export const StyledUpdateButton = styled(StyledButton)`
  font-size: 1rem;
  color: var(--c-foreground);
  border: 0.25rem solid var(--c-dark-gray);
  display: inline;
`

export const StyledAppVersion = styled(StyledButton)`
  color: var(--c-gray);
  padding: 0.5rem;
  font-size: 1rem;
`
