import { EnvironmentContext } from "@jest/environment"
import { Config } from "@jest/types"
import NodeEnvironment from "jest-environment-node"
import * as VM from "vm"
import { remote, Browser } from "webdriverio"

declare module "@jest/types/build/global" {
  export interface Global {
    remote: Browser<"async">
  }
}

export default class WebdriverIOEnvironment extends NodeEnvironment {
  // @ts-expect-error undefinable in constructor
  private browser: WebdriverIO.Browser

  constructor(
    public config: Config.ProjectConfig,
    public environmentContext: EnvironmentContext,
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

    this.browser = await remote(this.config.globals.webdriverio)
    this.global.browser = this.browser
    this.global.driver = this.browser

    // Will trigger if docblock contains @my-custom-pragma my-pragma-value
    // if (
    //   this.docblockPragmas["my-custom-pragma"] ===
    //   "my-pragma-value"
    // ) {
    //   // ...
    // }
  }

  async teardown(): Promise<void> {
    await this.browser.deleteSession()
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
