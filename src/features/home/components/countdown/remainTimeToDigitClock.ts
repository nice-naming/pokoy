export const remainTimeToDigitClock = (
  secondsRemain: number,
  minutesRemain: number
): string => {
  const formattedMinsRemain =
    minutesRemain < 10 ? `0${minutesRemain}` : `${minutesRemain}`

  const formattedRemainder =
    secondsRemain < 10 ? `0${secondsRemain}` : `${secondsRemain}`

  return `${formattedMinsRemain}:${formattedRemainder}`
}
