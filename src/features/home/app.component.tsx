import React, { useCallback, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "features/home/firebase-init"
import { Pokoy } from "features/home/components/pokoy/pokoy.component"
import { FibLoader } from "features/home/components/fib-loader"
import { Wrapper, SwipeableView } from "./app.styles"
import SwipeableViews from "react-swipeable-views"
import { UserStats } from "features/user-stats/user-stats"
import { User } from "firebase/auth"
import { Header } from "./components/header/header.component"
import { AppUpdater } from "./components/app-updater"
import { ViewsSwitcher } from "./components/views-switcher/views-switcher.component"
import { SlideRenderProps, virtualize } from "react-swipeable-views-utils"

// TODO: extract to constants
const SLIDES_COUNT = 2
const swipeableViewsRootStyles = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
}
const swipeableViewsContainerStyles = {
  maxWidth: "100%",
  maxHeight: "100%",
  height: "100%",
}

const VirtualizedSwipeableViews = virtualize(SwipeableViews)

export const App: React.FC = () => {
  const [user, loading] = useAuthState(auth)
  const [slideIndex, setSlideIndex] = useState(0)

  const isStillLoading = loading && !user

  const slideRenderer = useCallback(
    ({ index, key }: SlideRenderProps) => {
      switch (index) {
        case 0:
          return (
            <SwipeableView key={key}>
              <FibLoader stillLoading={isStillLoading} />
              <Pokoy user={user as User} />
            </SwipeableView>
          )

        case 1:
          return (
            <SwipeableView key={key}>
              {!isStillLoading && <UserStats user={user as User} />}
            </SwipeableView>
          )
      }
    },
    [isStillLoading, user]
  )

  return (
    <Wrapper>
      <Header />

      <VirtualizedSwipeableViews
        style={swipeableViewsRootStyles}
        containerStyle={swipeableViewsContainerStyles}
        index={slideIndex}
        onChangeIndex={setSlideIndex}
        slideRenderer={slideRenderer}
        slideCount={SLIDES_COUNT}
        enableMouseEvents
        resistance
      />

      <ViewsSwitcher slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
    </Wrapper>
  )
}
