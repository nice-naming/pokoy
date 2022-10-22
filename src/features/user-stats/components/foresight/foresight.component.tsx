import { Line as LineProgress } from "rc-progress"
import { add, format } from "date-fns"
import { MILLIS_IN_DAY, MINS_IN_HOUR } from "shared/constants"
import {
  getFloorProgressionDiscrete,
  getNextStageInProgression
} from "shared/utils/getNextFibonacciStage"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"
import { StyledStat, StyledStatNumber } from "../../user-stats.styles"
import { PRACTICE_HOURS_PROGRESSION } from "../../user-stats.constants"
import { ProgressWrapper, Wrapper } from "./foresight.styles"
import { useMemo } from "react"

interface Props {
  totalHours: number
  average: number
}
export const Foresight: React.FC<Props> = ({ totalHours, average }) => {
  const currentHoursMilestone = useMemo(
    () => getFloorProgressionDiscrete(totalHours, PRACTICE_HOURS_PROGRESSION),
    [totalHours]
  )

  const nextHoursMilestone = useMemo(
    () =>
      getNextStageInProgression(
        currentHoursMilestone,
        totalHours,
        PRACTICE_HOURS_PROGRESSION
      ),
    [currentHoursMilestone, totalHours]
  )

  const milestoneProgress = useMemo(() => {
    const prevHoursMilestone =
      PRACTICE_HOURS_PROGRESSION[
        PRACTICE_HOURS_PROGRESSION.indexOf(nextHoursMilestone) - 1
      ]
    return Math.floor(
      ((totalHours - prevHoursMilestone) / nextHoursMilestone) * 100
    )
  }, [nextHoursMilestone, totalHours])

  const averageHoursInDay = average / MINS_IN_HOUR

  const daysToNextMilestone =
    (nextHoursMilestone - totalHours) / averageHoursInDay
  const nextMilestoneDate = new Date(
    Date.now() + MILLIS_IN_DAY * daysToNextMilestone
  )
  const daysUntilNextMilestone = Math.floor(
    (nextMilestoneDate.valueOf() - Date.now()) / MILLIS_IN_DAY
  )
  const dateOfNextMilestone = format(
    add(new Date(), { days: daysUntilNextMilestone }),
    "'at' dd MMM ‘yy"
  )

  return (
    <Wrapper>
      {nextHoursMilestone && nextMilestoneDate ? (
        <>
          <StyledStat>
            <StyledTooltip
              content={dateOfNextMilestone}
              positionSide="right"
            >
              <StyledStatNumber>{daysUntilNextMilestone}*</StyledStatNumber>
            </StyledTooltip>

            <span>days of practice left </span>
            <div>
              to {nextHoursMilestone} hour
              {nextHoursMilestone === 1 ? "" : "s"} of meditation
            </div>
          </StyledStat>

          <ProgressWrapper>
            <LineProgress
              className="progress-bar"
              percent={milestoneProgress}
              trailColor={"var(--c-dark-gray)"}
              strokeColor={"var(--c-cyan)"}
            />
          </ProgressWrapper>
        </>
      ) : null}
    </Wrapper>
  )
}
