import { Timestamp } from "firebase/firestore"
import { DayData, RequestStatus, UserStatsData } from "./types"

export const FIBONACCI_NUMS = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
export const FIB_NUMS_FOR_TIMER = [0, 1, 2, 3, 5, 8, 13, 21]
export const fibonacciMinsToSeconds = [60, 120, 180, 300, 480, 780, 1260]
export const fibonacciPercents = [1, 2, 3, 6, 9, 15, 24, 38, 62, 100]

export enum CSSColorVariables {
  RED = "--c-red",
  ORANGE = "--c-orange",
  YELLOW = "--c-yellow",
  GREEN = "--c-green",
  BLUE = "--c-blue",
  PURPLE = "--c-purple",
  PINK = "--c-pink",
  GRAY = "--c-gray",
  EXTRA_GRAY = "--c-extra-gray",
  SPIRAL = "--c-spiral",
}

export const FIB_STYLE_SHEET_COLORS_NAMES = [
  "--c-red",
  "--c-orange",
  "--c-yellow",
  "--c-green",
  "--c-blue",
  "--c-purple",
  "--c-pink",
  "--c-foreground",
]

export const fibNumToStyleSheetVarMap = {
  [FIB_NUMS_FOR_TIMER[0]]: FIB_STYLE_SHEET_COLORS_NAMES[0],
  [FIB_NUMS_FOR_TIMER[1]]: FIB_STYLE_SHEET_COLORS_NAMES[1],
  [FIB_NUMS_FOR_TIMER[2]]: FIB_STYLE_SHEET_COLORS_NAMES[2],
  [FIB_NUMS_FOR_TIMER[3]]: FIB_STYLE_SHEET_COLORS_NAMES[3],
  [FIB_NUMS_FOR_TIMER[4]]: FIB_STYLE_SHEET_COLORS_NAMES[4],
  [FIB_NUMS_FOR_TIMER[5]]: FIB_STYLE_SHEET_COLORS_NAMES[5],
  [FIB_NUMS_FOR_TIMER[6]]: FIB_STYLE_SHEET_COLORS_NAMES[6],
  [FIB_NUMS_FOR_TIMER[7]]: FIB_STYLE_SHEET_COLORS_NAMES[7],
}
export const SERVER_URL = process.env.REACT_APP_SHEET_URL

export const SECS_IN_MIN = 60

export const LOCAL_CACHE_FIELD_NAME = "pokoy-last-session"

export const MAX_TIMER_SECONDS = 1260 // NOTE: equal to 21 minutes

export const INIT_USER_STATS: UserStatsData = {
  firstMeditationDate: null,
  totalDuration: 0,
  count: 0,
  userId: "",
}

export const INIT_DAY_DATA: DayData = {
  timestamp: Timestamp.fromDate(new Date(new Date().toDateString())),
  count: 0,
  totalDuration: 0,
  meditations: [],
  userId: "",
}

export const REQUEST_STATUS_TO_COLOR_MAP = new Map<RequestStatus, string>([
  [RequestStatus.NONE, "var(--c-gray)"],
  [RequestStatus.REQUEST, "var(--c-yellow)"],
  [RequestStatus.SUCCESS, "var(--c-green)"],
  [RequestStatus.FAILURE, "var(--c-red)"],
])
