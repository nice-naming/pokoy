import { useCallback } from "react"
import { auth } from "features/home/firebase-init"
import styled from "styled-components/macro"

// TODO: extract
const StyledButton = styled.button`
  background-color: transparent;
  padding-left: 0;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  height: 100%;

  @media screen and (orientation: landscape) {
    display: none;
  }
`

export const SignOut = () => {
  const signOut = useCallback(() => auth.signOut(), [])

  return (
    auth.currentUser && (
      <StyledButton type="button" onClick={signOut}>
        Sign out
      </StyledButton>
    )
  )
}
