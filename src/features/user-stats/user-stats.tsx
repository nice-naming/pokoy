import { User } from "@firebase/auth"
import { StatsChart } from "./components/stats-chart/stats-chart.component"
import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { Wrapper } from "./user-stats.styles"
import { useStats } from "./useStats"

interface Props {
  user: User
}

export const UserStats: React.FC<Props> = ({ user }) => {
  const userStats = useStats(user)

  return (
    <Wrapper>
      {userStats !== null ? (
        <>
          <StatsNumbers statsData={userStats.statsData} />
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
