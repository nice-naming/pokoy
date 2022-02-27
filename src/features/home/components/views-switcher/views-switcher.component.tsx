import React, { useCallback, useMemo } from "react"
import { Circle, SwipeButton } from "./views-switcher.styles"

interface Props {
  slidesCount: number
  slideIndex: number
  setSlideIndex: (index: number) => void
}
export const ViewsSwitcher: React.FC<Props> = ({
  slidesCount,
  slideIndex,
  setSlideIndex,
}) => {
  const slideNums = useMemo(
    () => new Array(slidesCount).fill(null),
    [slidesCount]
  )

  const handleClick = useCallback(() => {
    const newIndex = slideIndex < slidesCount - 1 ? slideIndex + 1 : 0
    return setSlideIndex(newIndex)
  }, [setSlideIndex, slideIndex, slidesCount])

  return (
    <SwipeButton type="button" onClick={handleClick}>
      {slideNums.map((_, i) => (
        <Circle isActive={slideIndex === i} key={i} />
      ))}
    </SwipeButton>
  )
}
