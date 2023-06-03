/* eslint-disable max-nested-callbacks */
import { MILLIS_IN_DAY } from "shared/constants"
import { DayData, PokoyChartData } from "shared/types"
import {
  getAverageCountPerDay,
  getAverageMeditationPerDay,
  getTotalDurationsAsAxisData
} from "./user-stats.utils"

describe("getAverageMeditationPerDay", () => {
  it("should return Infinity if there are no days diff", () => {
    const firstMeditationDate = new Date(Date.now()).setHours(0, 0, 0, 0)
    const totalDuration = 100

    expect(getAverageMeditationPerDay(firstMeditationDate, totalDuration)).toBe(
      Infinity
    )
  })

  it("should return the correct average duration per day", () => {
    const todayDate = new Date(Date.now()).setHours(0, 0, 0, 0)
    const firstMeditationDateList = [
      todayDate - MILLIS_IN_DAY,
      todayDate - MILLIS_IN_DAY * 10,
      todayDate - MILLIS_IN_DAY * 100,
      todayDate - MILLIS_IN_DAY * 365
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
})

describe("getTotalDurationsAsAxisData", () => {
  it("should return the correct total duration as axis data", () => {
    const daysWithMeditationsAsAxis: PokoyChartData[] = [
      { primary: new Date(Date.now()), secondary: 100 },
      { primary: new Date(Date.now()), secondary: 1000 },
      { primary: new Date(Date.now()), secondary: 10000 },
      { primary: new Date(Date.now()), secondary: 36500 }
    ]
    const expectedTotalDurationsAxisData: PokoyChartData[] = [
      { primary: new Date(Date.now()), secondary: 100 },
      { primary: new Date(Date.now()), secondary: 1000 },
      { primary: new Date(Date.now()), secondary: 10000 },
      { primary: new Date(Date.now()), secondary: 36500 }
    ]

    const result = daysWithMeditationsAsAxis.reduce(
      (acc, data, i) => getTotalDurationsAsAxisData(acc, data, i),
      [] as PokoyChartData[]
    )

    expect(result).toEqual(expectedTotalDurationsAxisData)
  })
})

describe("getAverageCountPerDay", () => {
  const dayDataMock: DayData = {
    timestamp: 0,
    totalDuration: 0,
    count: 0,
    meditations: [],
    userId: "test",
    statsRef: "/test"
  }
  const sessionMock = {
    duration: 0,
    timestamp: "2023-01-01",
    userId: "test"
  }
  const dayDataList: DayData[] = [
    { ...dayDataMock, meditations: [sessionMock, sessionMock] },
    {
      ...dayDataMock,
      meditations: [sessionMock, sessionMock, sessionMock, sessionMock]
    },
    { ...dayDataMock, meditations: [] }
  ]

  it("should return the correct average count per day", () => {
    expect.hasAssertions()
    expect(getAverageCountPerDay(dayDataList)).toBe(2)
    expect(
      getAverageCountPerDay([...dayDataList, ...dayDataList, ...dayDataList])
    ).toBe(2)
    expect(
      getAverageCountPerDay([
        ...dayDataList,
        {
          ...dayDataMock,
          meditations: [
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock
          ]
        }
      ])
    ).toBe(4.5)
  })

  it("should return 0 if there are no days", () => {
    expect(getAverageCountPerDay([])).toBe(0)
  })

  it("should return 0 if there are no meditations", () => {
    expect(getAverageCountPerDay([{ ...dayDataMock, meditations: [] }])).toBe(0)
  })

  it("should return 0 if there are no days with meditations", () => {
    expect(
      getAverageCountPerDay([
        { ...dayDataMock, meditations: [] },
        { ...dayDataMock, meditations: [] }
      ])
    ).toBe(0)
  })
})
