import { render, unmountComponentAtNode } from "react-dom"
import { act, Simulate } from "react-dom/test-utils"
import { TimerButton } from "./timer-button.component"

describe("TimerButton", () => {
  let container = null

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it("should be defined", () => {
    act(() => {
      render(<TimerButton />, container)
    })
    expect(container.textContent.length).toBeGreaterThan(1)
  })

  it("should be contain button", () => {
    act(() => {
      render(<TimerButton />, container)
    })
    expect(container.querySelector("button")).toBeDefined()
  })

  it("should call handler on click", () => {
    const eventCallbackFn = jest.fn()
    act(() => {
      render(<TimerButton onClickHandler={eventCallbackFn} />, container)
    })

    const button = container.querySelector("button")

    Simulate.click(button)

    expect(eventCallbackFn).toBeCalled()
  })

  it('should render "Закончить" if isTimerStarted equal true', () => {
    const isTimerStarted = true
    act(() => {
      render(<TimerButton isTimerStarted={isTimerStarted} />, container)
    })

    const button = container.querySelector("button")

    expect(button.textContent).toBe("Закончить")
  })

  it('should render "Начать" if isTimerStarted equal false', () => {
    const isTimerStarted = false
    act(() => {
      render(<TimerButton isTimerStarted={isTimerStarted} />, container)
    })

    const button = container.querySelector("button")

    expect(button.textContent).toBe("Начать")
  })
})
