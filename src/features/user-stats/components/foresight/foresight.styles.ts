import { StyledStatNumber } from "features/user-stats/user-stats.styles"
import styled from "styled-components/macro"

export const Wrapper = styled.div`
  width: 100%;
  grid-area: date;
  display: grid;
  grid-gap: 1rem;
`

export const StyledStatDate = styled(StyledStatNumber)`
  font-size: 4rem;
`

export const ProgressWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  & .progress-bar {
    height: 100%;
    width: 100%;
  }
`
