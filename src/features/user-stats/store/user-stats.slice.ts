import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DayData, UserStatsData } from "shared/types"
import { FEATURE_NAME } from "../user-stats.constants"
import { getChartDataThunk, getStatsThunk } from "./user-stats.thunks"

export interface UserStatsState {
  daysData: DayData[]
  stats: UserStatsData | null
  status: "idle" | "loading" | "error" | "loaded"
  errorMessage: string | null
}

const initialState: UserStatsState = {
  daysData: [],
  stats: null,
  status: "idle",
  errorMessage: null,
}

export const userStatsSlice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    addDay: (state, action: PayloadAction<DayData>) => {
      state.daysData.push(action.payload)
    },
    updateDay: (
      state,
      action: PayloadAction<{ dayData: DayData; index: number }>
    ) => {
      const { dayData, index } = action.payload
      state.daysData[index] = dayData
    },
    setStats: (state, action: PayloadAction<UserStatsData>) => {
      state.stats = action.payload
    },
    setChartData: (state, action: PayloadAction<DayData[]>) => {
      state.daysData = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStatsThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getStatsThunk.fulfilled, (state, action) => {
        state.status = "loaded"
      })
      .addCase(getStatsThunk.rejected, (state, action) => {
        state.status = "error"
      })
      .addCase(getChartDataThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getChartDataThunk.fulfilled, (state, action) => {
        state.status = "loaded"
      })
      .addCase(getChartDataThunk.rejected, (state, action) => {
        console.error(action.error)
        state.status = "error"
        state.errorMessage = action.error.message ?? null
      })
  },
})

// Action creators are generated for each case reducer function
export const userStatsActions = {
  ...userStatsSlice.actions,
}

export const userStatsSliceReducer = userStatsSlice.reducer
