import { either as E } from "fp-ts"
import * as options from "./options"

describe("port", () => {
  it("should return a port", () => {
    expect(options.port.decode({ port: 1234 })).toMatchObject(
      E.right(`--port="1234"`)
    )
  })
})

describe("logging", () => {
  describe("silent", () => {
    it("should return --silent when given silent", () => {
      expect(options.logging.decode({ silent: true })).toMatchObject(
        E.right(`--silent`)
      )
    })

    it("should return --verbose when given verbose but silent as false", () => {
      expect(options.logging.decode({ silent: true, verbose: false }))
    })

    it("should emit a type error when given a false only value", () => {
      //@ts-expect-error
      expect(options.logging.decode({ verbose: false }))
    })
  })

  describe("verbose", () => {
    it("should return --verbose when given verbose", () => {
      expect(options.logging.decode({ verbose: true })).toMatchObject(
        E.right(`--verbose`)
      )
    })

    it("should return --verbose when given verbose but silent as false", () => {
      expect(options.logging.decode({ silent: false, verbose: true }))
    })

    it("should emit a type error when given a false only value", () => {
      //@ts-expect-error
      expect(options.logging.decode({ silent: false }))
    })
  })

  it("should emit a type error when given more than one true property", () => {
    //@ts-expect-error
    options.logging.decode({ silent: true, verbose: true })
  })
})
