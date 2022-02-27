import { AppWrapper } from "shared/styles/app.styles"
import styled from "styled-components"

export const AboutPageWrapper = styled(AppWrapper)`
  flex-direction: column;
`

export const StyledImg = styled.img`
  width: 50%;
  margin: auto;
  pointer-events: none;
  filter: contrast(1.1);
  border-radius: 2rem;
`
