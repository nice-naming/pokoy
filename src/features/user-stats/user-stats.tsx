import { User } from "@firebase/auth"
import { getStatsThunk } from "features/pokoyThunks"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "store"
import { StatsChart } from "./components/stats-chart/stats-chart.component"
import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { Wrapper } from "./user-stats.styles"
import { useStats } from "./useStats"

interface Props {
  user: User
}

// TODO: rename to StatisticsPage
export const UserStats: React.FC<Props> = ({ user }) => {
  const userStats = useStats(user)
  const userStatistics = useSelector((state: RootState) => state.pokoy.stats)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(getStatsThunk(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <Wrapper>
      {userStats !== null && userStats.chartData ? (
        <>
          <StatsNumbers statsData={userStatistics} />
          <StatsChart pokoyData={userStats.chartData} />
        </>
      ) : (
        <span>
          There are no statistics yet. Try meditating for more than two days.
        </span>
      )}
    </Wrapper>
  )
}
