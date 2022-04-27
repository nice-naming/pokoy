import { RequestStatus } from "shared/types"

export * from "./breakpoints"
export * from "./time"
export * from "./fibonacci"
export * from "./data"

export enum CSS_COLOR_VARIABLES {
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

export const SERVER_URL = process.env.REACT_APP_SHEET_URL

export const LOCAL_CACHE_FIELD_NAME = "pokoy-last-session"

export const REQUEST_STATUS_TO_COLOR_MAP = new Map<RequestStatus, string>([
  [RequestStatus.NONE, "var(--c-gray)"],
  [RequestStatus.REQUEST, "var(--c-yellow)"],
  [RequestStatus.SUCCESS, "var(--c-green)"],
  [RequestStatus.FAILURE, "var(--c-red)"],
])
