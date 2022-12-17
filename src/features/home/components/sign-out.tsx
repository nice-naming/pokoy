import { auth } from "features/home/firebase-init"
import { StyledButton } from "shared/styles/app.styles"
import styled from "styled-components/macro"

// TODO: extract
const StyledSignOutButton = styled(StyledButton)`
  height: 100%;

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`

export const SignOut = () => {
  const signOut = () => auth.signOut()

  return (
    auth.currentUser && (
      <StyledSignOutButton
        type="button"
        onClick={signOut}
      >
        Sign out
      </StyledSignOutButton>
    )
  )
}
