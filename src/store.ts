import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { mainScreenSliceReducer } from "features/home/main-screen.slice"
import { userStatsSliceReducer } from "features/user-stats/store/user-stats.slice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    userStats: userStatsSliceReducer,
    mainScreen: mainScreenSliceReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

// TODO: move to app custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
