import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { Tips } from "./tips.component"

describe("Tips", () => {
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

  describe("when timer is started", () => {
    it("should display stage for less than 0 minute, but less than 1", () => {
      act(() => {
        render(<Tips seconds={1} isTimerStarted={true} />, container)
      })
      expect(container.innerHTML).toBe("0m")
    })

    it("should display stage for less than 1 minute, but less than 2", () => {
      act(() => {
        render(<Tips seconds={61} isTimerStarted={true} />, container)
      })
      expect(container.textContent).toBe("1m")
    })

    it("should display stage for more than 2 minutes, but less than 3", () => {
      act(() => {
        render(<Tips seconds={121} isTimerStarted={true} />, container)
      })
      expect(container.textContent).toBe("2m")
    })

    it("should display stage for less than 3 minutes, but less than 5", () => {
      act(() => {
        render(<Tips seconds={181} isTimerStarted={true} />, container)
      })
      expect(container.textContent).toBe("3m")
    })

    it("should display stage for less than 5 minutes, but less than 8", () => {
      act(() => {
        render(<Tips seconds={301} isTimerStarted={true} />, container)
      })
      expect(container.textContent).toBe("5m")
    })

    it("should display stage for less than 8 minutes, but less than 13", () => {
      act(() => {
        render(<Tips seconds={481} isTimerStarted={true} />, container)
      })
      expect(container.textContent).toBe("8m")
    })

    it("should display stage for less than 13 minutes, but less than 21", () => {
      act(() => {
        render(<Tips seconds={781} isTimerStarted={true} />, container)
      })
      expect(container.textContent).toBe("13m")
    })

    it("should display stage for end of 13th minute (penultimate timer)", () => {
      act(() => {
        render(<Tips seconds={780} isTimerStarted={true} />, container)
      })
      expect(container.textContent).toBe("13m")
    })

    it("should display stage for end of 21th minute (last timer)", () => {
      act(() => {
        render(<Tips seconds={1260} isTimerStarted={true} />, container)
      })
      expect(container.textContent).toBe("21m")
    })
  })

  describe("for bugs", () => {
    test("should display properly stage on 11th minute", () => {
      act(() => {
        render(<Tips seconds={659} isTimerStarted={true} />, container)
      })

      expect(container.textContent).toBe("8m")
    })

    test("should display 8th stage on 12th minute", () => {
      act(() => {
        render(<Tips seconds={661} isTimerStarted={true} />, container)
      })

      expect(container.textContent).toBe("8m")
    })
  })
})
