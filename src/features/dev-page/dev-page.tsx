import React, { useEffect } from "react"
import { CSS_COLOR_VARIABLES } from "shared/constants"
import styled from "styled-components/macro"

const Wrapper = styled.div`
  width: 100%;
  min-height: 20rem;
  display: flex;
`
export const DevPage = () => {
  useEffect(() => {}, [])

  return (
    <Wrapper>
      {Object.values(CSS_COLOR_VARIABLES).map((color) => (
        <div
          style={{
            color: "black",
            backgroundColor: `var(${color})`,
            margin: "1rem",
            padding: "1rem",
            width: "100px",
            aspectRatio: "1",
          }}
        >
          {color}
        </div>
      ))}
    </Wrapper>
  )
}
