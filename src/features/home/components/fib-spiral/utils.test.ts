/* eslint-disable max-statements */
import { STAGES, SECS_IN_MIN, FIB_NUMS } from "shared/constants"
import { getCurrentStageProgress, getSpiralProgress } from "./utils"

describe("getSpiralProgress", () => {
  it("should calculate properly values for each stage", () => {
    expect.hasAssertions()
    expect(getSpiralProgress(0)).toBe(0)
    expect(getSpiralProgress(1)).toBeCloseTo(21.4, 1)
    expect(getSpiralProgress(59)).toBeCloseTo(1263.58, 1)
    expect(getSpiralProgress(179)).toBeCloseTo(1274.29, 1)
  })
})

describe("getCurrentStageProgress", () => {
  it("should calculate properly values for each stage", () => {
    expect.hasAssertions()
    expect(getCurrentStageProgress(0, 0, SECS_IN_MIN)).toBe(0)
    // 1% of spiral length on the first stage
    expect(getCurrentStageProgress(1, 0, SECS_IN_MIN)).toBeCloseTo(21.4, 1)
    // 98% of spiral length on the first stage (59 seconds)
    expect(getCurrentStageProgress(59, 0, SECS_IN_MIN)).toBeCloseTo(1263.58, 1)

    // 1% of spiral length on the second stage
    expect(getCurrentStageProgress(61, SECS_IN_MIN, 120)).toBeCloseTo(10.7, 1)
    // 99% of spiral length on the second stage
    expect(
      getCurrentStageProgress(
        SECS_IN_MIN * STAGES[2] - 1,
        SECS_IN_MIN * STAGES[1],
        SECS_IN_MIN * FIB_NUMS[2]
      )
    ).toBeCloseTo(1274.29, 1)
    // 1% of spiral length on the third stage
    expect(
      getCurrentStageProgress(
        SECS_IN_MIN * STAGES[2] + 1,
        SECS_IN_MIN * STAGES[2],
        SECS_IN_MIN * FIB_NUMS[3]
      )
    ).toBeCloseTo(7.1, 1)
    // 1% of spiral length on the fourth stage
    expect(getCurrentStageProgress(361, 360, 660)).toBeCloseTo(1.9, 1)

    // 1% of spiral length on the last stage
    expect(
      getCurrentStageProgress(
        SECS_IN_MIN * STAGES[8] + 1, // 5221
        SECS_IN_MIN * STAGES[8], // 5220 -> 8520
        SECS_IN_MIN * FIB_NUMS[9] // 3300
      )
    ).toBeCloseTo(0.38, 1)
    // 99% of spiral length on the last stage
    expect(
      getCurrentStageProgress(
        SECS_IN_MIN * STAGES[8] + 54.9 * SECS_IN_MIN,
        SECS_IN_MIN * STAGES[8],
        SECS_IN_MIN * FIB_NUMS[9]
      )
    ).toBeCloseTo(1282.66, 1)
  })
})
