import { User } from "firebase/auth"
import { useCallback, useEffect, useState } from "react"
import { UserSerie } from "react-charts"
import {
  PokoyChartData,
  ShallowUserStatsData,
  UserStatsData,
} from "shared/types"
import { fetchToLocalStateChartData, fetchToLocalStateStats } from "./get-data"

export interface UserStats {
  chartData: UserSerie<PokoyChartData>[]
  statsData: ShallowUserStatsData
}

// eslint-disable-next-line max-statements
export const useStats = (user: User): UserStats | null => {
  const [chartData, setChartData] = useState<UserSerie<PokoyChartData>[]>([])
  const [statsData, setStatsData] = useState<ShallowUserStatsData | null>(null)

  const getChartDataMemoized = useCallback(fetchToLocalStateChartData, [])
  const getStatsMemoized = useCallback(fetchToLocalStateStats, [])

  useEffect(() => {
    getStatsMemoized(setStatsData, user)
    getChartDataMemoized(setChartData, user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataLength = chartData?.[0]?.data.length
  const chartDataExist = dataLength > 1
  if (!chartDataExist || !statsData) {
    return null
  }

  return { statsData, chartData }
}
