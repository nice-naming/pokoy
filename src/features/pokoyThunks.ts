import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { UserStatsData } from "shared/types"
import { setStats } from "./pokoySlice"
import { fetchStats } from "./user-stats/get-data"

const FEATURE_NAME = "pokoy"

const getStatsActionType = `${FEATURE_NAME}/getStats` as const

export const getStatsThunk = createAsyncThunk(
  getStatsActionType,
  async (user: User, thunkAPI) => {
    const statsData = await fetchStats(user)

    if (statsData.firstMeditationDate === null) {
      console.error("there are no user statistics yet")
    }

    const shallowStatsData = {
      ...statsData,
      // TODO: remove nullable value from type
      firstMeditationDate: statsData.firstMeditationDate || null,
    }

    return thunkAPI.dispatch(setStats(shallowStatsData))
  }
)
