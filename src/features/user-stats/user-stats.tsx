import { User } from "@firebase/auth"
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "store"
import { StatsChart } from "./components/stats-chart/stats-chart.component"
import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { Wrapper } from "./user-stats.styles"
import { getUserChartData } from "./user-stats.utils"
import { StyledSpinner } from "shared/components/styled-spinner.styles"
import { NoUserStatsMessage } from "./components/no-user-stats-message"
import {
  selectDaysData,
  selectIsLoading,
  selectUserStats
} from "./store/user-stats.selectors"
import { getChartDataThunk, getStatsThunk } from "./store/user-stats.thunks"

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

  const userChartData = useMemo(() => {
    if (!userStatistics || !userDaysData) return null
    return getUserChartData(userDaysData, userStatistics)
  }, [userDaysData, userStatistics])

  useEffect(() => {
    if (!user || user.isAnonymous) return

    dispatch(getStatsThunk(user))
    dispatch(getChartDataThunk(user))
  }, [dispatch, user])

  const isChartDataExist = userChartData?.[0].data.length !== 0

  return (
    <Wrapper>
      {authLoading || isLoading ? (
        <StyledSpinner />
      ) : isChartDataExist ? (
        <>
          <StatsNumbers statsData={userStatistics} />
          <StatsChart chartData={userChartData} />
        </>
      ) : (
        <NoUserStatsMessage />
      )}
    </Wrapper>
  )
}
