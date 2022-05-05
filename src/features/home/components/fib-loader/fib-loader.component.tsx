import React from "react"
import { FibSpiral } from "../fib-spiral/fib-spiral.component"
import { PATH_TO_DRAWN } from "../fib-spiral/fib-spiral.constants"
import { StyledSpiralPath } from "../fib-spiral/fib-spiral.styles"
import { Wrapper } from "./fib-loader.styles"

type Props = {
  stillLoading: boolean
}

export const FibLoader: React.FC<Props> = ({ stillLoading = false }) => {
  return (
    <Wrapper stillLoading={stillLoading}>
      <FibSpiral seconds={0} color="white" width="3rem" />
    </Wrapper>
  )
}
