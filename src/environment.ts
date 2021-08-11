import { EnvironmentContext } from "@jest/environment"
import { Config } from "@jest/types"
import {} from "jest-environment-jsdom"
import NodeEnvironment from "jest-environment-node"

export default class WebdriverIOEnvironment extends NodeEnvironment {
  constructor(
    public config: Config.ProjectConfig,
    public context: EnvironmentContext,
  ) {
    super(config)
    if (typeof config.globals.webdriverio !== "object") {
      throw new Error(
        'Jest configuration cooked – Please provide Webdriver\'s configuration under "{ globals: { webdriverio: { ...<options> } } }"',
      )
    }
  }

  // get config
  // create browser, attach to driver
  async setup() {
    await super.setup()

    // Will trigger if docblock contains @my-custom-pragma my-pragma-value
    // if (
    //   this.docblockPragmas["my-custom-pragma"] ===
    //   "my-pragma-value"
    // ) {
    //   // ...
    // }
  }

  async teardown() {
    await super.teardown()
  }

  getVmContext() {
    return super.getVmContext()
  }

  // async handleTestEvent(event, state) {
  //   if (event.name === "test_start") {
  //     // ...
  //   }
  // }
}

module.exports = WebdriverIOEnvironment
