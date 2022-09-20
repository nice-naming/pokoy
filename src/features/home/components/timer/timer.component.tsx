import { useState, useCallback } from "react"
import { User } from "@firebase/auth"
import { useAppDispatch, useAppSelector } from "store"
import useNoSleep from "shared/hooks/use-no-sleep"
import { mainScreenActions } from "../../store/main-screen.slice"
import { setMeditationThunk } from "../../store/main-screen.thunks"
import { TimerButton } from "../timer-button/timer-button.component"
import { Countdown } from "../countdown/countdown.component"
import { Sound } from "../sound.component"
import { Tips } from "../tips"
import { FibSpiral } from "../fib-spiral/fib-spiral.component"
import { BottomTextWrapper, TopTextWrapper, Wrapper } from "./timer.styles"
import { SECS_IN_MIN } from "shared/constants"

interface Props {
  user: User
  authLoading: boolean
}

// TODO: refactor component
export const Timer: React.FC<Props> = ({ user, authLoading }) => {
  const [currentTimerId, setCurrentTimerId] = useState<number | null>(null)
  const [timerDiff, setTimerDiff] = useState<number>(0)

  const isTimerStarted =
    useAppSelector((state) => state.mainScreen.timerStatus) === "started"
  useNoSleep(isTimerStarted)
  const dispatch = useAppDispatch()

  const minutes = Math.floor(timerDiff / SECS_IN_MIN)

  const finishTimer = useCallback(
    async (timerDiff: number): Promise<void> => {
      const isCurrentTimerIdExist = currentTimerId !== null
      if (!isCurrentTimerIdExist) throw Error("currentTimerId is not exist")

      window.clearInterval(currentTimerId)

      dispatch(mainScreenActions.setTimerStatus(false))
      setTimerDiff(0)

      const isSessionLongerThanMinute = timerDiff > SECS_IN_MIN
      if (!isSessionLongerThanMinute) {
        return
      }

      try {
        // NOTE: line below for fast debugging
        // dispatch(setMeditationThunk({ user, seconds: 61 }))
        dispatch(setMeditationThunk({ user, seconds: timerDiff }))
      } catch (e) {
        console.error(e)
      }
    },
    [currentTimerId, dispatch, user]
  )

  const handleTimer = useCallback((startTime: number) => {
    const secondsNow = Math.round(Date.now() / 1000)
    const secondsDiff = secondsNow - startTime
    setTimerDiff(secondsDiff)
  }, [])

  const startTimer = useCallback(() => {
    const startInSeconds = Math.round(Date.now() / 1000)
    dispatch(mainScreenActions.setTimerStatus(true))

    const newTimerId = window.setInterval(
      () => handleTimer(startInSeconds),
      100
    )
    setCurrentTimerId(newTimerId)
  }, [dispatch, handleTimer])

  const handleClick = useCallback(() => {
    setTimerDiff(0)

    if (isTimerStarted) {
      return finishTimer(timerDiff)
    } else {
      return startTimer()
    }
  }, [finishTimer, isTimerStarted, startTimer, timerDiff])

  return (
    <Wrapper>
      <TopTextWrapper>
        {!authLoading && <Countdown seconds={timerDiff} />}
      </TopTextWrapper>

      <TimerButton
        handleTimerClick={handleClick}
        isTimerStarted={isTimerStarted}
        authLoading={authLoading}
      >
        <Sound progress={timerDiff} />
        <FibSpiral
          seconds={timerDiff}
          authLoading={authLoading}
        />
      </TimerButton>

      <BottomTextWrapper>
        {!authLoading && (
          <Tips
            minutes={minutes}
            isTimerStarted={isTimerStarted}
          />
        )}
      </BottomTextWrapper>
    </Wrapper>
  )
}
