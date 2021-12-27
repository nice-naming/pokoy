import { FIBONACCI_NUMS } from "shared/constants"

export const getColorByFibNum = (num: number) => {
  const isFibNum = FIBONACCI_NUMS.includes(num)

  if (!isFibNum) return "#fff"

  const hex = num.toString(16)
  const hexArr = hex.split("")
  const newArr = Array(6 - hexArr.length).fill("F")

  return `#${hexArr.concat(newArr).join("")}`
}
