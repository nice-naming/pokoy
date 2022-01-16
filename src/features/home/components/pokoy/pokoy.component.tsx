import { useState, useEffect, useCallback } from "react"
import { User } from "@firebase/auth"
import { useNoSleep } from "use-no-sleep"
import {
  LOCAL_CACHE_FIELD_NAME,
  MAX_TIMER_SECONDS,
  SECS_IN_MIN,
} from "shared/constants"
import { firestore } from "../../firebase-init"
import { TimerButton } from "../timer-button/timer-button.component"
import { Countdown } from "../countdown/countdown.component"
import { Tips } from "../tips"
import {
  sendSessionFromLocalStore,
  sendSessionFromSeconds,
} from "./writeSessionToServer"
import { PokoySession, RequestStatus } from "shared/types"
import { TopTextWrapper, Wrapper } from "./pokoy.styles"
import { Sound } from "shared/components/progress/Sound"
import { FibSpiral } from "../fib-spiral/fib-spiral.component"

// TODO: refactor component
export const Pokoy = ({ user }: { user: User }) => {
  const [currentTimerId, setCurrentTimerId] = useState<number | null>(null)
  const [timerDiff, setTimerDiff] = useState<number>(0)
  const [isStarted, setStartedFlag] = useState(false)
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.NONE
  )
  useNoSleep(true)
  const minutes = Math.floor(timerDiff / SECS_IN_MIN)

  const finishTimer = useCallback(
    async (timerDiff: number): Promise<void> => {
      const isCurrentTimerIdExist = currentTimerId !== null
      if (!isCurrentTimerIdExist) throw Error("currentTimerId is not exist")

      window.clearInterval(currentTimerId)
      setStartedFlag(false)
      setTimerDiff(0)

      const isSessionLongerThanMinute = timerDiff > SECS_IN_MIN
      if (!isSessionLongerThanMinute) {
        return
      }

      try {
        setRequestStatus(RequestStatus.REQUEST)
        // NOTE: for developing
        // await sendSessionFromSeconds(firestore, user, 61)
        await sendSessionFromSeconds(firestore, user, timerDiff)
        setRequestStatus(RequestStatus.SUCCESS)
      } catch (e) {
        setRequestStatus(RequestStatus.FAILURE)
        console.error(e)
      }
    },
    [currentTimerId, user]
  )

  const handleTimer = useCallback(
    (startTime: number) => {
      const secondsNow = Math.round(Date.now() / 1000)
      const secondsDiff = secondsNow - startTime
      setTimerDiff(secondsDiff)

      const isTimerDiffMoreThanMinute = timerDiff === MAX_TIMER_SECONDS
      if (isTimerDiffMoreThanMinute) {
        finishTimer(timerDiff)
      }
    },
    [finishTimer, timerDiff]
  )

  const startTimer = useCallback(() => {
    const startInSeconds = Math.round(Date.now() / 1000)
    setStartedFlag(true)
    setRequestStatus(RequestStatus.NONE)

    const newTimerId = window.setInterval(
      () => handleTimer(startInSeconds),
      100
    )
    setCurrentTimerId(newTimerId)
  }, [handleTimer])

  const handleClick = useCallback(() => {
    setTimerDiff(0)

    if (isStarted) {
      return finishTimer(timerDiff)
    } else {
      return startTimer()
    }
  }, [finishTimer, isStarted, startTimer, timerDiff])

  // TODO: extract function in useEffect from component or extract custom hook
  useEffect(() => {
    const storedAfterFailurePokoySession = window?.localStorage.getItem(
      LOCAL_CACHE_FIELD_NAME
    )

    if (storedAfterFailurePokoySession) {
      const lastSession = JSON.parse(
        storedAfterFailurePokoySession
      ) as PokoySession

      sendSessionFromLocalStore(firestore, user, lastSession)
      window?.localStorage.removeItem(LOCAL_CACHE_FIELD_NAME)
    }
  }, [user])

  return (
    <Wrapper>
      <TopTextWrapper>
        <Countdown seconds={timerDiff} />
      </TopTextWrapper>

      <TimerButton
        handleTimerClick={handleClick}
        isTimerStarted={isStarted}
        requestStatus={requestStatus}
      >
        <Sound progress={timerDiff} />
        <FibSpiral seconds={timerDiff} />
      </TimerButton>

      <Tips minutes={minutes} isTimerStarted={isStarted} />
    </Wrapper>
  )
}
