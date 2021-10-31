import { either as E, option as O } from "fp-ts"
import * as options from "./options"

describe("port", () => {
  it("should return a port", () => {
    const result = options.port.decode({ port: 1234 })
    expect(result).toMatchObject(E.right(`--port="1234"`))
  })
})

describe("logs", () => {
  it("should return a log", () => {
    const result = options.logging.decode({ silent: true })
    expect(result).toMatchObject(E.right(`--silent`))
  })

  it("should receive a type error", () => {
    //@ts-expect-error
    options.logging.decode({ silent: true, verbose: true })
  })
})
