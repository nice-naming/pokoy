import { StatsData } from "shared/types"
import { getFibonacciDiscrete } from "shared/utils/getNextFibonacciStage"

export const writeSessionToStore = (seconds: number) => {
  const date = new Date().toISOString()

  const totalTime = getFibonacciDiscrete(seconds / 60)

  const dataString = localStorage.getItem("stats") ?? "{}"
  const statsData: StatsData = JSON.parse(dataString)
  const item = statsData[date] || []
  const newData = { ...statsData, [date]: [...item, totalTime] }

  localStorage.setItem("stats", JSON.stringify(newData))
}
