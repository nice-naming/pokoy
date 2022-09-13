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
  FOREGROUND = "--c-foreground"
}

export enum CSS_COLOR_VALUES {
  BACKGROUND = "#2b2b2b",
  DARKEN_GRAY = "#333",
  DARK_GRAY = "#656565",
  GRAY = "#7f7f7f",
  RED = "#ff8686",
  ORANGE = "#ff8b16",
  YELLOW = "#afaf00",
  GREEN = "#00d800",
  CYAN = "#00dcdc",
  BLUE = "#abd5ff",
  MAGENTA = "#ffcee6",
  FOREGROUND = "#f5f5f5"
}

export const LOCAL_CACHE_FIELD_NAME = "pokoy-local-sessions"

export const REQUEST_STATUS_TO_COLOR_MAP = new Map<RequestStatus, string>([
  [RequestStatus.NONE, "var(--c-gray)"],
  [RequestStatus.REQUEST, "var(--c-yellow)"],
  [RequestStatus.SUCCESS, "var(--c-green)"],
  [RequestStatus.FAILURE, "var(--c-red)"]
])
