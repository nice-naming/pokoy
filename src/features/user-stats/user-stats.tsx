import { subMonths } from "date-fns"
import { User } from "@firebase/auth"
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "store"
import { getUserChartData } from "./user-stats.utils"
import {
  selectDateRange,
  selectDaysData,
  selectIsLoading,
  selectUserStats
} from "./store/user-stats.selectors"
import { getChartDataThunk, getStatsThunk } from "./store/user-stats.thunks"
import { UserStatsData } from "shared/types"
import { StyledSpinner } from "shared/components/styled-spinner.styles"
import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { StatsChart } from "./components/stats-chart/stats-chart.component"
import { NoUserStatsMessage } from "./components/no-user-stats-message"
import { StyledDateRangeButton, Wrapper } from "./user-stats.styles"
import { userStatsActions } from "./store/user-stats.slice"

interface Props {
  authLoading: boolean
  user?: User | null
}

// TODO: rename to StatisticsPage
export const UserStats: React.FC<Props> = ({ user, authLoading }) => {
  const dispatch = useAppDispatch()

  const userStatistics = useAppSelector(selectUserStats)
  const userDaysData = useAppSelector(selectDaysData)
  const isLoading = useAppSelector(selectIsLoading)
  const dateRange = useAppSelector(selectDateRange)

  const daysDataByDateRange = useMemo(() => {
    if (dateRange === "all") return userDaysData

    const daysData = userDaysData.filter((dayData) => {
      const startDate = subMonths(new Date(), 3)
      return dayData.timestamp >= startDate.getTime()
    })

    return daysData
  }, [dateRange, userDaysData])

  const statsByDateRange = useMemo(() => {
    if (!userStatistics) return null
    if (dateRange === "all") return userStatistics

    const { totalDuration, count } = daysDataByDateRange.reduce(
      (acc, day) => {
        return {
          totalDuration: acc.totalDuration + day.totalDuration,
          count: acc.count + day.count
        }
      },
      { count: 0, totalDuration: 0 }
    )

    const stats: UserStatsData = {
      ...userStatistics,
      firstMeditationDate: subMonths(new Date(), 3).getTime(),
      userId: user?.uid || "no-user",
      totalDuration,
      count
    }

    return stats
  }, [dateRange, daysDataByDateRange, user?.uid, userStatistics])

  const userChartData = useMemo(() => {
    if (!statsByDateRange || !userDaysData) return null
    return getUserChartData(daysDataByDateRange, statsByDateRange)
  }, [daysDataByDateRange, statsByDateRange, userDaysData])

  useEffect(() => {
    if (!user || user.isAnonymous) return

    dispatch(getStatsThunk(user))
    dispatch(getChartDataThunk(user))
  }, [dispatch, user])

  const isChartDataExist = userChartData?.[0].data.length !== 0
  const dateRangeButtonLabel =
    dateRange === "all" ? "All history" : "Last 3 months"

  return (
    <Wrapper>
      {authLoading || isLoading ? (
        <StyledSpinner />
      ) : isChartDataExist ? (
        <>
          <StatsNumbers statsData={statsByDateRange} />
          <StatsChart chartData={userChartData} />
        </>
      ) : (
        <NoUserStatsMessage />
      )}

      {/* // NOTE: FOR DEBUGGING */}
      {/* {userStatistics && (
        <button onClick={() => countStats(userDaysData, userStatistics)}>
          Count Stats
        </button>
      )} */}

      <StyledDateRangeButton
        onClick={() => dispatch(userStatsActions.toggleDateRange())}
      >
        {dateRangeButtonLabel}
      </StyledDateRangeButton>
    </Wrapper>
  )
}
