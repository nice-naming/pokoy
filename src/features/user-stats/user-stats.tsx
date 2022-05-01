import { User } from "@firebase/auth"
import { getChartDataThunk, thunkGetStats } from "features/pokoyThunks"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "store"
import { StatsChart } from "./components/stats-chart/stats-chart.component"
import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { Wrapper } from "./user-stats.styles"
import { transformDayDataToChartData } from "./utils"

interface Props {
  user: User
}

// TODO: rename to StatisticsPage
export const UserStats: React.FC<Props> = ({ user }) => {
  // const userStats = useStats(user)
  const userStatistics = useSelector((state: RootState) => state.pokoy.stats)
  const userDaysData = useSelector((state: RootState) => state.pokoy.daysData)
  const dispatch: AppDispatch = useDispatch()

  const userChartData = useMemo(
    () => transformDayDataToChartData(userDaysData),
    [userDaysData]
  )

  useEffect(() => {
    if (user) {
      dispatch(thunkGetStats(user))
      dispatch(getChartDataThunk(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const isChartDataExist = userChartData?.[0]?.data?.length !== 0

  return (
    <Wrapper>
      {userChartData && isChartDataExist ? (
        <>
          <StatsNumbers statsData={userStatistics} />
          <StatsChart pokoyData={userChartData} />
        </>
      ) : (
        <span>
          There are no statistics yet. Try meditating for more than two days.
        </span>
      )}
    </Wrapper>
  )
}
