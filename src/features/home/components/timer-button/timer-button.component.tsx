import React from "react"
import useSound from "use-sound"
import clickSfx from "shared/assets/sounds/finger-snap.mp3"
import { ButtonWrapper } from "./timer-button.styles"
import { RequestStatus } from "shared/types"

type Props = {
  handleTimerClick: () => void
  isTimerStarted: boolean
  requestStatus: RequestStatus
}

export const TimerButton: React.FC<Props> = ({
  isTimerStarted = false,
  handleTimerClick,
  requestStatus,
  children,
}) => {
  const [playClick] = useSound(clickSfx)

  const clickWithSound = React.useCallback(() => {
    playClick()
    handleTimerClick()
  }, [handleTimerClick, playClick])

  return (
    <ButtonWrapper
      onClick={clickWithSound}
      requestStatus={requestStatus}
      isStarted={isTimerStarted}
      type="button"
      autoFocus
    >
      {children}
    </ButtonWrapper>
  )
}
