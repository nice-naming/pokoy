import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DayData, ShallowUserStatsData, UserStatsData } from "shared/types"
import { getStatsThunk } from "./pokoyThunks"

export interface PokoyState {
  days: DayData[]
  stats: ShallowUserStatsData | null
}

const initialState: PokoyState = {
  days: [],
  stats: null,
}

export const pokoySlice = createSlice({
  name: "pokoy",
  initialState,
  reducers: {
    addDay: (state, action: PayloadAction<DayData>) => {
      state.days.push(action.payload)
    },
    setStats: (state, action: PayloadAction<ShallowUserStatsData>) => {
      state.stats = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getStatsThunk.fulfilled, (state, action) => {
      // TODO: WTF, fix it
      state.stats = action.payload.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { addDay, setStats } = pokoySlice.actions

export const pokoySliceReducer = pokoySlice.reducer
