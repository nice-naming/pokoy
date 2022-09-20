import { useOnline } from "@saulpalv/useonline"
import { auth } from "features/home/firebase-init"
import { StyledInfo } from "features/sign-in-page/sign-in/sign-in.styles"
import { useLocation } from "react-router-dom"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"
import AppUpdater from "../app-updater/app-updater.component"
import { IncognitoStatusIcon } from "../incognito-status"
import { OfflineStatusIcon } from "../offline-status"
import { SignOut } from "../sign-out"
import {
  StyledConnectionDiv,
  StyledDiv,
  StyledLink,
  StyledWrapper
} from "./header.styles"

interface Props {}

export const Header: React.FC<Props> = () => {
  const isOnline = useOnline()
  const currentPath = useLocation().pathname
  const labelTo = currentPath === "/" ? "About" : "Timer"
  const pathTo = currentPath === "/" ? "/about" : "/"
  const isAnonimous = auth.currentUser?.isAnonymous

  const incognitoText =
    "Anonymous users can use timer, but do not have statistics."

  return (
    <StyledWrapper>
      <StyledConnectionDiv>
        <SignOut />
        {!isOnline && <OfflineStatusIcon color="var(--c-dark-gray)" />}
        {isAnonimous && (
          <StyledTooltip
            content={incognitoText}
            positionSide="bottom"
            wrapContent
          >
            <IncognitoStatusIcon color="var(--c-dark-gray)" />
          </StyledTooltip>
        )}
      </StyledConnectionDiv>

      <StyledDiv>
        <StyledLink to={pathTo}>{labelTo}</StyledLink>
        <AppUpdater />
      </StyledDiv>
    </StyledWrapper>
  )
}
