import { Config } from "@jest/types"
import { pipe } from "fp-ts/lib/function"
import { optional as o, jest_config as jc } from "../../common/src"
import { WebdriverEnvironment } from "../src/environment"

const capabilties = pipe(
  o.id<Config.ProjectConfig>(),
  o.prop("globals"),
  o.partial("webdriver"),
  o.partial("options"),
  o.partial("capabilities"),
)

describe(WebdriverEnvironment, () => {
  it("throws an error when there is no configuration global configuration", () => {
    expect(() => new WebdriverEnvironment(jc.custom_defaults)).toThrowError()
  })

  it("does not throw an error when there is a webdriver global configuration object", () => {
    const config = pipe(jc.custom_defaults, capabilties.set({}))
    expect(() => new WebdriverEnvironment(config)).not.toThrowError()
  })
})
