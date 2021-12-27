import { format } from "date-fns"
import {
  getFloorProgressionDiscrete,
  getNextStageInProgression,
} from "shared/utils/getNextFibonacciStage"
import { StyledStat, StyledStatNumber } from "../../user-stats.styles"
import { MILLIS_IN_DAY } from "../../get-full-range"
import { ProgressWrapper, Wrapper } from "./foresight.styles"
import { MINS_IN_HOUR } from "features/user-stats/constants"
import { Line as LineProgress } from "rc-progress"

const PRACTICE_HOURS_PROGRESSION = [
  1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 130, 210, 340, 550, 890, 1300, 2100,
]

interface Props {
  totalHours: number
  average: number
}
export const Foresight: React.FC<Props> = ({ totalHours, average }) => {
  const currentHoursMilestone = getFloorProgressionDiscrete(
    totalHours,
    PRACTICE_HOURS_PROGRESSION
  )
  const nextHoursMilestone = getNextStageInProgression(
    currentHoursMilestone,
    totalHours,
    PRACTICE_HOURS_PROGRESSION
  )
  const averageHoursInDay = average / MINS_IN_HOUR
  const daysToNextMilestone =
    (nextHoursMilestone - totalHours) / averageHoursInDay
  const nextMilestoneDate = new Date(
    Date.now() + MILLIS_IN_DAY * daysToNextMilestone
  )
  const daysUntilNextMilestone = Math.floor(
    (nextMilestoneDate.valueOf() - Date.now()) / MILLIS_IN_DAY
  )
  const milestoneProgress = Math.floor((totalHours / nextHoursMilestone) * 100)

  return (
    <Wrapper>
      {nextHoursMilestone && nextMilestoneDate ? (
        <>
          <StyledStat>
            <StyledStatNumber>{daysUntilNextMilestone}</StyledStatNumber> days
            left to meditate{" "}
            <div>for {nextHoursMilestone} hours of practice</div>
          </StyledStat>

          <ProgressWrapper>
            <LineProgress
              percent={milestoneProgress}
              trailColor={"var(--c-spiral)"}
              strokeColor={"var(--c-green)"}
            />
          </ProgressWrapper>
        </>
      ) : null}
    </Wrapper>
  )
}
