import { Config } from "@jest/types"
import { pipe } from "fp-ts/lib/function"
import { defaults } from "jest-config"
import { optional as o } from "../../common/src"
import { WebdriverEnvironment } from "./index"

const custom_defaults: Config.ProjectConfig = {
  ...defaults,
  cwd: "",
  extraGlobals: [],
  name: "",
  rootDir: "",
  transform: [],
  moduleNameMapper: [],
}

const capabilties = pipe(
  o.id<Config.ProjectConfig>(),
  o.prop("globals"),
  o.partial("webdriver"),
  o.partial("options"),
  o.partial("capabilities"),
)

describe(WebdriverEnvironment, () => {
  it("throws an error when there is no configuration global configuration", () => {
    expect(() => new WebdriverEnvironment(custom_defaults)).toThrowError()
  })

  it("does not throw an error when there is a webdriver global configuration object", () => {
    const config = pipe(custom_defaults, capabilties.set({}))
    expect(() => new WebdriverEnvironment(config)).not.toThrowError()
  })
})
