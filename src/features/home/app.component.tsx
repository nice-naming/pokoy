import React, { useCallback } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import SwipeableViews from "react-swipeable-views"
import { UserStats } from "features/user-stats/user-stats"
import { User } from "firebase/auth"
import { SlideRenderProps, virtualize } from "react-swipeable-views-utils"
import { useAppDispatch, useAppSelector } from "store"
import { mainScreenActions } from "./store/main-screen.slice"
import { Header } from "./components/header/header.component"
import { Pokoy } from "./components/pokoy/pokoy.component"
import { ViewsSwitcher } from "./components/views-switcher/views-switcher.component"
import { auth } from "./firebase-init"
import { Wrapper, SwipeableView, StyledFooter } from "./app.styles"

const { toggleSlideIndex } = mainScreenActions

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
  const slideIndex = useAppSelector((state) => state.mainScreen.slideIndex)
  const dispatch = useAppDispatch()
  const dispatchSlideIndex = useCallback(() => {
    return dispatch(toggleSlideIndex())
  }, [dispatch])

  const slideRenderer = useCallback(
    ({ index, key }: SlideRenderProps) => {
      switch (index) {
        case 0:
          return (
            <SwipeableView key={key}>
              <Pokoy user={user as User} authLoading={loading} />
            </SwipeableView>
          )

        case 1:
          return (
            <SwipeableView key={key}>
              <UserStats user={user} authLoading={loading} />
            </SwipeableView>
          )
      }
    },
    [loading, user]
  )

  return (
    <Wrapper>
      <Header />

      <VirtualizedSwipeableViews
        style={swipeableViewsRootStyles}
        containerStyle={swipeableViewsContainerStyles}
        index={slideIndex}
        onChangeIndex={dispatchSlideIndex}
        slideRenderer={slideRenderer}
        slideCount={SLIDES_COUNT}
        enableMouseEvents
        resistance
      />

      {/* TODO: extract to component */}
      <StyledFooter>
        <ViewsSwitcher
          slideIndex={slideIndex}
          slidesCount={2}
          setSlideIndex={dispatchSlideIndex}
        />
      </StyledFooter>
    </Wrapper>
  )
}
