// Based off a tweet and codesandbox:
// https://mobile.twitter.com/hieuhlc/status/1164369876825169920
import { DependencyList, useCallback, useEffect, useRef } from "react"

// Reusable component that also takes dependencies
export const useAnimationFrame = (
  cb: (arg0: { time: number; delta: number }) => void,
  deps: DependencyList = []
) => {
  const frame = useRef<undefined | number>()
  const lastTimestamp = useRef(performance.now())
  const initTimestamp = useRef(performance.now())

  const animate = useCallback(() => {
    const now = performance.now()
    const time = (now - initTimestamp.current) / 1000
    const delta = (now - lastTimestamp.current) / 1000

    // In seconds ~> you can do ms or anything in userland
    cb({ time, delta })
    lastTimestamp.current = now
    frame.current = requestAnimationFrame(animate)
  }, [cb])

  useEffect(() => {
    frame.current = requestAnimationFrame(animate)

    if (frame?.current) {
      const frameId = frame.current
      return () => cancelAnimationFrame(frameId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, animate])
}
