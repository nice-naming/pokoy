import { MILLIS_IN_DAY } from "shared/constants"
import { DayData, Milliseconds } from "shared/types"

// NOTE: return array of every meditation for every day from first meditation date
// TODO: refactor function
// TODO: add tests
// eslint-disable-next-line max-statements
export const getFullRange = (daysWithMeditations: DayData[]) => {
  if (daysWithMeditations.length === 0) return []

  const dayDataWithMissedDays = daysWithMeditations
    .reverse()
    .reduce(addMissedDays, [] as DayData[])

  const todayTimestamp = new Date(Date.now()).setHours(0, 0, 0, 0)
  const lastDayInRange = dayDataWithMissedDays[dayDataWithMissedDays.length - 1]

  const lastDayEqualToToday = lastDayInRange.timestamp === todayTimestamp
  if (lastDayEqualToToday) {
    return dayDataWithMissedDays
  }

  const dateDiff = getDateDiffInDays(todayTimestamp, lastDayInRange.timestamp)
  if (dateDiff <= 0) {
    return dayDataWithMissedDays
  }

  const lastMissedDays = createMissedDays(
    dateDiff,
    todayTimestamp,
    lastDayInRange
  )

  const fullRange = dayDataWithMissedDays.concat(lastMissedDays)
  return fullRange
}

// eslint-disable-next-line max-statements
function addMissedDays(
  acc: DayData[],
  day: DayData,
  i: number,
  arr: DayData[]
): DayData[] {
  if (i === 0) return [...acc, day]

  const prevMeditationDate = arr[i - 1].timestamp
  const expectedDate = prevMeditationDate + MILLIS_IN_DAY

  const isCurrentDateEqualToExpected = day.timestamp === expectedDate
  const accWithMissedDays = countAndPushMissedDays(acc, day, expectedDate)

  return !isCurrentDateEqualToExpected ? accWithMissedDays : [...acc, day]
}

function getNextDayTimestamp(date: Milliseconds) {
  return date + MILLIS_IN_DAY
}

function countAndPushMissedDays(
  acc: DayData[],
  day: DayData,
  expectedDate: Milliseconds
) {
  const dateDiffInDays = getDateDiffInDays(day.timestamp, expectedDate)
  const missedDays = createMissedDays(dateDiffInDays, expectedDate, day)

  const newAcc = acc.concat(missedDays, day)

  return newAcc
}

function createMissedDays(
  dateDiffInDays: number,
  expectedDate: Milliseconds,
  day: DayData
) {
  return Array(dateDiffInDays)
    .fill(null)
    .map((_, i) => {
      const newTimestamp =
        i > 0 ? getNextDayTimestamp(expectedDate) : expectedDate
      const emptyDay: DayData = {
        ...day,
        meditations: [],
        totalDuration: 0,
        timestamp: newTimestamp
      }
      return emptyDay
    })
}

function getDateDiffInDays(
  dayTimestamp: Milliseconds,
  expectedDate: Milliseconds
) {
  const diffInDays = Math.ceil((dayTimestamp - expectedDate) / MILLIS_IN_DAY)

  // if (diffInDays < 0) {
  //   const errorMsg = `
  //     Negative difference between dates:
  //     current: ${new Date(dayTimestamp).toString()}
  //     expected: ${new Date(expectedDate).toString()}
  //     diffDays: ${diffInDays}
  //   `
  //   throw new Error(errorMsg)
  // }

  return diffInDays
}
