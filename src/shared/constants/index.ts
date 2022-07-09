import { RequestStatus } from "shared/types"

export * from "./breakpoints"
export * from "./time"
export * from "./fibonacci"
export * from "./data"

export enum CSS_COLOR_VARIABLES {
  BACKGROUND = "--c-background",
  DARKEN_GRAY = "--c-darken-gray",
  DARK_GRAY = "--c-dark-gray",
  GRAY = "--c-gray",
  RED = "--c-red",
  ORANGE = "--c-orange",
  YELLOW = "--c-yellow",
  GREEN = "--c-green",
  CYAN = "--c-cyan",
  BLUE = "--c-blue",
  MAGENTA = "--c-magenta",
  FOREGROUND = "--c-foreground",
}

export const LOCAL_CACHE_FIELD_NAME = "pokoy-last-session"

export const REQUEST_STATUS_TO_COLOR_MAP = new Map<RequestStatus, string>([
  [RequestStatus.NONE, "var(--c-gray)"],
  [RequestStatus.REQUEST, "var(--c-yellow)"],
  [RequestStatus.SUCCESS, "var(--c-green)"],
  [RequestStatus.FAILURE, "var(--c-red)"],
])
