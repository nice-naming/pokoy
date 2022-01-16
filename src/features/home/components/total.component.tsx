import { useState, useEffect } from "react"
import { User } from "@firebase/auth"
import { getUserStats } from "./pokoy/getUserStats"

export const Total = ({ user }: { user: User }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getUserStats(user).then((stats) => {
      if (!stats) return
      setTotal(stats.totalDuration)
    })
  }, [user])

  // TODO: remove inline styles
  return <span style={{ color: "gray", fontSize: "1.5rem" }}>{total}</span>
}
