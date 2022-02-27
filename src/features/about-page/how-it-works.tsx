import { ViewsSwitcher } from "features/home/components/views-switcher/views-switcher.component"
import { useState, useCallback } from "react"
import SwipeableViews from "react-swipeable-views"
import { SlideRenderProps, virtualize } from "react-swipeable-views-utils"
import { SwipeableView } from "shared/styles/app.styles"

const SLIDES_COUNT = 4

const VirtualizedSwipeableViews = virtualize(SwipeableViews)

export const HowItWorks = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const slideRenderer = useCallback(({ index, key }: SlideRenderProps) => {
    switch (index) {
      case 0:
        return <SwipeableView key={key}></SwipeableView>
      case 1:
        return (
          <SwipeableView key={key}>
            <h1>How it works?</h1>
            <p>
              This is a Fibonacci timer. It relieves boredom by counting down
              with progressively longer stretches of time.
            </p>
            <p>
              In addition, session statistics give instant feedback on the
              long-term positive effects of meditation.
            </p>
            <ul>
              <li>
                A series of timers
                <p>
                  After you click, the timers go one after another. Each new
                  timer tells you how long to wait for the next stage.
                </p>
              </li>
              <li>
                The duration of the timers gradually increases
                <p>
                  The increase occurs according to the Fibonacci sequence: 1, 2,
                  3, 5, 8, 13...
                </p>
              </li>
              <li>
                So what's the deal?
                <p>
                  The magic here is that the emphasis is on the extra meditation
                  time, not the total duration. Such small steps feel easy.
                </p>
              </li>
              <li>
                The result is more than it seems
                <p>
                  The gradual build-up helps you stay in the session longer.
                  Because it's a cognitive trick.
                </p>
              </li>
            </ul>
          </SwipeableView>
        )
      case 2:
        return (
          <SwipeableView key={key}>
            <h2>Examples</h2>
            <p>
              At any stage you can end the meditation and stop the timer. After
              that, the time of the session will be recorded in your statistics
              as the last step of the timer passed.
            </p>
            <ol>
              <li>
                If you meditate for 12 minutes, it will be recorded as 8 (1 + 1
                + 1 + 2 + 3), but you will feel as if only 3 minutes have passed
                (as last interval).
              </li>
              <li>
                If you meditate for 28 minutes, it will be recorded as 21 (1 + 1
                + 1 + 2 + 3 + 5 + 8) and so on.
              </li>
            </ol>
          </SwipeableView>
        )
    }
  }, [])

  return (
    <>
      <VirtualizedSwipeableViews
        index={slideIndex}
        onChangeIndex={setSlideIndex}
        slideRenderer={slideRenderer}
        slideCount={SLIDES_COUNT}
        enableMouseEvents
        resistance
      />

      <ViewsSwitcher
        slidesCount={SLIDES_COUNT}
        slideIndex={slideIndex}
        setSlideIndex={setSlideIndex}
      />
    </>
  )
}
