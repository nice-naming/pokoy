import React from "react";
import { FibonacciProgress, TimerButton, Countdown, Minutes } from "features";
import { writeSessionToServer } from "./writeSessionToServer";
import styles from "./Home.module.css";

const MAX_TIMER_SECONDS = 1260; // NOTE: equal to 21 minutes

// TODO: refactor this component
export const Home: React.FC = () => {
  const [startTime, setStartTime] = React.useState(0);
  const [timerDiff, setTimerDiff] = React.useState(0);
  const [isStarted, setStartedFlag] = React.useState(false);
  const [currentTimerId, setCurrentTimerId] = React.useState<
    number | undefined
  >(undefined);

  const finishTimer = React.useCallback((): void => {
    writeSessionToServer(timerDiff); // NOTE: side effect for write session data to google sheet

    setStartedFlag(false);
    setStartTime(0);

    window.clearTimeout(currentTimerId);
    console.info("Timer resetted");
  }, [currentTimerId, timerDiff]);

  React.useEffect((): void => {
    if (startTime !== 0) {
      const secondsNow = Math.round(Date.now() / 1000);
      const diff = secondsNow - startTime;
      setTimerDiff(diff);
    }

    if (timerDiff >= MAX_TIMER_SECONDS) {
      finishTimer();
    }
  }, [currentTimerId, finishTimer, startTime, timerDiff]);

  // FIXME: what is this function do?
  const tickTimer = React.useCallback(() => {
    window.clearTimeout(currentTimerId);

    const newTimerId = window.setTimeout(() => {
      tickTimer();
    }, 100);
    setCurrentTimerId(newTimerId);
  }, [currentTimerId]);

  const handleTimerClick = React.useCallback(() => {
    setTimerDiff(0);

    if (isStarted) {
      return finishTimer();
    }

    setStartedFlag(true);

    const startInSeconds = Math.round(Date.now() / 1000);
    setStartTime(startInSeconds);
    tickTimer();
  }, [finishTimer, isStarted, tickTimer]);

  return (
    <main className={styles["app-wrapper"]}>
      <p>
        <Countdown seconds={timerDiff} />
      </p>
      <div className={styles["progress-spiral-wrapper"]}>
        <TimerButton
          handleTimerClick={handleTimerClick}
          isTimerStarted={isStarted}
        >
          <FibonacciProgress value={timerDiff} />
        </TimerButton>
      </div>
      <p>
        <Minutes seconds={timerDiff} />
      </p>
    </main>
  );
};
