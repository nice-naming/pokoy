import { User } from "@firebase/auth"
import { AppUpdater } from "features/home/components/app-updater"
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
          <StatsNumbers statsData={userStats?.statsData} />
          <StatsChart pokoyData={userStats?.chartData} />
        </>
      ) : (
        <>
          <p>There are no statistics 🤷‍♂️</p>
          <p>
            Try meditating for more than two days
            <br />
            or contact with <a href="https://t.me/m0rtyn">@m0rtyn</a>
          </p>
        </>
      )}
      <AppUpdater />
    </Wrapper>
  )
}
