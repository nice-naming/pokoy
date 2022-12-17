import {
  StyledStatNumber,
  StyledStat
} from "features/user-stats/user-stats.styles"
import {
  getAverageMeditationPerDay,
  getStreak,
  getTotalInHours
} from "features/user-stats/user-stats.utils"
import { useEffect, useState } from "react"
import { UserStatsData } from "shared/types"
import { Foresight } from "../foresight/foresight.component"
import { Wrapper } from "./stats-numbers.styles"

interface Props {
  statsData: UserStatsData | null
}
export const StatsNumbers: React.FC<Props> = ({ statsData }) => {
  const [average, setAverage] = useState<number | null>(null)
  const [totalInHours, setTotalInHours] = useState<number | null>(null)
  const [streak, setStreak] = useState<number | null>(null)

  useEffect(() => {
    if (!statsData) return

    const averageMeditationPerDay = getAverageMeditationPerDay(
      statsData.firstMeditationDate,
      statsData.totalDuration
    )

    setAverage(averageMeditationPerDay)
    setTotalInHours(getTotalInHours(statsData.totalDuration))
    setStreak(getStreak())
  }, [statsData])

  const totalInHoursExist = totalInHours !== null

  return (
    <Wrapper>
      {totalInHoursExist && average && (
        <Foresight
          totalHours={totalInHours}
          average={average}
        />
      )}

      {totalInHoursExist && (
        <StyledStat>
          <StyledStatNumber>{totalInHours}</StyledStatNumber> hours in total
        </StyledStat>
      )}

      {average && (
        <StyledStat>
          <StyledStatNumber>{average}</StyledStatNumber>
          <span> average mins / day </span>
        </StyledStat>
      )}

      {streak && (
        <StyledStat>
          <StyledStatNumber>{streak}</StyledStatNumber>
          <span> days in a row </span>
        </StyledStat>
      )}
    </Wrapper>
  )
}
