import React from "react"
import { FibSpiral } from "../fib-spiral/fib-spiral.component"
import { Wrapper } from "./fib-loader.styles"

type Props = {
  stillLoading: boolean
}

export const FibLoader: React.FC<Props> = ({ stillLoading = false }) => {
  return (
    <Wrapper stillLoading={stillLoading}>
      <FibSpiral seconds={0} />
    </Wrapper>
  )
}
