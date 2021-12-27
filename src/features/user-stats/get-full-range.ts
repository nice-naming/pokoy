import { Timestamp } from "firebase/firestore"
import { DayData } from "shared/types"

// TODO: add tests
// TODO: extract to constants
export const MILLIS_IN_DAY = 1000 * 3600 * 24

// NOTE: return array of every meditation for every day from first meditation date
// TODO: refactor function
// eslint-disable-next-line max-statements
export const getFullRange = (daysWithMeditations: DayData[]) => {
  if (daysWithMeditations.length === 0) return []

  const statisticsWithMissedDays = daysWithMeditations
    .reverse()
    .reduce(fillRangeWithMissedDays, [] as DayData[])

  const todayTimestamp = Timestamp.fromMillis(
    new Date(Date.now()).setHours(0, 0, 0, 0)
  )
  const lastDayInRange =
    statisticsWithMissedDays[statisticsWithMissedDays.length - 1]

  const lastDayEqualToToday = lastDayInRange.timestamp.isEqual(todayTimestamp)
  if (lastDayEqualToToday) {
    return statisticsWithMissedDays
  }

  const dateDiff = getDateDiffInDays(todayTimestamp, lastDayInRange.timestamp)
  const missedDays = createMissedDays(dateDiff, todayTimestamp, lastDayInRange)
  const fullRange = statisticsWithMissedDays.concat(missedDays)

  return fullRange
}

// eslint-disable-next-line max-statements
function fillRangeWithMissedDays(
  acc: DayData[],
  day: DayData,
  i: number,
  arr: DayData[]
): DayData[] {
  if (i === 0) return [...acc, day]

  const prevMeditationDate = arr[i - 1].timestamp
  const expectedDate = Timestamp.fromMillis(
    prevMeditationDate.toMillis() + MILLIS_IN_DAY
  )
  const isCurrentDateEqualToExpected = day.timestamp.isEqual(expectedDate)
  const accWithMissedDays = countAndPushMissedDays(acc, day, expectedDate)

  return !isCurrentDateEqualToExpected ? accWithMissedDays : [...acc, day]
}

function getNextDayTimestamp(date: Timestamp) {
  return Timestamp.fromMillis(date.toMillis() + MILLIS_IN_DAY)
}

function countAndPushMissedDays(
  acc: DayData[],
  day: DayData,
  expectedDate: Timestamp
) {
  const dateDiffInDays = getDateDiffInDays(day.timestamp, expectedDate)
  const missedDays = createMissedDays(dateDiffInDays, expectedDate, day)

  const newAcc = acc.concat(missedDays, day)

  return newAcc
}

function createMissedDays(
  dateDiffInDays: number,
  expectedDate: Timestamp,
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
        timestamp: newTimestamp,
      }
      return emptyDay
    })
}

function getDateDiffInDays(dayTimestamp: Timestamp, expectedDate: Timestamp) {
  const diffInDays =
    (dayTimestamp.toMillis() - expectedDate.toMillis()) / MILLIS_IN_DAY

  if (diffInDays < 0) {
    throw new Error(`Отрицательная разница между датами`)
  }

  return Math.ceil(diffInDays)
}
