import { SignIn } from "features/sign-in-page/sign-in/SignIn"
import styled from "styled-components/macro"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const SignInPage = () => {
  return (
    <Wrapper>
      <SignIn />
    </Wrapper>
  )
}
