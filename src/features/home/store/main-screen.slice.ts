import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store"
import { FEATURE_NAME } from "../main-screen.constants"
import { setMeditationThunk } from "./main-screen.thunks"

export interface MainScreenState {
  errorMessage: string
  slideIndex: number
  status: "idle" | "loading" | "error" | "loaded"
  timerStatus: "idle" | "started"
}

const initialState: MainScreenState = {
  errorMessage: "",
  slideIndex: 0,
  status: "idle",
  timerStatus: "idle",
}

export const mainScreenSlice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    toggleSlideIndex: (state) => {
      state.slideIndex = Number(!state.slideIndex)
    },
    setSlideIndex: (state, action: PayloadAction<number>) => {
      state.slideIndex = action.payload
    },
    // TODO: move state to timer slice
    setTimerStatus: (state, action: PayloadAction<boolean>) => {
      state.timerStatus = action.payload ? "started" : "idle"
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO: move states to timer slice
      .addCase(setMeditationThunk.fulfilled, (state, action) => {
        state.status = "loaded"
      })
      .addCase(setMeditationThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(setMeditationThunk.rejected, (state, action) => {
        state.status = "error"
      })
  },
})

export const mainScreenActions = {
  ...mainScreenSlice.actions,
}

export const mainScreenSelectors = {
  getSlideIndex: (state: RootState) => state[FEATURE_NAME].slideIndex,
}

export const mainScreenSliceReducer = mainScreenSlice.reducer
