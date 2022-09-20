import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup
} from "firebase/auth"
import { auth } from "features/home/firebase-init"
import { useLocation, useNavigate } from "react-router-dom"
import { ReactComponent as GoogleLogo } from "./google-logo.svg"
import { SignInButton, Wrapper } from "./sign-in.styles"
import { useAppSelector } from "store"
import { mainScreenSelectors } from "features/home/store/main-screen.slice"

export const SignIn = () => {
  const errorMessage = useAppSelector(mainScreenSelectors.getErrorMessage)
  const navigate = useNavigate()
  const locationState = useLocation().state as { from: { pathname: string } }
  const from = locationState?.from?.pathname || "/"

  const signInAsAnon = async () => {
    try {
      await signInAnonymously(auth)
      navigate(from, { replace: true })
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
      navigate(from, { replace: true })
    } catch (e: any) {
      throw new Error(e?.message)
    }
  }

  return (
    <Wrapper>
      <SignInButton
        type="button"
        onClick={signInWithGoogle}
      >
        Sign in with
        <GoogleLogo />
      </SignInButton>

      <SignInButton
        type="button"
        onClick={signInAsAnon}
      >
        Sign in anonymously
      </SignInButton>

      {errorMessage && <p>{errorMessage}</p>}
    </Wrapper>
  )
}
