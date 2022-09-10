import useSound from "use-sound"
import React from "react"
import bellSfx from "shared/assets/sounds/meditation-bell-sound.mp3"
import { STAGES } from "shared/constants"

interface Props {
  progress: number
}

export const Sound: React.FC<Props> = ({ progress }) => {
  const [playBell] = useSound(bellSfx, {
    volume: 0.3
  })

  // TODO: remake in custom hook instead of component
  React.useEffect(() => {
    const minutes = progress / 60
    const isStart = minutes === 0
    const isFibNum = STAGES.includes(minutes)

    if (isStart) return

    if (isFibNum) {
      return playBell()
    }
  }, [progress, playBell])

  return null
}
