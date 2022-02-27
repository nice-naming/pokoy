import React, { useCallback, useState } from "react"
import { SlideRenderProps, virtualize } from "react-swipeable-views-utils"
import { SwipeableView } from "shared/styles/app.styles"
import { AboutPageWrapper, StyledImg } from "./about-page.styles"
import SwipeableViews from "react-swipeable-views"
import { ViewsSwitcher } from "features/home/components/views-switcher/views-switcher.component"
import { tutorialSlideRenderer } from "./tutorial-slide-renderer"

const SLIDES_COUNT = 5

const VirtualizedSwipeableViews = virtualize(SwipeableViews)

export const Tutorial = () => {
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <AboutPageWrapper>
      <VirtualizedSwipeableViews
        index={slideIndex}
        onChangeIndex={setSlideIndex}
        slideRenderer={tutorialSlideRenderer}
        slideCount={SLIDES_COUNT}
        enableMouseEvents
        resistance
      />

      <ViewsSwitcher
        slidesCount={5}
        slideIndex={slideIndex}
        setSlideIndex={setSlideIndex}
      />
    </AboutPageWrapper>
  )
}
