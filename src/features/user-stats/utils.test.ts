/* eslint-disable max-nested-callbacks */
import { MILLIS_IN_DAY } from "shared/constants"
import { PokoyChartData } from "shared/types"
import {
  getAverageMeditationPerDay,
  getTotalDurationsAsAxisData,
} from "./utils"

describe("getAverageMeditationPerDay", () => {
  it("should return the correct average duration per day", () => {
    const todayDate = new Date(Date.now()).setHours(0, 0, 0, 0)
    const firstMeditationDateList = [
      todayDate - MILLIS_IN_DAY,
      todayDate - MILLIS_IN_DAY * 10,
      todayDate - MILLIS_IN_DAY * 100,
      todayDate - MILLIS_IN_DAY * 365,
    ]
    const totalDurationList = [100, 1000, 10000, 36500]
    const expectedAverage = 100

    totalDurationList.map((totalDuration, index) =>
      expect(
        getAverageMeditationPerDay(
          firstMeditationDateList[index],
          totalDuration
        )
      ).toBe(expectedAverage)
    )
  })

  it("should return Infinity if there are no days diff", () => {
    const firstMeditationDate = new Date(Date.now()).setHours(0, 0, 0, 0)
    const totalDuration = 100

    expect(getAverageMeditationPerDay(firstMeditationDate, totalDuration)).toBe(
      Infinity
    )
  })
})

describe("getTotalDurationsAsAxisData", () => {
  it("should return the correct total duration as axis data", () => {
    const daysWithMeditationsAsAxis: PokoyChartData[] = [
      { primary: new Date(Date.now()), secondary: 100 },
      { primary: new Date(Date.now()), secondary: 1000 },
      { primary: new Date(Date.now()), secondary: 10000 },
      { primary: new Date(Date.now()), secondary: 36500 },
    ]
    const expectedTotalDurationsAxisData: PokoyChartData[] = [
      { primary: new Date(Date.now()), secondary: 100 },
      { primary: new Date(Date.now()), secondary: 1000 },
      { primary: new Date(Date.now()), secondary: 10000 },
      { primary: new Date(Date.now()), secondary: 36500 },
    ]

    const result = daysWithMeditationsAsAxis.reduce(
      (acc, data, i) => getTotalDurationsAsAxisData(acc, data, i),
      [] as PokoyChartData[]
    )

    expect(result).toEqual(expectedTotalDurationsAxisData)
  })
})
