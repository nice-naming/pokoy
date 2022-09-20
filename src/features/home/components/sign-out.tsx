import { auth } from "features/home/firebase-init"
import styled from "styled-components/macro"

// TODO: extract
const StyledButton = styled.button`
  background-color: var(--c-darken-gray);
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  height: 100%;

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`

export const SignOut = () => {
  const signOut = () => auth.signOut()

  return (
    auth.currentUser && (
      <StyledButton
        type="button"
        onClick={signOut}
      >
        Sign out
      </StyledButton>
    )
  )
}
