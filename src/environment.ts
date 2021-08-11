import { EnvironmentContext } from "@jest/environment"
import { Config } from "@jest/types"
import NodeEnvironment from "jest-environment-node"
import * as VM from "vm"

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

  async setup(): Promise<void> {
    await super.setup()

    // Will trigger if docblock contains @my-custom-pragma my-pragma-value
    // if (
    //   this.docblockPragmas["my-custom-pragma"] ===
    //   "my-pragma-value"
    // ) {
    //   // ...
    // }
  }

  async teardown(): Promise<void> {
    await super.teardown()
  }

  getVmContext(): VM.Context | null {
    return super.getVmContext()
  }

  // async handleTestEvent(event, state) {
  //   if (event.name === "test_start") {
  //     // ...
  //   }
  // }
}

module.exports = WebdriverIOEnvironment
