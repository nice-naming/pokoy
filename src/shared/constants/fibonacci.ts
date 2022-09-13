export const FIB_NUMS = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89] // durations of each stage in minutes
export const STAGES = [0, 1, 3, 6, 11, 19, 32, 53, 87, 142, 231] // total durations of the stages in minutes

/* NOTE: deprecated:
  export const fibonacciPercents = [1, 2, 3, 6, 9, 15, 24, 38, 62, 100]
  export const fibonacciMinsToSeconds = [60, 120, 180, 300, 480, 780, 1260]
*/

export const FIB_STYLE_SHEET_COLORS_NAMES = [
  "--c-red",
  // "--c-orange",
  "--c-yellow",
  "--c-green",
  "--c-cyan",
  "--c-blue",
  "--c-purple",
  "--c-magenta",
  "--c-ultrared",
  "--c-foreground"
]
export const FIB_NUM_TO_COLOR_VAR_MAP = {
  [STAGES[0]]: FIB_STYLE_SHEET_COLORS_NAMES[0],
  [STAGES[1]]: FIB_STYLE_SHEET_COLORS_NAMES[1],
  [STAGES[2]]: FIB_STYLE_SHEET_COLORS_NAMES[2],
  [STAGES[3]]: FIB_STYLE_SHEET_COLORS_NAMES[3],
  [STAGES[4]]: FIB_STYLE_SHEET_COLORS_NAMES[4],
  [STAGES[5]]: FIB_STYLE_SHEET_COLORS_NAMES[5],
  [STAGES[6]]: FIB_STYLE_SHEET_COLORS_NAMES[6],
  [STAGES[7]]: FIB_STYLE_SHEET_COLORS_NAMES[7],
  [STAGES[8]]: FIB_STYLE_SHEET_COLORS_NAMES[8]
}
