import React, { useCallback } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import SwipeableViews from "react-swipeable-views"
import { UserStats } from "features/user-stats/user-stats"
import { User } from "firebase/auth"
import { SlideRenderProps, virtualize } from "react-swipeable-views-utils"
import { useAppDispatch, useAppSelector } from "store"
import { mainScreenActions } from "./store/main-screen.slice"
import { Header } from "./components/header/header.component"
import { Timer } from "./components/timer/timer.component"
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
  overflow: "hidden"
}
const swipeableViewsContainerStyles = {
  maxWidth: "100%",
  maxHeight: "100%",
  height: "100%"
}

const VirtualizedSwipeableViews = virtualize(SwipeableViews)

export const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth)

  const dispatch = useAppDispatch()
  const slideIndex = useAppSelector((state) => state.mainScreen.slideIndex)
  const dispatchSlideIndex = () => dispatch(toggleSlideIndex())
  const isUserExist = !user?.isAnonymous

  const slideRenderer = useCallback(
    ({ index, key }: SlideRenderProps) => {
      switch (index) {
        case 0:
          return (
            <SwipeableView key={key}>
              <Timer
                user={user as User}
                authLoading={loading}
              />
            </SwipeableView>
          )

        case 1:
          return (
            <SwipeableView key={key}>
              <UserStats
                user={user}
                authLoading={loading}
              />
            </SwipeableView>
          )
      }
    },
    [loading, user]
  )

  return (
    <Wrapper>
      <Header />

      {isUserExist ? (
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
      ) : (
        <Timer
          user={user as User}
          authLoading={loading}
        />
      )}

      {/* TODO: extract to component */}
      <StyledFooter>
        {isUserExist ? (
          <ViewsSwitcher
            slideIndex={slideIndex}
            slidesCount={2}
            setSlideIndex={dispatchSlideIndex}
          />
        ) : null}
      </StyledFooter>
    </Wrapper>
  )
}
