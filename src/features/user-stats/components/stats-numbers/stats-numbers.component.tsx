import { selectDaysData } from "features/user-stats/store/user-stats.selectors"
import {
  StyledStatNumber,
  StyledStat
} from "features/user-stats/user-stats.styles"
import {
  getAverageMeditationPerDay,
  getAverageCountPerDay,
  getTotalInHours
} from "features/user-stats/user-stats.utils"
import { useEffect, useState } from "react"
import { UserStatsData } from "shared/types"
import { useAppSelector } from "store"
import { Foresight } from "../foresight/foresight.component"
import { Wrapper } from "./stats-numbers.styles"

interface Props {
  statsData: UserStatsData | null
}
export const StatsNumbers: React.FC<Props> = ({ statsData }) => {
  const [totalInHours, setTotalInHours] = useState<number | null>(null)
  const [averageDuration, setAverageDuration] = useState<number | null>(null)
  const [averageCount, setAverageCount] = useState<number | null>(null)
  const userDaysData = useAppSelector(selectDaysData)

  useEffect(() => {
    if (!statsData) return

    const averageMeditationPerDay = getAverageMeditationPerDay(
      statsData.firstMeditationDate,
      statsData.totalDuration
    )
    const averageCountPerDay = getAverageCountPerDay(userDaysData)

    setTotalInHours(getTotalInHours(statsData.totalDuration))
    setAverageDuration(averageMeditationPerDay)
    setAverageCount(averageCountPerDay)
  }, [statsData, userDaysData])

  const totalInHoursExist = totalInHours !== null

  return (
    <Wrapper>
      {totalInHoursExist && averageDuration && (
        <Foresight
          totalHours={totalInHours}
          average={averageDuration}
        />
      )}

      {totalInHoursExist && (
        <StyledStat>
          <StyledStatNumber>{totalInHours}</StyledStatNumber> hours in total
        </StyledStat>
      )}

      {averageDuration && (
        <StyledStat>
          <StyledStatNumber>{averageDuration}</StyledStatNumber>
          <span> avg. mins / day </span>
        </StyledStat>
      )}

      {averageCount && (
        <StyledStat>
          <StyledStatNumber>{averageCount}</StyledStatNumber>
          <span> avg. times / day </span>
        </StyledStat>
      )}
    </Wrapper>
  )
}
