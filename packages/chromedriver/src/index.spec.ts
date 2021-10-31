import { ChildProcess } from "child_process"
import { start, stop } from "./index"

describe("start", () => {
  it("should start the process", async () => {
    const process = await start({ logging: { verbose: true }, port: 1234 })
    expect(process).toBeInstanceOf(ChildProcess)
    stop()
  })
})
