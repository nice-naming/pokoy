import useSound from "use-sound"
import React from "react"
import gongSfx from "shared/assets/sounds/gong.mp3"
import bellSfx from "shared/assets/sounds/meditation-bell-sound.mp3"
import { FIB_NUMS_FOR_TIMER } from "shared/constants"

interface Props {
  progress: number
}

export const Sound: React.FC<Props> = ({ progress }) => {
  const [playGong] = useSound(gongSfx, {
    volume: 0.03,
  })
  const [playBell] = useSound(bellSfx, {
    volume: 0.3,
  })

  // TODO: remake in custom hook instead of component
  React.useEffect(() => {
    const minutes = progress / 60
    const isStart = minutes === 0
    const isFibNum = FIB_NUMS_FOR_TIMER.includes(minutes)
    const isFinish = minutes === 21

    if (isStart) return

    if (isFinish) {
      return playGong()
    }

    if (isFibNum) {
      return playBell()
    }
  }, [progress, playGong, playBell])

  return null
}
