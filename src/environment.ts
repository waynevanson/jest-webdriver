import { EnvironmentContext } from "@jest/environment"
import { Config } from "@jest/types"
import {} from "jest-environment-jsdom"
import NodeEnvironment from "jest-environment-node"

export default class WebdriverIOEnvironment extends NodeEnvironment {
  constructor(
    public config: Config.ProjectConfig,
    context?: EnvironmentContext,
  ) {
    super(config)
    // get config from variables, error when no config is used.
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
